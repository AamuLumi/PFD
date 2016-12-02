import Fetch, {getLoadingFunction, getLoadedFunction} from '../tools/Fetch';

export const CREATE_SPRINT = 'CREATE_SPRINT';

export function createSprint(sprint) {
    return Fetch({
        loading: getLoadingFunction(CREATE_SPRINT),
        loaded: getLoadedFunction(CREATE_SPRINT),
        url: 'api/sprint/',
        method: 'POST',
        body: sprint
    });
}