import request from '../../services/request';

export function setUserProperty(path, value) {
	return {
		type: 'SET_PROPERTY',
		path,
		value,
	}
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