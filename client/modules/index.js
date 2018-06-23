import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form'

import auth from './auth';
import lobby from './lobby';
import game from './game';

export default combineReducers({
    router: routerReducer,
    form: formReducer,
    lobby,
    game,
    auth,
});