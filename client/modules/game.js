
import { push } from 'react-router-redux';
import { reset } from 'redux-form'
import store from '../store';

export const FETCH_GAME = 'game/FETCH_GAME';
export const UPDATE_TIMER = 'game/UPDATE_TIMER';

const initialState = {
    activeGame: null,
    timer: 'n/a',
};

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_GAME:
            return {
                ...state,
                activeGame: action.payload
            };

        case UPDATE_TIMER:
            return {
                ...state,
                timer: action.payload
            };


        default:
            return state;
    }
};


//- socket.on('end game', data => {
//-   console.log(data);
//- })

//- socket.emit('intermission');

//- socket.on('intermission timer', data => {
//-   console.log('intermission timer', data);
//- })

//- socket.on('end intermission', () => {
//-   console.log('end intermission');
//- })

// Game Actions
export const startPhase = () => (dispatch, getState) => {
    socket.emit('phase start', { idea: getState().game.activeGame });
}

export const createThought = ({ text }) => (dispatch, getState) => {

    socket.emit('add thought', {
        idea: getState().game.activeGame,
        uid: getState().auth.authUser._id,
        text,
    });

    dispatch(reset('createThought'))
}

// View Logic
export const delegatePhase = idea => dispatch => {
    switch (idea.phase.key) {
        case 'problemsBeingSolved':
        case 'obstacles':
        case 'inspirations':
            dispatch({ type: FETCH_GAME, payload: idea })
            dispatch(push('/game'));
            break;

        default: dispatch(push('/'))
    }
};

// websocket listeners
export const wsListeners = socket => {
    socket.on('phase timer', ({ countdown }) => {
        store.dispatch({ type: UPDATE_TIMER, payload: countdown })
    })

    socket.on('update game', data => {
        store.dispatch({ type: FETCH_GAME, payload: data })
    })

    socket.on('end phase', data => {
        store.dispatch({ type: UPDATE_TIMER, payload: 'Time is up!' })
    })
}