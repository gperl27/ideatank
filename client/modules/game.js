
import { push } from 'react-router-redux';
import { reset } from 'redux-form'
import store from '../store';

export const FETCH_GAME = 'game/FETCH_GAME';
export const UPDATE_TIMER = 'game/UPDATE_TIMER';
export const TYPING = 'game/TYPING';

import { activePhase } from '../scenes/Game/selector'

const initialState = {
    activeGame: null,
    timer: 'n/a',
    usersTyping: [],
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

        case TYPING:
            return {
                ...state,
                usersTyping: action.payload
            };

        default:
            return state;
    }
};

//- socket.emit('intermission');

//- socket.on('intermission timer', data => {
//-   console.log('intermission timer', data);
//- })

//- socket.on('end intermission', () => {
//-   console.log('end intermission');
//- })

// Game Actions
export const startPhase = () => (dispatch, getState) => {
    socket.emit('phase start', {
        idea: getState().game.activeGame,
        phase: activePhase(getState()),
    });
}

export const userIsTyping = e => (dispatch, getState) => {
    const ideaId = getState().game.activeGame._id
    const uid = getState().auth.authUser._id

    if (e.target.value.length > 0) {
        socket.emit('is typing', {
            ideaId,
            uid,
        });
    } else {
        socket.emit('done typing', {
            ideaId,
            uid,
        });
    }
}

export const createThought = ({ text }) => (dispatch, getState) => {
    const idea = getState().game.activeGame;
    const uid = getState().auth.authUser._id
    const phase = activePhase(getState())

    socket.emit('add thought', {
        idea,
        phase,
        uid,
        text,
    });

    socket.emit('done typing', {
        ideaId: idea._id,
        uid
    });

    dispatch(reset('createThought'))
}

// View Logic
export const delegatePhase = () => (dispatch, getState) => {
    const idea = getState().game.activeGame;

    if (idea.isCompleted) {
        dispatch(push('/results'))
        return
    }

    // 0 is a special order
    // idea is in group finding (lobby)
    const currentPhase = activePhase(getState())
    if (currentPhase.order === 0) {
        dispatch(push('/'))
        return
    }

    // default to game for now
    dispatch(push('/game'))
};

// websocket listeners
export const wsListeners = socket => {
    socket.on('phase timer', ({ countdown }) => {
        store.dispatch({ type: UPDATE_TIMER, payload: countdown })
    })

    socket.on('update game', data => {
        store.dispatch({ type: FETCH_GAME, payload: data })
    })

    socket.on('phase change', _ => {
        store.dispatch({ type: UPDATE_TIMER, payload: 'n/a' })
        store.dispatch(delegatePhase())
    })

    socket.on('is typing', ({ uid }) => {
        const usersTyping = store.getState().game.usersTyping;

        // dont do anything if user was already typing
        if (usersTyping.includes(uid)) { return }

        store.dispatch({ type: TYPING, payload: usersTyping.concat(uid) })
    })

    socket.on('done typing', ({ uid }) => {
        const usersTyping = store.getState().game.usersTyping;

        store.dispatch({ type: TYPING, payload: usersTyping.filter(u => u !== uid) })
    })
}