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
        loggedUser: React.PropTypes.object.isRequired,
        logout: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            logged: false
        };
    }

    componentWillReceiveProps(newProps) {
        let {loggedUser} = newProps;

        if (loggedUser.loaded && loggedUser.data &&
            loggedUser.data.email && !loggedUser.error) {
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
                        {logged && <Link to="/kanban">
                            <span>Kanban</span>
                        </Link>}
                        <Link to="/sprint">
                            <span style={{paddingLeft: '16px'}}>Sprints</span>
                        </Link>
                        <Link to="/project">
                            <span style={{paddingLeft: '16px'}}>Projets</span>
                        </Link>
                        <Link to="/project/create">
                            <span style={{paddingLeft: '16px'}}>+</span>
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
        loggedUser: state.loggedUser
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logout: () =>
            dispatch(logout())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);