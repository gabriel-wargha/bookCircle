// auth.js (modular Firebase usage)
import { auth } from './firebaseConfig.js';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut as firebaseSignOut,
	onAuthStateChanged as firebaseOnAuthStateChanged,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';

// Register new user
export async function register(email, password) {
	const cred = await createUserWithEmailAndPassword(auth, email, password);
	return cred.user;
}

// Login existing user
export async function login(email, password) {
	const cred = await signInWithEmailAndPassword(auth, email, password);
	return cred.user;
}

// Logout
export async function logout() {
	return firebaseSignOut(auth);
}

// Listen for auth state changes
export function onAuthStateChanged(cb) {
	return firebaseOnAuthStateChanged(auth, cb);
}
