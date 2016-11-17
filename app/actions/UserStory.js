import Fetch, {getLoadingFunction, getLoadedFunction} from '../tools/Fetch';

export const GET_USER_STORIES = 'GET_USER_STORIES';

export function getUserStories(projectId) {
    return Fetch({
        loading: getLoadingFunction(GET_USER_STORIES),
        loaded: getLoadedFunction(GET_USER_STORIES),
        url: 'api/userStory/' + projectId,
        method: 'GET'
    });
}