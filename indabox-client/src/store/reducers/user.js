import _ from 'lodash/fp';
import { createUser, setUserErrors } from '../../services/transform';

/**
 * user ...
 * @param {object} state
 * @param {object} action
 */
const user = (state = {}, action) => {
	switch (action.type) {
		case 'SET-USER-EMAIL':
			return _.set('email',
				Object.assign(state.email, { value: action.email, error: null }), state);
		case 'SET-USER-PASSWORD':
			return _.set('password',
				Object.assign(state.password, { value: action.password, error: null }), state);
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
		default:
			return state;
	}
};

export default user;

