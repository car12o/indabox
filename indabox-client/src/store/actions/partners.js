import request from '../../services/request';

export function getPartners() {
	const req = {
		type: 'UPDATE_PARTNERS_LIST',
		url: '/users',
		method: 'GET',
	};

	return request(req);
}

export function getPartner(id) {
	const req = {
		type: 'UPDATE_PARTNERS_SELECTED',
		url: `/users/${id}`,
		method: 'GET',
	};

	return request(req);
}

export function setPartnersSelectedProperty(path, value) {
	return {
		type: 'SET_PARTNER_SELECTED_PROPERTY',
		path,
		value,
	}
}