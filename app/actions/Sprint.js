import Fetch, {getLoadingFunction, getLoadedFunction} from '../tools/Fetch';

export const CREATE_SPRINT = 'CREATE_SPRINT';
export const GET_SPRINT = 'GET_SPRINT';

export function createSprint(sprint) {
    return Fetch({
        loading: getLoadingFunction(CREATE_SPRINT),
        loaded: getLoadedFunction(CREATE_SPRINT),
        url: 'api/sprint/',
        method: 'POST',
        body: sprint
    });
}

export function getSprints(){
    return Fetch({
        loading: getLoadingFunction(GET_SPRINT),
        loaded: getLoadedFunction(GET_SPRINT),
        url: 'api/sprint/',
        method: 'GET'
    });
}