import Fetch, {getLoadingFunction, getLoadedFunction} from '../tools/Fetch';

export const CREATE_USER_STORY = 'CREATE_USER_STORY';
export const GET_USER_STORIES = 'GET_USER_STORIES';
export const EDIT_USER_STORY = 'EDIT_USER_STORY';
export const DELETE_USER_STORY = 'DELETE_USER_STORY';

export function createUserStory(userStory) {
    return Fetch({
        loading: getLoadingFunction(CREATE_USER_STORY),
        loaded: getLoadedFunction(CREATE_USER_STORY),
        url: 'api/userStory/',
        method: 'POST',
        body: userStory
    });
}

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

export function deleteUserStory(id){
    return Fetch({
        loading: getLoadingFunction(DELETE_USER_STORY),
        loaded: getLoadedFunction(DELETE_USER_STORY),
        url: 'api/userStory/',
        method: 'DELETE',
        body: {
            id: id
        }
    });
}