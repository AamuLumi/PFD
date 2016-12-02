import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {logout} from '../../actions/Auth';
import './Toolbar.less';

class Toolbar extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    static propTypes = {
        loginResult: React.PropTypes.object.isRequired,
        logout: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            logged: false
        };
    }

    componentWillReceiveProps(newProps) {
        let {loginResult} = newProps;

        if (loginResult.loaded && loginResult.data && !loginResult.error) {
            this.setState({
                logged: true
            });
        } else {
            this.setState({
                logged: false
            });
        }

        this.props = newProps;
    }

    render() {
        let {logged} = this.state;

        let connectIcon = (
            <Link to="/login">
                <span>
                    <i className="fa fa-user-circle"></i>
                </span>
            </Link>
        );

        if (logged) {
            connectIcon = (
                <Link to="/" onClick={() => this.props.logout()}>
                    <i className="fa fa-sign-out"></i>
                </Link>
            );
        }

        return (
            <div id="c-toolbar">
                <div className="toolbar-border"></div>
                <div id="toolbar-container">
                    <div className="title" style={{display: 'inline-block'}}>
                        <Link to="/">
                            <span>PFD</span>
                        </Link>
                    </div>
                    <div className="first-links" style={{display: 'inline-block'}}>
                        <Link to="/sprint">
                            <span>Sprints</span>
                        </Link>
                        <Link to="/project">
                            <span>Projets</span>
                        </Link>
                        <Link to="/project/create">
                            <span style={{paddingLeft: '8px'}}>+</span>
                        </Link>
                    </div>
                    <div className="second-links" style={{display: 'inline-block'}}>
                        {connectIcon}
                    </div>
                </div>
                <div className="toolbar-border"></div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loginResult: state.loginResult
    };
}

function mapDispatchToProps(dispatch){
    return {
        logout: () =>
            dispatch(logout())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);