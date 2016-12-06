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
    loggedUser,
    loadedUsers
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

import {
    createdSprint,
    loadedSprints,
    currentSprint,
    addedUserStoryToSprint
} from './Sprint';

import {
    createdTask,
    editedTask,
    deletedTask,
    loadedTasks,
    taskStateSet
} from './Task';

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
            loadedUsers,
            subscribeResult,
            floatingMessage,
            createdUserStory,
            loadedUserStories,
            editedUserStory,
            deletedUserStory,
            createdSprint,
            loadedSprints,
            createdTask,
            editedTask,
            deletedTask,
            addedUserStoryToSprint,
            currentSprint,
            loadedTasks,
            taskStateSet,
            routing: routerReducer
        }),
        preloadedState,
        applyMiddleware(
            thunkMiddleware
        )
    );
}