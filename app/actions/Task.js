import Fetch, {getLoadingFunction, getLoadedFunction} from '../tools/Fetch';

export const CREATE_TASK = 'CREATE_TASK';
export const EDIT_TASK = 'EDIT_TASK';

export function createTask(task) {
    return Fetch({
        loading: getLoadingFunction(CREATE_TASK),
        loaded: getLoadedFunction(CREATE_TASK),
        url: 'api/task/',
        method: 'POST',
        body: task
    });
}

export function editTask(task) {
    return Fetch({
        loading: getLoadingFunction(EDIT_TASK),
        loaded: getLoadedFunction(EDIT_TASK),
        url: 'api/task/',
        method: 'PUT',
        body: task
    });
}