// index-auth.js
// Shows logged-in user email in the header and wires logout button.
import { onAuthStateChanged, logout } from './auth.js';

document.addEventListener('DOMContentLoaded', () => {
    const userEmailSpan = document.getElementById('userEmail');
    const logoutBtn = document.getElementById('logoutBtn');

    // Hide logout by default until we know state
    if (logoutBtn) logoutBtn.style.display = 'none';

    onAuthStateChanged((user) => {
        if (user) {
            if (userEmailSpan) userEmailSpan.textContent = user.email || '';
            if (logoutBtn) logoutBtn.style.display = '';
        } else {
            if (userEmailSpan) userEmailSpan.textContent = '';
            if (logoutBtn) logoutBtn.style.display = 'none';
        }
    });

    if (logoutBtn) {
        logoutBtn.addEventListener('click', async () => {
            try {
                await logout();
                // refresh to update UI
                window.location.reload();
            } catch (err) {
                console.error('Logout failed', err);
                alert('Logout failed');
            }
        });
    }
});
