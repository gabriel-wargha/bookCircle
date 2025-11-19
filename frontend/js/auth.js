// auth.js
import { firebaseConfig } from './firebaseConfig.js';

// Check SDK loaded
if (!window.firebase || !firebase.initializeApp) {
	throw new Error('Firebase SDK not loaded. Add script tags before auth.js');
}

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Register new user
export async function register(email, password) {
	const cred = await auth.createUserWithEmailAndPassword(email, password);
	return cred.user; // EXPLAIN: returns the authenticated user object
}

// Login existing user
export async function login(email, password) {
	const cred = await auth.signInWithEmailAndPassword(email, password);
	return cred.user;
}

// Logout
export async function logout() {
	return auth.signOut();
}

// Listen for auth state changes
export function onAuthStateChanged(cb) {
	return auth.onAuthStateChanged(cb);
}
