import _ from 'lodash/fp';
import { createUser } from '../../services/transform';

/**
 * find ...
 * @param {object} data
 * @param {object} id
 */
const find = (data, id) => data.find(partner => id === partner.id);

const initialState = {
	list: [],
	selected: createUser({}),
};

/**
 * partners ...
 * @param {object} state
 * @param {object} action
 */
const partners = (state = initialState, action) => {
	switch (action.type) {
		case 'SET-SELECTED-FIRSTNAME':
			return _.set('selected.firstName',
				Object.assign(state.selected.firstName, { value: action.firstName, error: null }),
				state,
			);
		case 'GET-PARTNERS':
			if (action.status !== 200) {
				return state;
			}
			return Object.assign({},
				state,
				{ list: action.body.map(elem => createUser(Object.assign({}, elem, { id: elem._id }))) });
		case 'GET-PARTNER':
			if (action.status !== 200) {
				return state;
			}
			return _.set('selected', createUser(Object.assign({}, action.body, { id: action.body._id })), state);
		case 'SET-SELECTED':
			return _.set('selected', find(state.list, action.id), state);
		case 'SUBMIT-SELECTED-UPDATE':
			console.log(action);
			return state;
		default:
			return state;
	}
};

export default partners;

