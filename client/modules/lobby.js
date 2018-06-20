import axios from 'axios';

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


export const fetchIdeas = () => async dispatch => {
    const result = await axios.get('http://localhost:3000/api/ideas/lobby', { options: {} })
    dispatch({
        type: FETCH_IDEAS,
        payload: result.data
    })
};