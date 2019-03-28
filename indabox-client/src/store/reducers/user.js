import _ from 'lodash/fp';

/**
 * createUser ...
 * @param {object} user 
 */
const createUser = user => ({
	logged: _.getOr(false, 'logged', user),
	id: user.id || '',
	number: _.getOr(0, 'number', user),
	type: user.type || '',
	alerts: {
		label: 'Receber alertas',
		value: _.getOr(false, 'alerts', user),
	},
	newsletter: {
		label: 'Receber newsletters',
		value: _.getOr(false, 'newsletter', user),
	},
	firstName: {
		label: 'Nome',
		value: user.firstName || '',
		error: null
	},
	lastName: {
		label: 'Apelido',
		value: user.lastName || '',
		error: null
	},
	nif: {
		label: 'NIF',
		value: user.nif || '',
		error: null
	},
	email: {
		label: 'Endereço de email',
		value: user.email || '',
		error: null
	},
	password: {
		label: 'Palavra chave',
		value: user.password || '',
		error: null
	},
	phone: {
		label: 'Telefone',
		value: user.phone || '',
		error: null
	},
	address: {
		label: 'Morada',
		value: user.address || '',
		error: null
	},
	postCode: {
		label: 'Código de Postal',
		value: user.postCode || '',
		error: null
	},
	city: {
		label: 'Localidade',
		value: user.city || '',
		error: null
	},
	country: {
		label: 'Pais',
		value: user.country || '',
		error: null
	},
	notes: {
		label: 'Notas',
		value: user.notes || '',
		error: null
	},
	createdBy: user.createdBy || '',
	createdAt: user.createdAt || '',
	updatedBy: user.updatedBy || '',
	updatedAt: user.updatedAt || '',
	quotas: [],
});

/**
 * setUserErrors ...
 * @param {object} state
 * @param {object} errors
 */
const setUserErrors = (state, errors) => errors.reduce((accm, e) => {
	const { key, err } = e;
	if (_.has(`${key}.value`, accm)) {
		const prop = Object.assign({}, accm[key], { error: err });
		return Object.assign({}, accm, { [key]: prop });
	}
	return accm;
}, Object.assign({}, state));

/**
 * user ...
 * @param {object} state
 * @param {object} action
 */
const user = (state = {}, action) => {
	switch (action.type) {
		case 'SET-EMAIL':
			return _.set('email',
				Object.assign(state.email, { value: action.email, error: null }), state);
		case 'SET-PASSWORD':
			return _.set('password',
				Object.assign(state.password, { value: action.password, error: null }), state);
		case 'SUBMIT-LOGIN':
			if (action.status !== 200) {
				return setUserErrors(state, action.body.payload)
			}
			const { logged, user } = action.body;
			return createUser({ logged, ...user });
		default:
			return state;
	}
};

export { user, createUser, setUserErrors };
