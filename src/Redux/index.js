import { combineReducers } from 'redux';
import { userFormReducer } from './UserForm/userFormReducer';

export default combineReducers({
    detail:userFormReducer,
})