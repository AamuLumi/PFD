import React, {Component} from 'react';

import Toolbar from '../Toolbar';

import './Application.less';

export default class Application extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div id="v-app">
                <Toolbar />
            </div>
        );
    }
}
