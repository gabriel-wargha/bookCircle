import { db } from './firebaseConfig.js';
import {
	doc,
	setDoc,
	getDoc,
	updateDoc,
	arrayUnion,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Add a book to the user's list
export async function addBook(userUid, book) {
	const userDoc = doc(db, 'bookLists', userUid);
	try {
		await updateDoc(userDoc, {
			books: arrayUnion(book),
		});
	} catch (error) {
		// If doc doesn't exist yet, create it
		await setDoc(userDoc, { books: [book] });
	}
}

// Get the user's book list
export async function getBooks(userUid) {
	const userDoc = doc(db, 'bookLists', userUid);
	const snapshot = await getDoc(userDoc);
	return snapshot.exists() ? snapshot.data().books : [];
}
