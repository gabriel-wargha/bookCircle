import { loadReviews, saveReview, renderReviews } from './reviewsUtils.js';

document.addEventListener('DOMContentLoaded', async () => {
	const form = document.getElementById('reviewForm');
	const reviewsList = document.getElementById('reviewsList');

	// Load from Firestore
	let reviews = await loadReviews();
	renderReviews(reviews, reviewsList);

	form.addEventListener('submit', async (e) => {
		e.preventDefault();

		const book = document.getElementById('bookTitle').value.trim();
		const rating = document.getElementById('rating').value.trim();
		const text = document.getElementById('reviewText').value.trim();

		if (!book || !rating || !text) {
			alert('Fill in all fields!');
			return;
		}

		const newReview = { book, rating, text };

		// SAVE TO FIREBASE
		await saveReview(newReview);

		// Reload after saving
		reviews = await loadReviews();
		renderReviews(reviews, reviewsList);

		form.reset();
	});
});
