import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {routerReducer} from 'react-router-redux';

import {
    createdProject,
    projectList,
    loadedProject,
    editedProject,
    subscribeResult
} from './Project';

import {
    loginResult
} from './Auth';

import {
    createdUser,
    loggedUser
} from './User';

import {
    floatingMessage
} from './LocalActions';

import {
    loadedUserStories,
    editedUserStory
} from './UserStory';

export default function configureStore(preloadedState) {
    return createStore(
        combineReducers({
            createdProject,
            projectList,
            loadedProject,
            editedProject,
            loginResult,
            createdUser,
            loggedUser,
            subscribeResult,
            floatingMessage,
            loadedUserStories,
            editedUserStory,
            routing: routerReducer
        }),
        preloadedState,
        applyMiddleware(
            thunkMiddleware
        )
    );
}