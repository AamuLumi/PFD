import React, {Component} from 'react';
import {Link} from 'react-router';

import './Toolbar.less';

export default class Toolbar extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="c-toolbar">
                <div className="toolbar-border"></div>
                <div id="toolbar-container">
                    <div className="title" style={{display: 'inline-block'}}>
                        <span>PFD</span>
                    </div>
                    <div className="first-links" style={{display: 'inline-block'}}>
                        <Link to="/project">
                            <span>Projets</span>
                        </Link>
                    </div>
                    <div className="second-links" style={{display: 'inline-block'}}>
                        <Link to="/login">
                            <span>
                                <i className="fa fa-user-circle"></i>
                            </span>
                        </Link>
                    </div>
                </div>
                <div className="toolbar-border"></div>
            </div>
        );
    }
}
