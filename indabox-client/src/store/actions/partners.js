import request from '../../services/request';
import { cleanUserToSubmit } from '../../services/transform';

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
		type: 'UPDATE_PARTNER',
		url: `/users/${id}`,
		method: 'GET',
	};

	return request(req);
}

export function updatePartnerIdentification(user) {
	const body = cleanUserToSubmit(user, [
		'title',
		'firstName',
		'lastName',
		'role',
		'number',
		'nif',
		'email',
		'password',
		'rePassword',
		'ballotNumber',
		'specialty',
		'specialtySessions',
		'alerts',
		'newsletter',
	]);

	const req = {
		type: 'UPDATE_PARTNER',
		url: `/users/${user.id}`,
		method: 'PATCH',
		body,
	};

	return request(req);
}

export function updatePartnerContact(user) {
	const body = cleanUserToSubmit(user, [
		'address',
		'mobile',
		'phone',
		'billing',
	]);

	const req = {
		type: 'UPDATE_PARTNER',
		url: `/users/${user.id}`,
		method: 'PATCH',
		body,
	};

	return request(req);
}

export function updatePartnerNotes(user) {
	const body = cleanUserToSubmit(user, ['notes']);

	const req = {
		type: 'UPDATE_PARTNER',
		url: `/users/${user.id}`,
		method: 'PATCH',
		body,
	};

	return request(req);
}

export function setPartnerProperty(path, value) {
	return {
		type: 'SET_PARTNER_PROPERTY',
		path,
		value,
	}
}

export function setPaymentInvoiceStatus(paymentId, status) {
	return {
		type: 'SET_PAYMENT_INVOICE_STATUS',
		paymentId,
		status,
	};
}