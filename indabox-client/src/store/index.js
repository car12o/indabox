import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from './reducers';
import { createUser } from '../services/transform';

export default (res) => {
    const { user, logged } = res.body;
    const initialState = createUser({ logged, ...user });
    const store = createStore(reducers, { user: initialState }, applyMiddleware(thunkMiddleware));
    return store;
}
