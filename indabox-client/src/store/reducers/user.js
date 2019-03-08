import _ from 'lodash/fp';
import { createPartner } from '../../services/data';

const initialState = Object.assign({}, {
	logged: false
}, createPartner({
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

