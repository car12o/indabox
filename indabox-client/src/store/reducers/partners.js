import _ from 'lodash/fp';

const createData = partner => ({
	id: partner.id || '',
	number: partner.number || '',
	type: partner.type || '',
	alerts: {
		label: 'Receber alertas',
		value: partner.alerts || false,
	},
	newsletter: {
		label: 'Receber newsletters',
		value: partner.newsletter || false,
	},
	firstName: {
		label: 'Nome',
		value: partner.firstName || '',
		error: null
	},
	lastName: {
		label: 'Apelido',
		value: partner.lastName || '',
		error: null
	},
	nif: {
		label: 'NIF',
		value: partner.nif || '',
		error: null
	},
	email: {
		label: 'Endereço de email',
		value: partner.email || '',
		error: null
	},
	phone: {
		label: 'Telefone',
		value: partner.phone || '',
		error: null
	},
	address: {
		label: 'Morada',
		value: partner.address || '',
		error: null
	},
	postCode: {
		label: 'Código de Postal',
		value: partner.postCode || '',
		error: null
	},
	city: {
		label: 'Localidade',
		value: partner.city || '',
		error: null
	},
	country: {
		label: 'Pais',
		value: partner.country || '',
		error: null
	},
	notes: {
		label: 'Notas',
		value: partner.notes || '',
		error: null
	},
	createdBy: partner.createdBy || '',
	createdAt: partner.createdAt || '',
	updatedBy: partner.updatedBy || '',
	updatedAt: partner.updatedAt || '',
});

const find = (data, id) => data.find(partner => id === partner.id);

const initialState = {
	data: [
		createData({
			id: 1, number: 1, type: 'Sócio Titular', alerts: true, newsletter: true, firstName: 'Marco',
			lastName: 'Silva', nif: '33967045', email: 'marco.silva@gmail.com', phone: '914092645', address: 'Rua de cima',
			postCode: '0000-000', city: 'Porto', country: 'Portugal', notes: 'nota de test', createdBy: 'Andre Quim',
			createdAt: '2016-01-20 12:23:42', updatedBy: 'Ze Manel', updatedAt: '2016-01-22 12:23:42'
		}),
		createData({
			id: 2, number: 2, type: 'Sócio Titular', alerts: false, newsletter: true, firstName: 'Andre',
			lastName: 'Quim', nif: '33967045', email: 'andre.quim@gmail.com', phone: '914092645', address: 'Rua de cima',
			postCode: '0000-000', city: 'Porto', country: 'Portugal', notes: 'nota de test', createdBy: 'Marco Silva',
			createdAt: '2016-01-20 12:23:42', updatedBy: 'Marco Silva', updatedAt: '2016-01-20 12:23:42'
		}),
		createData({
			id: 3, number: 3, type: 'Sócio Titular', alerts: false, newsletter: false, firstName: 'Ze',
			lastName: 'Manel', nif: '33967045', email: 'ze.manel@gmail.com', phone: '914092645', address: 'Rua de cima',
			postCode: '0000-000', city: 'Porto', country: 'Portugal', notes: 'nota de test', createdBy: 'Marco Silva',
			createdAt: '2016-01-20 12:23:42', updatedBy: 'Marco Silva', updatedAt: '2016-01-20 12:23:42'
		}),
		createData({
			id: 4, number: 4, type: 'Sócio Titular', alerts: true, newsletter: false, firstName: 'Luisa',
			lastName: 'Andrade', nif: '33967045', email: 'luisa.andrade@gmail.com', phone: '914092645', address: 'Rua de cima',
			postCode: '0000-000', city: 'Porto', country: 'Portugal', notes: 'nota de test', createdBy: 'Marco Silva',
			createdAt: '2016-01-20 12:23:42', updatedBy: 'Marco Silva', updatedAt: '2016-01-20 12:23:42'
		}),
	],
	selected: {
		isEmpty: true,
		value: createData({}),
	}
};

const partners = (state = initialState, action) => {
	switch (action.type) {
		case 'SET-SELECTED':
			return _.set('selected', { value: find(state.data, action.id), isEmpty: false }, state);
		default:
			return state;
	}
};

export default partners;

