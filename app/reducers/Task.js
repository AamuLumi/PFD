import {
    CREATE_TASK,
    EDIT_TASK,
    DELETE_TASK,
    GET_TASKS_FOR_USER,
    SET_TASK_STATE
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

export function editedTask(state = {loaded: true}, action) {
    switch (action.type) {
        case EDIT_TASK:
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

export function deletedTask(state = {loaded: true}, action) {
    switch (action.type) {
        case DELETE_TASK:
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

export function loadedTasks(state = {loaded: true}, action) {
    switch (action.type) {
        case GET_TASKS_FOR_USER:
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

export function taskStateSet(state = {loaded: true}, action) {
    switch (action.type) {
        case SET_TASK_STATE:
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