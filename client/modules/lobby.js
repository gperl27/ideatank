import io from 'socket.io-client';
import { reset } from 'redux-form'
import store from '../store';

const socket = io('http://localhost:3000');

export const FETCH_IDEAS = 'lobby/FETCH_IDEAS';

const initialState = {
    ideas: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_IDEAS:
            return {
                ...state,
                ideas: action.payload
            };

        default:
            return state;
    }
};

// Getters
export const fetchIdeas = () => async dispatch => {
    const result = await axios.get('http://localhost:3000/api/ideas/lobby')
    dispatch({
        type: FETCH_IDEAS,
        payload: result.data
    })
};

// UI
export const joinGame = (idea, shouldUpdate = true) => (dispatch, getState) => {
    const { authUser } = getState().auth;
    socket.emit('join room', { idea, participant: authUser._id, shouldUpdate });
}

export const leaveGame = idea => (dispatch, getState) => {
    const { authUser } = getState().auth;
    socket.emit('leave room', { idea, participant: authUser._id });
}

export const cancelGame = idea => (dispatch, getState) => {
    const { authUser } = getState().auth;
    socket.emit('cancel game', { idea, creator: authUser._id });
}

export const createIdea = ({ description }) => (dispatch, getState) => {
    const { authUser } = getState().auth;
    socket.emit('new idea', { description, creator: authUser._id });

    dispatch(reset('createIdea'))
}

// websocket listeners
socket.on('lobby refresh', (data) => {
    console.log('lobby refresh')
    store.dispatch({
        type: FETCH_IDEAS,
        payload: data
    })
});