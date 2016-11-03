import Fetch, {getLoadingFunction, getLoadedFunction} from '../tools/Fetch';

export const CREATE_USER = 'CREATE_USER';
export const GET_LOGGED_USER = 'GET_LOGGED_USER';

export function createUser(user) {
    return Fetch({
        loading: getLoadingFunction(CREATE_USER),
        loaded: getLoadedFunction(CREATE_USER),
        url: 'api/user/',
        method: 'POST',
        body: user
    });
}

export function getLoggedUser() {
    return Fetch({
        loading: getLoadingFunction(GET_LOGGED_USER),
        loaded: getLoadedFunction(GET_LOGGED_USER),
        url: 'api/user/me',
        method: 'GET',
    });
}