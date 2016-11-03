import Fetch, {getLoadingFunction, setAuthorizationToken} from '../tools/Fetch';
import {getLoggedUser} from './User';

export const LOGIN = 'LOGIN';

export function login(credentials) {
    return Fetch({
        loading: getLoadingFunction(LOGIN),
        loaded: (res) => {
            let dispatchedAction = {
                type: LOGIN,
                loaded: true,
                date: Date.now(),
                data: res.data
            };

            if (res.success < 1){
                dispatchedAction.error = true;
                dispatchedAction.errorMessage = res.message;
            } else {
                setAuthorizationToken(res.data.token);
            }

            return dispatchedAction;
        },
        url: 'api/login/',
        method: 'POST',
        body: credentials
    });
}
