import {
    LOGIN
} from '../actions/Auth';

export function loginResult(state = {loaded: true}, action) {
    switch (action.type) {
        case LOGIN:
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
