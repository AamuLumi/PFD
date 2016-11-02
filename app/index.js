import 'babel-polyfill';
import React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Application from './components/Application/';

import Home from './views/Home';
import Login from './views/Login';

const routes = <Route path="/">
    <Route component={Application}>
        <IndexRoute component={Home}/>
        <Route path="login" component={Login} />
    </Route>
</Route>;


const renderClient = () => {
    render(
        <AppContainer>
            <Router history={browserHistory}>
                {routes}
            </Router>
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