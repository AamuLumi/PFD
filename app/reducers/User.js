import {
    CREATE_USER,
    GET_LOGGED_USER
} from '../actions/User';

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
        default:
            return state;
    }
}