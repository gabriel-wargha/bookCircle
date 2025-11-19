// register.js
import { register } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
	const form = document.getElementById('registerForm');
	if (!form) return;

	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		const email = document.getElementById('username').value.trim();
		const password = document.getElementById('password').value;

		if (!email || password.length < 6) {
			alert('Use a valid email and at least 6 characters for password.');
			return;
		}

		try {
			await register(email, password);
			alert('Registered — please log in');
			window.location.href = 'login.html';
		} catch (err) {
			alert(err.message || 'Registration failed');
			console.error(err);
		}
	});
});
