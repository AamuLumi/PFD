import React, {Component} from 'react';

import './Login.less';

export default class Application extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="v-login">
                <div className="title">
                    Connexion
                </div>
            </div>
        );
    }
}
