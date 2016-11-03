import Fetch, {getLoadingFunction, getLoadedFunction} from '../tools/Fetch';

export const LOGIN = 'LOGIN';

export function login(credentials) {
    return Fetch({
        loading: getLoadingFunction(LOGIN),
        loaded: getLoadedFunction(LOGIN),
        url: 'api/login/',
        method: 'POST',
        body: credentials
    });
}
