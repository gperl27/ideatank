import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import lobby from './lobby';

export default combineReducers({
    router: routerReducer,
    lobby,
});