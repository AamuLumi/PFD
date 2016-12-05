import {
    CREATE_USER,
    GET_LOGGED_USER,
    GET_USERS
} from '../actions/User';

import {
    LOGOUT
} from '../actions/Auth';

export function createdUser(state = {loaded: true}, action) {
    switch (action.type) {
        case CREATE_USER:
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

export function loggedUser(state = {loaded: true}, action) {
    switch (action.type) {
        case GET_LOGGED_USER:
            return Object.assign({}, state, {
                loaded: action.loaded,
                date: action.date,
                data: action.data,
                error: action.error,
                errorMessage: action.errorMessage
            });
        case LOGOUT:
            return Object.assign({}, state, {
                data: undefined,
                date: Date.now()
            });
        default:
            return state;
    }
}

export function loadedUsers(state = {loaded: true}, action) {
    switch (action.type) {
        case GET_USERS:
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