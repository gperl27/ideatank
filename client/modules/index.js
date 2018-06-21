import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'

import lobby from './lobby';

export default combineReducers({
    router: routerReducer,
    form: formReducer,
    lobby,
});