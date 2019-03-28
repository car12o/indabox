import { combineReducers } from 'redux';
import { user } from './user';
import { partners } from './partners';

export default combineReducers({ user, partners });
