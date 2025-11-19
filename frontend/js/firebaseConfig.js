// firebaseConfig.js — use CDN ESM imports so files load directly in the browser
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

const firebaseConfig = {
	apiKey: 'AIzaSyCas1Cr2eVp1ukDYpgVlWz7sb4L-QkSpD8',
	authDomain: 'bookclub-501f8.firebaseapp.com',
	projectId: 'bookclub-501f8',
	storageBucket: 'bookclub-501f8.firebasestorage.app',
	messagingSenderId: '837804467544',
	appId: '1:837804467544:web:9348e98ad394556424312d',
	measurementId: 'G-PMPBS9QSWN',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export services used by other modules
export const auth = getAuth(app);
export const db = getFirestore(app);
