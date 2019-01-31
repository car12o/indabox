import request from '../../services/request';

function setEmail(email) {
	return {
		type: 'SET-USERNAME',
		email
	};
}

function setPassword(password) {
	return {
		type: 'SET-PASSWORD',
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

function register(username, password) {
	const req = {
		type: 'SUBMIT-REGISTER',
		url: '/users',
		method: 'POST',
		body: { username, password }
	};
	return request(req);
}

export default { setEmail, setPassword, login, register };
