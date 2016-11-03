import fetch from 'isomorphic-fetch';

import {HOST} from '../config/server';

let authorizationToken = undefined;

export default function fetchData(params) {
    return (dispatch) => {
        dispatch(params.loading());

        let headers = {
            'Content-Type': 'application/json'
        };

        if (authorizationToken){
            headers.Authorization = 'JWT ' + authorizationToken;
        }

        return fetch(HOST + params.url, {
            method: params.method,
            headers,
            body: JSON.stringify(params.body)
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                return dispatch(params.loaded(data));
            });
    };
}

export function getLoadingFunction(action){
    return () => {
        return {
            type: action,
            loaded: false
        };
    };
}

export function getLoadedFunction(action){
    return (res) => {
        let dispatchedAction = {
            type: action,
            loaded: true,
            date: Date.now(),
            data: res.data
        };

        if (res.success < 1){
            dispatchedAction.error = true;
            dispatchedAction.errorMessage = res.message;
        }

        return dispatchedAction;
    };
}

export function setAuthorizationToken(token){
    authorizationToken = token;
}