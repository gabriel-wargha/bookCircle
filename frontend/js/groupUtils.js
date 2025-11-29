// /js/groupUtils.js
import { db, auth } from './firebaseConfig.js';
import {
	collection,
	addDoc,
	getDocs,
	doc,
	getDoc,
	setDoc,
	updateDoc,
	arrayUnion,
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

/**
 * Cria um novo grupo na coleção "groups".
 */
export async function createGroup(name, description, time, zoomLink, userId) {
	const ref = await addDoc(collection(db, 'groups'), {
		name,
		description,
		time,
		zoomLink,
		createdAt: Date.now(),
		createdBy: userId,
	});
	return ref.id;
}

/**
 * Retorna todos os grupos existentes
 */
export async function getAllGroups() {
	const snap = await getDocs(collection(db, 'groups'));
	return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Retorna os dados do usuário no Firestore.
 */
export async function getUserData(userId) {
	const userRef = doc(db, 'users', userId);
	const userSnap = await getDoc(userRef);

	if (!userSnap.exists()) {
		await setDoc(userRef, { joinedGroups: [] });
		return { joinedGroups: [] };
	}

	return userSnap.data();
}

/**
 * Adiciona um usuário a um grupo
 */
export async function joinGroup(userId, groupId) {
	const userRef = doc(db, 'users', userId);
	const userSnap = await getDoc(userRef);

	if (!userSnap.exists()) {
		await setDoc(userRef, { joinedGroups: [groupId] });
		return;
	}

	await updateDoc(userRef, { joinedGroups: arrayUnion(groupId) });
}

// Modal viewing only
export function openGroupModal(group) {
	const modal = document.getElementById('groupModal');
	document.getElementById('modalGroupName').textContent = group.name;
	document.getElementById('modalGroupTime').textContent = `Time: ${group.time}`;
	document.getElementById('modalGroupDesc').textContent = group.description;
	document.getElementById(
		'modalGroupZoom'
	).textContent = `Zoom: ${group.zoomLink}`;
	modal.style.display = 'flex';
}

export function closeModal() {
	const modal = document.getElementById('groupModal');
	modal.style.display = 'none';
}
