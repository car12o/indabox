import _ from 'lodash/fp';
import { createUser, setUserErrors } from '../../services/transform';

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
		case 'SET-SELECTED-LASTNAME':
			return _.set('selected.lastName',
				Object.assign(state.selected.lastName, { value: action.lastName, error: null }),
				state,
			);
		case 'SET-SELECTED-NIF':
			return _.set('selected.nif',
				Object.assign(state.selected.nif, { value: action.nif, error: null }),
				state,
			);
		case 'SET-SELECTED-EMAIL':
			return _.set('selected.email',
				Object.assign(state.selected.email, { value: action.email, error: null }),
				state,
			);
		case 'SET-SELECTED-PASSWORD':
			return _.set('selected.password',
				Object.assign(state.selected.password, { value: action.password, error: null }),
				state,
			);
		case 'SET-SELECTED-ALERTS':
			return _.set('selected.alerts.value', action.alerts,
				state,
			);
		case 'SET-SELECTED-NEWSLETTER':
			return _.set('selected.newsletter.value', action.newsletter,
				state,
			);
		case 'SET-SELECTED-PHONE':
			return _.set('selected.phone',
				Object.assign(state.selected.phone, { value: action.phone, error: null }),
				state,
			);
		case 'SET-SELECTED-TYPE':
			return _.set('selected.type',
				Object.assign(state.selected.type, { value: action.partnertype, error: null }),
				state,
			);
		case 'SET-SELECTED-ADDRESS':
			return _.set('selected.address',
				Object.assign(state.selected.address, { value: action.address, error: null }),
				state,
			);
		case 'SET-SELECTED-POSTCODE':
			return _.set('selected.postCode',
				Object.assign(state.selected.postCode, { value: action.postCode, error: null }),
				state,
			);
		case 'SET-SELECTED-CITY':
			return _.set('selected.city',
				Object.assign(state.selected.city, { value: action.city, error: null }),
				state,
			);
		case 'SET-SELECTED-COUNTRY':
			return _.set('selected.country',
				Object.assign(state.selected.country, { value: action.country, error: null }),
				state,
			);
		case 'SET-SELECTED-NOTES':
			return _.set('selected.notes',
				Object.assign(state.selected.notes, { value: action.notes, error: null }),
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
			if (action.status !== 200) {
				const user = setUserErrors(state.selected, action.body.payload);
				return _.set('selected', user, state);
			}
			return _.set('selected', createUser(Object.assign({}, action.body, { id: action.body._id })), state);
		default:
			return state;
	}
};

export default partners;

