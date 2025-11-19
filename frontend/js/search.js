import { searchBooks, displayBooks } from './bookUtils.js';
import { onAuthStateChanged } from './auth.js'; // to know if user is logged in
import { addBook, getBooks, removeBook } from './books.js'; // Firestore helpers

document.addEventListener('DOMContentLoaded', function () {
	// Grab references to HTML elements
	const form = document.getElementById('searchForm');
	const input = document.getElementById('searchInput');
	const resultsContainer = document.getElementById('results');
	const modal = document.getElementById('bookModal');
	const modalTitle = document.getElementById('modalTitle');
	const modalAuthor = document.getElementById('modalAuthor');
	const modalImage = document.getElementById('modalImage');
	const modalDescription = document.getElementById('modalDescription');
	const closeButton = document.querySelector('.close-button');

	// NEW: reference to the book list <ul> in search.html
	const bookListEl = document.getElementById('bookList');

	if (!form || !input || !resultsContainer) return;

	// -----------------------------
	// Function: showModal
	// Purpose: Show book details in a modal window
	// -----------------------------
	function showModal(book) {
		modalTitle.textContent = book.title;
		modalAuthor.textContent = `By: ${book.authors}`;
		modalImage.src = book.thumbnail;
		modalDescription.textContent = book.description;

		// Prepare footer
		const modalFooter = document.getElementById('modalFooter');
		modalFooter.innerHTML = '';

		// Close button
		const closeFooterBtn = document.createElement('button');
		closeFooterBtn.textContent = 'Close';
		closeFooterBtn.classList.add('view-button');
		closeFooterBtn.addEventListener('click', () => {
			modal.classList.add('hidden');
		});
		modalFooter.appendChild(closeFooterBtn);

		// ✅ NEW: Add to My List button (only if user is logged in)
		if (currentUser) {
			const addBtn = document.createElement('button');
			addBtn.textContent = 'Add to My List';
			addBtn.classList.add('addToListBtn');
			addBtn.classList.add('view-button');
			addBtn.addEventListener('click', async () => {
				// Save book to Firestore
				const bookData = {
					title: book.title,
					author: book.authors,
					thumbnail: book.thumbnail,
				};
				await addBook(currentUser.uid, bookData);

				// Reload and render updated list
				const updatedBooks = await getBooks(currentUser.uid);
				renderBookList(updatedBooks, bookListEl);
			});
			modalFooter.appendChild(addBtn);
		}

		modal.classList.remove('hidden');
	}

	// -----------------------------
	// Search form submit handler
	// -----------------------------
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		const query = input.value.trim();
		if (query !== '') {
			searchBooks(query, resultsContainer, (books) =>
				displayBooks(books, resultsContainer, showModal)
			);
		}
	});

	// Close modal when clicking the X button
	closeButton.addEventListener('click', () => {
		modal.classList.add('hidden');
	});

	// Close modal when clicking outside of it
	window.addEventListener('click', (e) => {
		if (e.target === modal) {
			modal.classList.add('hidden');
		}
	});

	// -----------------------------
	// Track login state and load book list
	// -----------------------------
	let currentUser = null; // keep track of logged-in user

	onAuthStateChanged(async (user) => {
		if (user) {
			currentUser = user;
			// Load saved books from Firestore
			const books = await getBooks(user.uid);
			renderBookList(books, bookListEl);
		} else {
			currentUser = null;
			bookListEl.innerHTML = '<li>Please log in to see your book list.</li>';
		}
	});

	// -----------------------------
	// Helper: renderBookList
	// Purpose: Display books inside the <ul>
	// -----------------------------
	function renderBookList(books, el) {
		if (!books || books.length === 0) {
			el.innerHTML = '<li>No saved books yet.</li>';
			return;
		}

		el.innerHTML = books
			.map((b, idx) => {
				const thumb =
					b.thumbnail && b.thumbnail !== ''
						? b.thumbnail
						: './icons/icons8-book-25.png';
				const safeTitle = b.title || 'Untitled';
				const safeAuthor = b.author || 'Unknown author';
				return `
						<li class="saved-book-item" data-idx="${idx}">
							<img class="saved-book-thumb" src="${thumb}" alt="${safeTitle} cover" width="40" height="60" />
							<span class="saved-book-meta">${safeTitle} by ${safeAuthor}</span>
							${
								currentUser
									? `<button class="remove-btn" data-idx="${idx}" aria-label="Remove"><img src="./icons/icons8-trash-16.png" alt="Remove" width="16" height="16" /></button>`
									: ''
							}
						</li>`;
			})
			.join('');

		// Attach remove handlers (only when user is logged in)
		if (currentUser) {
			el.querySelectorAll('.remove-btn').forEach((btn) => {
				btn.addEventListener('click', async (e) => {
					e.stopPropagation();
					const idx = Number(btn.dataset.idx);
					const bookToRemove = books[idx];
					try {
						await removeBook(currentUser.uid, bookToRemove);
						const updated = await getBooks(currentUser.uid);
						renderBookList(updated, bookListEl);
					} catch (err) {
						console.error('removeBook error', err);
						alert('Failed to remove book. Check console for details.');
					}
				});
			});
		}
	}
});
