import {
    CREATE_SPRINT,
    GET_SPRINT,
    ADD_USER_STORY_TO_SPRINT
} from '../actions/Sprint';

export function createdSprint(state = {loaded: true}, action) {
    switch (action.type) {
        case CREATE_SPRINT:
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

export function loadedSprints(state = {loaded: true}, action) {
    switch (action.type) {
        case GET_SPRINT:
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

export function addedUserStoryToSprint(state = {loaded: true}, action) {
    switch (action.type) {
        case ADD_USER_STORY_TO_SPRINT:
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