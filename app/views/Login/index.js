import React, {Component} from 'react';
import {connect} from 'react-redux';

import {login} from '../../actions/Auth';
import {setAuthorizationToken} from '../../tools/Fetch';

import './Login.less';

class Login extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    static propTypes = {
        login: React.PropTypes.func.isRequired,
        loginResult: React.PropTypes.object.isRequired
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
            this.setState({
                error: newProps.loginResult.errorMessage
            }, () => {
                setTimeout(() => {
                    this.setState({
                        error: undefined
                    });
                }, 2000);
            });
        } else if (newProps.loginResult.loaded && !newProps.loginResult.error){
            setAuthorizationToken(newProps.loginResult.data.token);
            this.context.router.push('/project');
        }

        this.props = newProps;
    }

    handleChange(e, field) {
        let nextState = {};

        nextState[field] = e.target.value;

        this.setState(nextState);
    }

    getLoginResult(){
        let {error} = this.state;

        if (error){
            return (
                <div className="floating-message error">
                    {error}
                </div>
            );
        }
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
                        <input type="text"
                               placeholder="E-Mail"
                               onChange={(e) => this.handleChange(e, 'email')}/>
                    </div>
                    <div className="field">
                        <input type="password"
                               placeholder="Password"
                               onChange={(e) => this.handleChange(e, 'password')}/>
                    </div>
                    <div className="field">
                        <button className="login-button"
                            onClick={() => this.login()}>Connect</button>
                    </div>
                </div>
                {this.getLoginResult()}
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
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);