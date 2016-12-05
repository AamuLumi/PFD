import {
    CREATE_TASK
} from '../actions/Task';

export function createdTask(state = {loaded: true}, action) {
    switch (action.type) {
        case CREATE_TASK:
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