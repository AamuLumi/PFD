import {
    CREATE_PROJECT,
    GET_PROJECTS,
    GET_PROJECT,
    EDIT_PROJECT,
    SUBSCRIBE_PROJECT
} from '../actions/Project';

export function createdProject(state = {loaded: true}, action) {
    switch (action.type) {
        case CREATE_PROJECT:
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

export function projectList(state = {loaded: true}, action) {
    switch (action.type) {
        case GET_PROJECTS:
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

export function loadedProject(state = {loaded: true}, action) {
    switch (action.type) {
        case GET_PROJECT:
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

export function editedProject(state = {loaded: true}, action) {
    switch (action.type) {
        case EDIT_PROJECT:
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

export function subscribeResult(state = {loaded: true}, action) {
    switch (action.type) {
        case SUBSCRIBE_PROJECT:
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