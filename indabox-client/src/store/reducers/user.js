import _ from 'lodash/fp';
import { createUser, setUserErrors } from '../../services/transform';

/**
 * user ...
 * @param {object} state
 * @param {object} action
 */
const user = (state = {}, action) => {
	switch (action.type) {
		case 'SET-USER-FIRSTNAME':
			return _.set('firstName',
				Object.assign(state.firstName, { value: action.firstName, error: null }), state);
		case 'SET-USER-LASTNAME':
			return _.set('lastName',
				Object.assign(state.lastName, { value: action.lastName, error: null }), state);
		case 'SET-USER-NIF':
			return _.set('nif',
				Object.assign(state.nif, { value: action.nif, error: null }), state);
		case 'SET-USER-EMAIL':
			return _.set('email',
				Object.assign(state.email, { value: action.email, error: null }), state);
		case 'SET-USER-PASSWORD':
			return _.set('password',
				Object.assign(state.password, { value: action.password, error: null }), state);
		case 'SET-USER-ALERTS':
			return _.set('alerts.value', action.alerts, state);
		case 'SET-USER-NEWSLETTER':
			return _.set('newsletter.value', action.newsletter, state);
		case 'SET-USER-PHONE':
			return _.set('phone',
				Object.assign(state.phone, { value: action.phone, error: null }), state);
		case 'SET-USER-ADDRESS':
			return _.set('address',
				Object.assign(state.address, { value: action.address, error: null }), state);
		case 'SET-USER-POSTCODE':
			return _.set('postCode',
				Object.assign(state.postCode, { value: action.postCode, error: null }), state);
		case 'SET-USER-CITY':
			return _.set('city',
				Object.assign(state.city, { value: action.city, error: null }), state);
		case 'SET-USER-COUNTRY':
			return _.set('country',
				Object.assign(state.country, { value: action.country, error: null }), state);
		case 'SET-USER-NOTES':
			return _.set('notes',
				Object.assign(state.notes, { value: action.notes, error: null }), state);
		case 'SUBMIT-LOGIN':
			if (action.status !== 200) {
				return setUserErrors(state, action.body.payload)
			}
			return createUser({
				logged: action.body.logged,
				...action.body.user
			});
		case 'SUBMIT-LOGOUT':
			return createUser({
				logged: action.body.logged,
				...action.body.user
			});
		case 'SUBMIT-USER-UPDATE':
		case 'GET-USER':
			if (action.status !== 200) {
				return setUserErrors(state, action.body.payload)
			}
			return createUser({
				logged: true,
				...Object.assign({}, action.body, { id: action.body._id }),
			});
		default:
			return state;
	}
};

export default user;

