import React, {Component} from 'react';

import './App.less';

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
                React ready
            </div>
        );
    }
}
