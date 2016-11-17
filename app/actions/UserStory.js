import Fetch, {getLoadingFunction, getLoadedFunction} from '../tools/Fetch';

export const CREATE_USER_STORY = 'CREATE_USER_STORY';
export const GET_USER_STORIES = 'GET_USER_STORIES';

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