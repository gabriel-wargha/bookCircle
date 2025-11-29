// /js/groups.js
import { auth } from './firebaseConfig.js';
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import {
	createGroup,
	getAllGroups,
	getUserData,
	joinGroup,
	openGroupModal,
	closeModal,
} from './groupUtils.js';

const groupForm = document.getElementById('groupForm');
const groupNameInput = document.getElementById('groupName');
const groupDescInput = document.getElementById('groupDesc');
const groupTimeInput = document.getElementById('groupTime');
const groupZoomInput = document.getElementById('groupZoom');
const groupList = document.getElementById('groupList');
const myGroupsList = document.getElementById('myGroupsList');

// Renderiza grupos
async function renderGroupsForUser(user) {
	const [groups, userData] = await Promise.all([
		getAllGroups(),
		getUserData(user.uid),
	]);

	groupList.innerHTML = '';
	myGroupsList.innerHTML = '';

	groups.forEach((group) => {
		const li = document.createElement('li');
		li.className = 'group-item';
		li.textContent = `${group.name} - ${group.time}`;

		const joinBtn = document.createElement('button');
		joinBtn.textContent = 'Join';
		joinBtn.addEventListener('click', async () => {
			await joinGroup(user.uid, group.id);
			await renderGroupsForUser(user);
		});

		li.appendChild(joinBtn);

		// clicar no grupo abre modal
		li.addEventListener('click', (e) => {
			if (e.target.tagName !== 'BUTTON') openGroupModal(group);
		});

		groupList.appendChild(li);
	});

	const joined = userData.joinedGroups || [];
	joined.forEach((groupId) => {
		const group = groups.find((g) => g.id === groupId);
		if (!group) return;

		const li = document.createElement('li');
		li.className = 'my-group-item';
		li.textContent = `${group.name} - ${group.time}`;
		li.addEventListener('click', () => openGroupModal(group));

		myGroupsList.appendChild(li);
	});
}

// Protege página
onAuthStateChanged(auth, (user) => {
	if (!user) {
		window.location.href = 'login.html';
		return;
	}
	renderGroupsForUser(user);
});

// Criar novo grupo
groupForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	const name = groupNameInput.value.trim();
	const description = groupDescInput.value.trim();
	const time = groupTimeInput.value.trim();
	const zoomLink = groupZoomInput.value.trim();

	if (!name || !description || !time || !zoomLink) {
		alert('Please fill all fields.');
		return;
	}

	const currentUser = auth.currentUser;
	if (!currentUser) return;

	await createGroup(name, description, time, zoomLink, currentUser.uid);

	groupNameInput.value = '';
	groupDescInput.value = '';
	groupTimeInput.value = '';
	groupZoomInput.value = '';

	await renderGroupsForUser(currentUser);
});

// Fechar modal
document.getElementById('closeModal').addEventListener('click', closeModal);
