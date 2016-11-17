import {
    GET_USER_STORIES
} from '../actions/UserStory';

export function loadedUserStories(state = {loaded: true}, action) {
    switch (action.type) {
        case GET_USER_STORIES:
            return Object.assign({}, state, {
                loaded: action.loaded,
                date: action.date,
                data: action.data,
                error: action.error,
                errorMessage: action.errorMessage
            });
        default:
            return state;
    }
}