window.addEventListener('DOMContentLoaded', function () {
	const loginBtn = document.querySelector('.login');
	const signupBtn = document.querySelector('.signup');

	if (loginBtn) {
		loginBtn.addEventListener('click', function () {
			// Navigate to the frontend login page
			window.location.href = './frontend/login.html';
		});
	}

	if (signupBtn) {
		signupBtn.addEventListener('click', function () {
			// Navigate to the frontend register page
			window.location.href = './frontend/register.html';
		});
	}
});
