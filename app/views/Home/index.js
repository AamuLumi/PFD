import React, {Component} from 'react';

import './Home.less';

export default class Application extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="v-home">
                <div className="title">
                    Bienvenue sur PFD
                </div>
            </div>
        );
    }
}
