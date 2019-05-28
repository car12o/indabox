import fp from 'lodash/fp';
import request from '../../services/request';
const _ = fp.convert({ cap: false });

function setFirstName(firstName) {
	return {
		type: 'SET-SELECTED-FIRSTNAME',
		firstName,
	};
}

function setLastName(lastName) {
	return {
		type: 'SET-SELECTED-LASTNAME',
		lastName,
	};
}

function setNif(nif) {
	return {
		type: 'SET-SELECTED-NIF',
		nif,
	};
}

function setEmail(email) {
	return {
		type: 'SET-SELECTED-EMAIL',
		email,
	};
}

function setPassword(password) {
	return {
		type: 'SET-SELECTED-PASSWORD',
		password,
	};
}

function setAlerts(alerts) {
	return {
		type: 'SET-SELECTED-ALERTS',
		alerts,
	};
}

function setNewsletter(newsletter) {
	return {
		type: 'SET-SELECTED-NEWSLETTER',
		newsletter,
	};
}

function setPhone(phone) {
	return {
		type: 'SET-SELECTED-PHONE',
		phone,
	};
}

function setType(type) {
	return {
		type: 'SET-SELECTED-TYPE',
		partnertype: type,
	};
}

function setAddress(address) {
	return {
		type: 'SET-SELECTED-ADDRESS',
		address,
	};
}

function setPostCode(postCode) {
	return {
		type: 'SET-SELECTED-POSTCODE',
		postCode,
	};
}

function setCity(city) {
	return {
		type: 'SET-SELECTED-CITY',
		city,
	};
}

function setCountry(country) {
	return {
		type: 'SET-SELECTED-COUNTRY',
		country,
	};
}

function setNotes(notes) {
	return {
		type: 'SET-SELECTED-NOTES',
		notes,
	};
}

function getPartners() {
	const req = {
		type: 'GET-PARTNERS',
		url: '/users',
		method: 'GET',
	};
	return request(req);
}

function getPartner(id) {
	const req = {
		type: 'GET-PARTNER',
		url: `/users/${id}`,
		method: 'GET',
	};
	return request(req);
}

function setSelected(id, history) {
	history.push(`/partners/${id}`);
	return {
		type: 'SET-SELECTED',
		id,
	};
}

function update(data) {
	const { id, logged, password, quotas, createdAt, updatedAt, createdBy, updatedBy, phone, ...rest } = data;
	const body = _.transform((accm, elem, key) => {
		if (!_.has('value', elem)) {
			return Object.assign(accm, { [key]: elem });
		}
		return Object.assign(accm, { [key]: elem.value });
	}, {}, rest);

	const req = {
		type: 'SUBMIT-SELECTED-UPDATE',
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
	getPartners,
	getPartner,
	setSelected,
	update,
};
