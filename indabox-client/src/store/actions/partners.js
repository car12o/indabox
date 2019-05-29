import request from '../../services/request';

export function getPartners() {
	const req = {
		type: 'UPDATE_PARTNERS_LIST',
		url: '/users',
		method: 'GET',
	};

	return request(req);
}