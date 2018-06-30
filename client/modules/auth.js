import { push } from 'react-router-redux';
export const AUTH_USER = 'auth/AUTH_USER';
export const AUTH_ERROR = 'auth/AUTH_ERROR';

import { removeToken, fetchToken } from '../lib/auth';

import { FETCH_GAME, delegatePhase } from './game'
import { joinGame } from './lobby';

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

export const fetchAuthUser = () => async dispatch => {
    try {
        const response = await axios.get('http://localhost:3000/api/auth/user')
        const { user, currentIdea } = response.data;
        dispatch({ type: AUTH_USER, payload: user })

        console.log()

        if (currentIdea) {
            dispatch(joinGame(currentIdea, false))
            dispatch({ type: FETCH_GAME, payload: currentIdea })
            dispatch(delegatePhase())
        }
    } catch (e) {
        console.log(e, e.message);
        dispatch(signout());
    }
}


export const signup = formData => async dispatch => {
    fetchToken(
        'http://localhost:3000/api/auth/register',
        formData,
        () => dispatch(push('/')),
        (e) => dispatch({ type: AUTH_ERROR, payload: e.message })
    )
};

export const signin = formData => async dispatch => {
    fetchToken(
        'http://localhost:3000/api/auth/login',
        formData,
        () => dispatch(push('/')),
        (e) => dispatch({ type: AUTH_ERROR, payload: e.message })
    )
};

export const signout = () => dispatch => {
    dispatch({ type: AUTH_USER, payload: null });
    dispatch(push('/login'));
    removeToken()
};