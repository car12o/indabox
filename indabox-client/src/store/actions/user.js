import request from '../../services/request';
import { cleanUserToSubmit } from '../../services/transform';

export function setUserProperty(path, value) {
	return {
		type: 'SET_PROPERTY',
		path,
		value,
	}
}

export function getUser(id) {
	const req = {
		type: 'UPDATE_USER_STATE',
		url: `/users/${id}`,
		method: 'GET',
	};

	return request(req);
}

export function updateUser(user) {
	const body = cleanUserToSubmit(user);

	const req = {
		type: 'UPDATE_USER_STATE',
		url: `/users/${user.id}`,
		method: 'PATCH',
		body,
	};

	return request(req);
}

export function login(email, password) {
	const req = {
		type: 'UPDATE_USER_STATE',
		url: '/login',
		method: 'POST',
		body: { email, password },
	};

	return request(req);
}

export function logout() {
	const req = {
		type: 'UPDATE_USER_STATE',
		url: '/logout',
		method: 'GET',
	};

	return request(req);
}