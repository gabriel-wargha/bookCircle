// bookUtils.js
// Small helper to search Google Books API and render results

export async function searchBooks(query, resultsContainer, cb) {
	try {
		const res = await fetch(
			`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
				query
			)}&maxResults=12`
		);
		if (!res.ok) throw new Error('Network response was not ok');
		const data = await res.json();
		const books = (data.items || []).map((item) => {
			const info = item.volumeInfo || {};
			return {
				id: item.id,
				title: info.title || 'No title',
				authors: (info.authors || []).join(', '),
				description: info.description || 'No description available',
				thumbnail:
					(info.imageLinks &&
						(info.imageLinks.thumbnail || info.imageLinks.smallThumbnail)) ||
					'',
			};
		});
		cb(books);
	} catch (err) {
		console.error('searchBooks error', err);
		resultsContainer.innerHTML = `<p class="error">Search failed: ${err.message}</p>`;
		cb([]);
	}
}

export function displayBooks(books, container, showModal) {
	container.innerHTML = '';
	if (!books || books.length === 0) {
		container.innerHTML = '<p>No results found.</p>';
		return;
	}

	const grid = document.createElement('div');
	grid.className = 'results-grid';

	books.forEach((b) => {
		const card = document.createElement('div');
		card.className = 'book-card';

		const img = document.createElement('img');
		img.src = b.thumbnail || './icons/icons8-book-25.png';
		img.alt = b.title;
		img.className = 'book-thumb';

		const title = document.createElement('h4');
		title.textContent = b.title;

		const author = document.createElement('p');
		author.className = 'book-author';
		author.textContent = b.authors;

		const btn = document.createElement('button');
		btn.textContent = 'Details';
		btn.className = 'details-btn';
		// prevent card click from firing when clicking the button
		btn.addEventListener('click', (e) => {
			e.stopPropagation();
			showModal(b);
		});

		// Make entire card clickable to open modal
		card.addEventListener('click', () => showModal(b));

		card.appendChild(img);
		card.appendChild(title);
		card.appendChild(author);
		card.appendChild(btn);
		grid.appendChild(card);
	});

	container.appendChild(grid);
}
