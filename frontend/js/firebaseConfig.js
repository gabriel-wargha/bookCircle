// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);
