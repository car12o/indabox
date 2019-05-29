import fp from 'lodash/fp';
import { createUser } from '../../services/transform';

function updatePartnersList(state, action) {
	if (action.status === 200) {
		return fp.set('list', action.body.map(partner => createUser(partner)), state);
	}

	return state;
}

const handlers = {
	UPDATE_PARTNERS_LIST: updatePartnersList,
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
