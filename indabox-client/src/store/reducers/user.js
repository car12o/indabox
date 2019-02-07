import _ from 'lodash/fp';

const initialState = {
	logged: false,
	_id: '',
	role: '',
	email: {
		label: 'Email',
		value: '',
		error: null,
	},
	nif: {
		label: 'NIF',
		value: '',
		error: null,
	},
	password: {
		label: 'Palavra chave',
		value: '',
		error: null,
	},
	firstName: {
		label: 'Primeiro nome',
		value: '',
		error: null,
	},
	lastName: {
		label: 'Ultimo nome',
		value: '',
		error: null,
	},
	number: {
		label: 'Numero de telefone',
		value: '',
		error: null,
	},
};

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

