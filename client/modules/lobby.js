import axios from 'axios';
import io from 'socket.io-client';

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
    console.log(idea);
    //- socket.emit('new idea', { description: 'asdfewfqasdf', creator: '5b287d06e3796f038bd48b07'});
}