// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

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

// Export services
export const auth = getAuth(app);
export const db = getFirestore(app);
