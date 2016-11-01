import React, {Component} from 'react';

import './Toolbar.less';

export default class Toolbar extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div id="c-toolbar">
                <span>PFD</span>
            </div>
        );
    }
}
