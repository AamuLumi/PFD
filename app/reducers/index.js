import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux';

import {
    createdProject
} from './Project';

export default function configureStore(preloadedState) {
    return createStore(
        combineReducers({
            createdProject,
            routing: routerReducer
        }),
        preloadedState,
        applyMiddleware(
            thunkMiddleware
        )
    );
}