import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import configureStore from './reducers/';

import Application from './components/Application/';

import Home from './views/Home';
import Login from './views/Login';
import ProjectCreate from './views/ProjectCreate';
import ProjectEdit from './views/ProjectEdit';
import ProjectList from './views/ProjectList';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);


const routes = <Route path="/">
    <Route component={Application}>
        <IndexRoute component={Home}/>
        <Route path="login" component={Login}/>
        <Route path="project">
            <IndexRoute component={ProjectList} />
            <Route path="create" component={ProjectCreate}/>
            <Route path="edit/:id" component={ProjectEdit}/>
        </Route>
    </Route>
</Route>;


const renderClient = () => {
    render(
        <AppContainer>
            <Provider store={store}>
                <Router history={history}>
                    {routes}
                </Router>
            </Provider>
        </AppContainer>,
        document.getElementById('app')
    );
};

renderClient();


if (module.hot) {
    module.hot.accept('./components/Application/', () => {
        require('./components/Application/');

        renderClient();
    });
}