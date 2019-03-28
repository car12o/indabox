import _ from 'lodash/fp';
// import { createPartner } from '../../services/data';

const find = (data, id) => data.find(partner => id === partner.id);

// const initialState = {
// 	data: [
// 		createPartner({
// 			id: 1, number: 1, type: 'Sócio Titular', alerts: true, newsletter: true, firstName: 'Marco',
// 			lastName: 'Silva', nif: '33967045', email: 'marco.silva@gmail.com', phone: '914092645', address: 'Rua de cima',
// 			postCode: '0000-000', city: 'Porto', country: 'Portugal', notes: 'nota de test', createdBy: 'Andre Quim',
// 			createdAt: '2016-01-20 12:23:42', updatedBy: 'Ze Manel', updatedAt: '2016-01-22 12:23:42'
// 		}),
// 		createPartner({
// 			id: 2, number: 2, type: 'Sócio Titular', alerts: false, newsletter: true, firstName: 'Andre',
// 			lastName: 'Quim', nif: '33967045', email: 'andre.quim@gmail.com', phone: '914092645', address: 'Rua de cima',
// 			postCode: '0000-000', city: 'Porto', country: 'Portugal', notes: 'nota de test', createdBy: 'Marco Silva',
// 			createdAt: '2016-01-20 12:23:42', updatedBy: 'Marco Silva', updatedAt: '2016-01-20 12:23:42'
// 		}),
// 		createPartner({
// 			id: 3, number: 3, type: 'Sócio Titular', alerts: false, newsletter: false, firstName: 'Ze',
// 			lastName: 'Manel', nif: '33967045', email: 'ze.manel@gmail.com', phone: '914092645', address: 'Rua de cima',
// 			postCode: '0000-000', city: 'Porto', country: 'Portugal', notes: 'nota de test', createdBy: 'Marco Silva',
// 			createdAt: '2016-01-20 12:23:42', updatedBy: 'Marco Silva', updatedAt: '2016-01-20 12:23:42'
// 		}),
// 		createPartner({
// 			id: 4, number: 4, type: 'Sócio Titular', alerts: true, newsletter: false, firstName: 'Luisa',
// 			lastName: 'Andrade', nif: '33967045', email: 'luisa.andrade@gmail.com', phone: '914092645', address: 'Rua de cima',
// 			postCode: '0000-000', city: 'Porto', country: 'Portugal', notes: 'nota de test', createdBy: 'Marco Silva',
// 			createdAt: '2016-01-20 12:23:42', updatedBy: 'Marco Silva', updatedAt: '2016-01-20 12:23:42'
// 		}),
// 	],
// 	selected: {
// 		isEmpty: true,
// 		value: createPartner({}),
// 	}
// };

const partners = (state = {}, action) => {
	switch (action.type) {
		case 'SET-SELECTED':
			return _.set('selected', { value: find(state.data, action.id), isEmpty: false }, state);
		default:
			return state;
	}
};

export { partners };

