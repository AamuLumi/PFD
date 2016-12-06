import Fetch, {getLoadingFunction, getLoadedFunction} from '../tools/Fetch';

export const CREATE_SPRINT = 'CREATE_SPRINT';
export const GET_SPRINT = 'GET_SPRINT';
export const ADD_USER_STORY_TO_SPRINT = 'ADD_USER_STORY_TO_SPRINT';
export const GET_CURRENT_SPRINT = 'GET_CURRENT_SPRINT';

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

export function addUserStoryToSprint(params){
    return Fetch({
        loading: getLoadingFunction(ADD_USER_STORY_TO_SPRINT),
        loaded: getLoadedFunction(ADD_USER_STORY_TO_SPRINT),
        url: 'api/sprint/addUS',
        method: 'PUT',
        body: params
    });
}

export function getCurrentSprint(){
    return Fetch({
        loading: getLoadingFunction(GET_CURRENT_SPRINT),
        loaded: getLoadedFunction(GET_CURRENT_SPRINT),
        url: 'api/sprint/current',
        method: 'GET'
    });
}