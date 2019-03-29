import request from '../../services/request';

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
		id
	};
}

export default { getPartners, getPartner, setSelected };
