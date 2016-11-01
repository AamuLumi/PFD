import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import Application from './components/Application/';

const routes = <Route path="/">
    <IndexRoute component={Application}/>
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