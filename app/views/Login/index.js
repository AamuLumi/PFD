import React, {Component} from 'react';
import {connect} from 'react-redux';

import {login} from '../../actions/Auth';
import {getLoggedUser} from '../../actions/User';
import {showFloatingMessage, MESSAGE_CLASSES} from '../../actions/LocalActions';
import Input, {TYPES} from '../../atoms/Input';
import './Login.less';

class Login extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    static propTypes = {
        login: React.PropTypes.func.isRequired,
        loginResult: React.PropTypes.object.isRequired,
        getLoggedUser: React.PropTypes.func.isRequired,
        showFloatingMessage: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        };
    }

    componentWillReceiveProps(newProps){
        if (newProps.loginResult.loaded && newProps.loginResult.error){
            this.props.showFloatingMessage({
                message: newProps.loginResult.errorMessage,
                messageClass: MESSAGE_CLASSES.ERROR
            });
        } else if (newProps.loginResult.loaded && !newProps.loginResult.error){
            this.props.getLoggedUser();
            this.context.router.push('/project');
        }

        this.props = newProps;
    }

    handleChange(e, field) {
        let nextState = {};

        nextState[field] = e.target.value;

        this.setState(nextState);
    }

    login() {
        this.props.login({
            email: this.state.email,
            password: this.state.password
        });
    }

    render() {
        return (
            <div id="v-login">
                <div className="title">
                    Connexion
                </div>
                <div className="login-form">
                    <div className="field">
                        <Input type={TYPES.TEXT}
                               className="input-auth"
                               name="email"
                               placeholder="E-Mail"
                               onChange={(e) => this.handleChange(e, 'email')}/>
                    </div>
                    <div className="field">
                        <Input type={TYPES.PASSWORD}
                               className="input-auth"
                               name="password"
                               placeholder="Password"
                               onChange={(e) => this.handleChange(e, 'password')}/>
                    </div>
                    <div className="field">
                        <button className="login-button"
                            onClick={() => this.login()}>Connect</button>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        loginResult: state.loginResult
    };
}

function mapDispatchToProps(dispatch){
    return {
        login: (credentials) => {
            dispatch(login(credentials));
        },
        getLoggedUser: () => {
            dispatch(getLoggedUser());
        },
        showFloatingMessage: (params) => {
            dispatch(showFloatingMessage(params));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);