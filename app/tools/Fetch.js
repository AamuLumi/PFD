import fetch from 'isomorphic-fetch';

import {getCookie, setCookie, removeCookie} from './Cookie';
import {getLoggedUser} from '../actions/User';
import {HOST} from '../config/server';

let authorizationToken = undefined;

export default function fetchData(params) {
    return (dispatch) => {
        dispatch(params.loading());

        let headers = {
            'Content-Type': 'application/json'
        };

        if (authorizationToken) {
            headers.Authorization = 'JWT ' + authorizationToken;
        }

        return fetch(HOST + params.url, {
            method: params.method,
            headers,
            body: JSON.stringify(params.body)
        })
            .then((response) => {
                if (response.status === 204) {
                    return {data: {}, success: -43};
                }

                return response.json();
            })
            .then((data) => {
                return dispatch(params.loaded(data));
            });
    };
}

export function getLoadingFunction(action) {
    return () => {
        return {
            type: action,
            loaded: false
        };
    };
}

export function getLoadedFunction(action) {
    return (res, err) => {
        let dispatchedAction = {
            type: action,
            loaded: true,
            date: Date.now(),
            data: res.data
        };

        if (err) {
            dispatchedAction.data = null;
        }

        if (res.success < 1) {
            dispatchedAction.error = true;
            dispatchedAction.errorMessage = res.message;
        }

        return dispatchedAction;
    };
}

export function setAuthorizationToken(token) {
    authorizationToken = token;
    setCookie('PFDToken', token);
}

export function loadFromCookie() {
    let token = getCookie('PFDToken');

    if (token) {
        setAuthorizationToken(token);
    }
}

export function deleteToken() {
    removeCookie('PFDToken');
    authorizationToken = undefined;
}