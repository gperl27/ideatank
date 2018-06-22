import io from 'socket.io-client';
import { reset } from 'redux-form'
import store from '../store';

const socket = io('http://localhost:3000');

export const FETCH_IDEAS = 'lobby/FETCH_IDEAS';

const initialState = {
    ideas: [],
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
export const joinGame = idea => dispatch => {
    socket.emit('join room', { idea, participant: '5b2c81319a567d377fdf7301' });

    //- socket.emit('new idea', { description: 'asdfewfqasdf', creator: '5b2c81319a567d377fdf7301'});
}

export const createIdea = ({ description }) => dispatch => {
    socket.emit('new idea', { description, creator: '5b2c81319a567d377fdf7301' });

    dispatch(reset('createIdea'))
    //- socket.emit('new idea', { description: 'asdfewfqasdf', creator: '5b2c81319a567d377fdf7301'});
}

// websocket listeners
socket.on('joined room', (data) => {
    console.log('joined room and a lobby')
    store.dispatch({
        type: FETCH_IDEAS,
        payload: data
    })
});

socket.on('created idea', (data) => {
    console.log('created idea')
    store.dispatch({
        type: FETCH_IDEAS,
        payload: data
    })
});