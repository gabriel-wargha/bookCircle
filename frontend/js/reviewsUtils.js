import {
	collection,
	addDoc,
	getDocs,
	query,
	orderBy,
} from 'https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js';

import { db } from './firebase.js';

export async function loadReviews() {
	const q = query(collection(db, 'bookReviews'), orderBy('timestamp', 'desc'));

	const querySnapshot = await getDocs(q);

	const reviews = [];
	querySnapshot.forEach((doc) => {
		reviews.push(doc.data());
	});

	return reviews;
}

export async function saveReview(review) {
	await addDoc(collection(db, 'bookReviews'), {
		...review,
		timestamp: new Date().toISOString(),
	});
}

export function renderReviews(reviews, reviewsList) {
	reviewsList.innerHTML = '';

	reviews.forEach((review) => {
		const li = document.createElement('li');
		li.innerHTML = `
			<strong>${review.book}</strong> — ⭐ ${review.rating}/5<br>
			<em>${review.text}</em>
		`;
		reviewsList.appendChild(li);
	});
}
