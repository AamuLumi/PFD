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

import {
    createdUser
} from './User';

export default function configureStore(preloadedState) {
    return createStore(
        combineReducers({
            createdProject,
            projectList,
            loadedProject,
            editedProject,
            loginResult,
            createdUser,
            routing: routerReducer
        }),
        preloadedState,
        applyMiddleware(
            thunkMiddleware
        )
    );
}