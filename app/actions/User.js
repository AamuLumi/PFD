import Fetch, {getLoadingFunction, getLoadedFunction} from '../tools/Fetch';

export const CREATE_USER = 'CREATE_USER';

export function createUser(user) {
    return Fetch({
        loading: getLoadingFunction(CREATE_USER),
        loaded: getLoadedFunction(CREATE_USER),
        url: 'api/user/',
        method: 'POST',
        body: user
    });
}