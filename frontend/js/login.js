// login.js
import { login, onAuthStateChanged } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('loginForm');
	if (!form) return;

	// Redirect if already logged in
	onAuthStateChanged((user) => {
		if (user) window.location.href = 'index.html';
	});

	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		const email = document.getElementById('username').value.trim();
		const password = document.getElementById('password').value;

		try {
			await login(email, password);
			// Redirect handled by listener above
		} catch (err) {
			alert(err.message || 'Login failed');
			console.error(err);
		}
	});
});
