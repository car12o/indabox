import fp from 'lodash/fp';
import request from '../../services/request';
const _ = fp.convert({ cap: false });

function setFirstName(firstName) {
	return {
		type: 'SET-SELECTED-FIRSTNAME',
		firstName
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
		id
	};
}

function update(data) {
	const { id, quotas, createdAt, updatedAt, ...rest } = data;
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
		type: 'SUBMIT-SELECTED-UPDATE',
		url: `/users/${id}`,
		method: 'PATCH',
		body,
	};

	return request(req);
}

export default {
	setFirstName,
	getPartners,
	getPartner,
	setSelected,
	update,
};
