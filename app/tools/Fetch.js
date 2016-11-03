import fetch from 'isomorphic-fetch';

import {HOST} from '../config/server';

export default function fetchData(params) {
    console.log(params);
    return (dispatch) => {
        dispatch(params.loading());

        return fetch(HOST + params.url, {
            method: params.method,
            headers: {
                'Content-Type': 'application/json'
            },
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