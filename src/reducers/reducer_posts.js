import _ from 'lodash';
import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';

export default function (state = {}, action) { // initial state is an empty object
    switch (action.type) {
        case FETCH_POST:
            // ES5:
            // const post = action.payload.data; // object returned by axios
            // const newState = { ...state };
            // newState[post.id] = post; // add the new post to the array of existing posts
            // return newState;
            // ES6:
            return { ...state, [action.payload.data.id]: action.payload.data };

        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id'); // lodash magic that turns array to object with mapped keys
        
        case DELETE_POST:
            return _.omit(state, action.payload); // lodash: if the state has the payload (id) then remove it from the state
  
        default:
            return state;
    }
}