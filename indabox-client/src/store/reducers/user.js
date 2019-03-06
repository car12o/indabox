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

const initialState = Object.assign({}, {
	logged: false
}, createData({
	id: 3, number: 3, type: 'Sócio Titular', alerts: false, newsletter: false, firstName: 'Ze',
	lastName: 'Manel', nif: '33967045', email: 'ze.manel@gmail.com', phone: '914092645', address: 'Rua de cima',
	postCode: '0000-000', city: 'Porto', country: 'Portugal', notes: 'nota de test', createdBy: 'Marco Silva',
	createdAt: '2016-01-20 12:23:42', updatedBy: 'Marco Silva', updatedAt: '2016-01-20 12:23:42'
}));

const user = (state = initialState, action) => {
	switch (action.type) {
		// case 'INITIAL-STATE':
		// 	return _.set('logged', action.body.logged, state);
		case 'SET-EMAIL':
			return _.set('email.value', action.email, state);
		case 'SET-PASSWORD':
			return _.set('password.value', action.password, state);
		case 'SUBMIT-LOGIN':
			if (action.status !== 200) {
				// eslint-disable-next-line no-alert
				alert(action.body.err);
				return state;
			}

			console.log('action', action);

			return state;
		default:
			return state;
	}
};

export default user;

