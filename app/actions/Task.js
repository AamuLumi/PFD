import Fetch, {getLoadingFunction, getLoadedFunction} from '../tools/Fetch';

export const CREATE_TASK = 'CREATE_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const GET_TASKS_FOR_USER = 'GET_TASKS_FOR_USER';
export const SET_TASK_STATE = 'SET_TASK_STATE';

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

export function deleteTask(task) {
    return Fetch({
        loading: getLoadingFunction(DELETE_TASK),
        loaded: getLoadedFunction(DELETE_TASK),
        url: 'api/task/',
        method: 'DELETE',
        body: task
    });
}

export function getTasksForUser(userId){
    return Fetch({
        loading: getLoadingFunction(GET_TASKS_FOR_USER),
        loaded: getLoadedFunction(GET_TASKS_FOR_USER),
        url: 'api/task/forUser/' + userId,
        method: 'GET'
    });
}

export function setTaskState(params){
    return Fetch({
        loading: getLoadingFunction(SET_TASK_STATE),
        loaded: getLoadedFunction(SET_TASK_STATE),
        url: 'api/task/setState',
        method: 'PUT',
        body: params
    });
}