import Fetch, {getLoadingFunction, getLoadedFunction} from '../tools/Fetch';

export const CREATE_USER_STORY = 'CREATE_USER_STORY';

export function createUserStory(userStory) {
    return Fetch({
        loading: getLoadingFunction(CREATE_USER_STORY),
        loaded: getLoadedFunction(CREATE_USER_STORY),
        url: 'api/userStory/',
        method: 'POST',
        body: userStory
    });
}