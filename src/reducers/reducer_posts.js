import _ from 'lodash';
import { FETCH_POSTS } from '../actions';

export default function (state = {}, action) { // initial state is an empty object
    switch (action.type) {
        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id'); // lodash magic that turns array to object with mapped keys
        default:
            return state;
    }
}