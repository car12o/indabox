import fp from 'lodash/fp';
import request from '../../services/request';
const _ = fp.convert({ cap: false });

function setFirstName(firstName) {
	return {
		type: 'SET-USER-FIRSTNAME',
		firstName
	};
}

function setLastName(lastName) {
	return {
		type: 'SET-USER-LASTNAME',
		lastName
	};
}

function setNif(nif) {
	return {
		type: 'SET-USER-NIF',
		nif
	};
}

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

function setAlerts(alerts) {
	return {
		type: 'SET-USER-ALERTS',
		alerts
	};
}

function setNewsletter(newsletter) {
	return {
		type: 'SET-USER-NEWSLETTER',
		newsletter
	};
}

function setPhone(phone) {
	return {
		type: 'SET-USER-PHONE',
		phone
	};
}

function setType(type) {
	return {
		type: 'SET-USER-TYPE',
		userType: type,
	};
}

function setAddress(address) {
	return {
		type: 'SET-USER-ADDRESS',
		address
	};
}

function setPostCode(postCode) {
	return {
		type: 'SET-USER-POSTCODE',
		postCode
	};
}

function setCity(city) {
	return {
		type: 'SET-USER-CITY',
		city
	};
}

function setCountry(country) {
	return {
		type: 'SET-USER-COUNTRY',
		country
	};
}

function setNotes(notes) {
	return {
		type: 'SET-USER-NOTES',
		notes
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

function getUser(id) {
	const req = {
		type: 'GET-USER',
		url: `/users/${id}`,
		method: 'GET'
	};
	return request(req);
}

function update(user) {
	const { id, quotas, createdAt, updatedAt, ...rest } = user;
	const body = _.transform((accm, elem, key) => {
		if (!_.has('value', elem) && !_.isEmpty(elem)) {
			return Object.assign(accm, { [key]: elem });
		}

		if (_.isBoolean(elem.value) || !_.isEmpty(elem.value)) {
			return Object.assign(accm, { [key]: elem.value });
		}
		return accm;
	}, {}, rest);

	const req = {
		type: 'SUBMIT-USER-UPDATE',
		url: `/users/${id}`,
		method: 'PATCH',
		body,
	};

	return request(req);
}

export default {
	setFirstName,
	setLastName,
	setNif,
	setEmail,
	setPassword,
	setAlerts,
	setNewsletter,
	setPhone,
	setType,
	setAddress,
	setPostCode,
	setCity,
	setCountry,
	setNotes,
	login,
	logout,
	update,
	getUser,
};

