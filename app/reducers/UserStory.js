import {
    CREATE_USER_STORY,
    GET_USER_STORIES,
    EDIT_USER_STORY
} from '../actions/UserStory';

export function createdUserStory(state = {loaded: true}, action) {
    switch (action.type) {
        case CREATE_USER_STORY:
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

export function editedUserStory(state = {loaded: true}, action) {
    switch (action.type) {
        case EDIT_USER_STORY:
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