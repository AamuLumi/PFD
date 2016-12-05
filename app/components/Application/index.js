import React, {Component} from 'react';
import {connect} from 'react-redux';

import Toolbar from '../Toolbar';
import FloatingMessage from '../FloatingMessage';
import {loadFromCookie} from '../../tools/Fetch';
import {getLoggedUser} from '../../actions/User';

import './Application.less';

class Application extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    static propTypes = {
        getLoggedUser: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        loadFromCookie();
        this.props.getLoggedUser();
    }

    render() {
        return (
            <div id="c-app">
                <div id="scroll-container">
                    <div id="view-container">
                        {this.props.children}
                    </div>
                </div>
                <Toolbar />
                <FloatingMessage />
            </div>
        );
    }
}

function mapStateToProps(state){
    return {};
}

function mapDispatchToProps(dispatch){
    return {
        getLoggedUser: () => dispatch(getLoggedUser())
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Application);