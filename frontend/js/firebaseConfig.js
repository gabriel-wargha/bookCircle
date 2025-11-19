// firebaseConfig.js

const firebaseConfig = {
	apiKey: 'AIzaSyCas1Cr2eVp1ukDYpgVlWz7sb4L-QkSpD8',
	authDomain: 'bookclub-501f8.firebaseapp.com',
	projectId: 'bookclub-501f8',
	storageBucket: 'bookclub-501f8.firebasestorage.app',
	messagingSenderId: '837804467544',
	appId: '1:837804467544:web:9348e98ad394556424312d',
	measurementId: 'G-PMPBS9QSWN',
};

// Initialize Firebase using the global firebase object
firebase.initializeApp(firebaseConfig);

// Export services for other modules
export const auth = firebase.auth();
export const db = firebase.firestore();
