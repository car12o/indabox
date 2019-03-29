import request from '../../services/request';

function setEmail(email) {
	return {
		type: 'SET-USER-EMAIL',
		email
	};
}

function setPassword(password) {
	return {
		type: 'SET-USER-PASSWORD',
		password
	};
}

function login(email, password) {
	const req = {
		type: 'SUBMIT-LOGIN',
		url: '/login',
		method: 'POST',
		body: { email, password }
	};
	return request(req);
}

function logout() {
	const req = {
		type: 'SUBMIT-LOGOUT',
		url: '/logout',
		method: 'GET'
	};
	return request(req);
}

export default { setEmail, setPassword, login, logout };

