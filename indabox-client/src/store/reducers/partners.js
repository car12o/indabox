import fp from 'lodash/fp';
import { createUser } from '../../services/transform';

function updatePartnersList(state, action) {
	if (action.status === 200) {
		return fp.set('list', action.body.map(partner => createUser(partner)), state);
	}

	return state;
}

function updatePartnersSelected(state, action) {
	if (action.status === 200) {
		return fp.set('selected', createUser(action.body), state);
	}

	return state;
}

function setPartnersSelectedProperty(state, action) {
	const { path, value } = action;

	if (fp.has(`selected.${path}.value`, state)) {
		const newState = fp.set(`selected.${path}.value`, value, state);

		if (fp.has(`selected.${path}.error`, newState)) {
			return fp.set(`selected.${path}.error`, null, newState);
		}

		return newState;
	}

	return fp.set(`selected.${path}`, value, state);
}

const handlers = {
	UPDATE_PARTNERS_LIST: updatePartnersList,
	UPDATE_PARTNERS_SELECTED: updatePartnersSelected,
	SET_PARTNER_SELECTED_PROPERTY: setPartnersSelectedProperty,
};

const initialState = {
	list: [],
	selected: createUser({}),
};

const partnersReducer = (state = initialState, action) => {
	if (fp.has(action.type, handlers)) {
		return handlers[action.type](state, action);
	}

	return state;
}

export default partnersReducer;
