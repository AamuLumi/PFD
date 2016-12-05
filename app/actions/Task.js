import Fetch, {getLoadingFunction, getLoadedFunction} from '../tools/Fetch';

export const CREATE_TASK = 'CREATE_TASK';

export function createTask(task) {
    return Fetch({
        loading: getLoadingFunction(CREATE_TASK),
        loaded: getLoadedFunction(CREATE_TASK),
        url: 'api/task/',
        method: 'POST',
        body: task
    });
}