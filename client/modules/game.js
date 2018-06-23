
import { push } from 'react-router-redux';
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

//- socket.on('phase timer', data => {
//-   console.log(data);
//- })

// - socket.emit('phase start', { ideaId: '5b29290a79e36b0153c7a40f', countdown: 3000 });

//- socket.on('end phase', data => {
//-   console.log(data);
//- })

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

// socket.on('added thought', data => {
//     console.log(data, 'added thgouht')
//     // dispatch here
// })

// ws listeners
// socket.on('phase timer', ({ countdown }) => {
//     store.dispatch({ type: UPDATE_TIMER, payload: countdown })
// })

// Game Actions
export const startPhase = idea => dispatch => {
    dispatch({ type: FETCH_GAME, payload: idea })
    socket.emit('phase start', { idea });
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
    socket.on('phase timer', data => {
        store.dispatch({ type: UPDATE_TIMER, payload: data })
    })
}