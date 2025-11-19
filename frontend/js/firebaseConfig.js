// Import the functions you need from the Firebase CDN (ES modules)
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
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
const auth = getAuth(app);

// Export app, auth and config for other modules
export { firebaseConfig, app, auth };
