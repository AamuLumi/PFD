import 'babel-polyfill';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Application from './app';

export default class Root extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                <Route path="/">
                    <IndexRoute component={Application}/>
                </Route>
            </Router>
        );
    }
}

ReactDOM.render(
    <Root/>, document.getElementById('app'));
