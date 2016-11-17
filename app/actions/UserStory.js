import Fetch, {getLoadingFunction, getLoadedFunction} from '../tools/Fetch';

export const GET_USER_STORIES = 'GET_USER_STORIES';
export const EDIT_USER_STORY = 'EDIT_USER_STORY';

export function getUserStories(projectId) {
    return Fetch({
        loading: getLoadingFunction(GET_USER_STORIES),
        loaded: getLoadedFunction(GET_USER_STORIES),
        url: 'api/userStory/' + projectId,
        method: 'GET'
    });
}

export function editUserStory(params){
    return Fetch({
        loading: getLoadingFunction(EDIT_USER_STORY),
        loaded: getLoadedFunction(EDIT_USER_STORY),
        url: 'api/userStory/',
        method: 'PUT',
        body: params
    });
}