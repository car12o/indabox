const initialState = {
	logged: false,
	_id: '',
	email: '',
	nif: '',
	password: '',
	firstName: '',
	lastName: '',
	number: '',
	role: ''
};

const user = (state = initialState, action) => {
	switch (action.type) {
		case 'SET-USERNAME':
			return Object.assign({}, state, { email: action.email });
		case 'SET-PASSWORD':
			return Object.assign({}, state, { password: action.password });
		case 'SUBMIT-LOGIN':
			if (action.status !== 200) {
				// eslint-disable-next-line no-alert
				alert(action.body.err);
				return state;
			}

			return Object.assign({}, state, {
				logged: action.body.logged,
				...action.body.user
			});
		default:
			return state;
	}
};

export default user;

