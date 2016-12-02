import {
    CREATE_SPRINT
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