import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {routerReducer} from 'react-router-redux';

import {
    createdProject,
    projectList,
    loadedProject,
    editedProject
} from './Project';

import {
    loginResult
} from './Auth';

export default function configureStore(preloadedState) {
    return createStore(
        combineReducers({
            createdProject,
            projectList,
            loadedProject,
            editedProject,
            loginResult,
            routing: routerReducer
        }),
        preloadedState,
        applyMiddleware(
            thunkMiddleware
        )
    );
}