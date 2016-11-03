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