import axios from 'axios';

import { reset } from 'redux-form'
import { AUTH_USER, AUTH_ERROR } from './types';
export const AUTH_USER = 'auth/AUTH_USER';
export const AUTH_ERROR = 'auth/AUTH_ERROR';

const initialState = {
    authUser: null,
    authError: null, // possibly handle errors universally?
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTH_USER:
            return {
                ...state,
                authUser: action.payload,
                authError: null,
            };

        case AUTH_ERROR:
            return {
                ...state,
                authError: action.payload,
            };

        default:
            return state;
    }
};


export const signup = formProps => async dispatch => {
    try {
        const response = await axios.post(
            'http://localhost:3000/api/register',
            formProps
        );

        dispatch({ type: AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token);
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
    }
};

export const signin = (formProps, callback) => async dispatch => {
    try {
        const response = await axios.post(
            'http://localhost:3090/signin',
            formProps
        );

        dispatch({ type: AUTH_USER, payload: response.data.token });
        localStorage.setItem('token', response.data.token);
        callback();
    } catch (e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
    }
};

export const signout = () => {
    localStorage.removeItem('token');

    return {
        type: AUTH_USER,
        payload: ''
    };
};