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
    createdUserStory,
    loadedUserStories,
    editedUserStory,
    deletedUserStory
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
            createdUserStory,
            loadedUserStories,
            editedUserStory,
            deletedUserStory,
            routing: routerReducer
        }),
        preloadedState,
        applyMiddleware(
            thunkMiddleware
        )
    );
}