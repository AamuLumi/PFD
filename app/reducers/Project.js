import {
    CREATE_PROJECT
} from '../actions/Project';

export function createdProject(state = {loaded: true}, action) {
    console.log(action);
    switch (action.type) {
        case CREATE_PROJECT:
            return Object.assign({}, state, {
                loaded: action.loaded,
                date: action.date,
                data: action.data,
                error: action.error
            });
        default:
            return state;
    }
}