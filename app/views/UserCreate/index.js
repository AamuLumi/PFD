import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {createUser} from '../../actions/User';

import './UserCreate.less';

class Login extends Component {
    static propTypes = {
        createUser: React.PropTypes.func.isRequired,
        createdUser: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role: 'developer'
        };
    }

    handleChange(e, field) {
        let nextState = {};

        nextState[field] = e.target.value;

        this.setState(nextState);
    }

    handleSubmit() {
        this.props.createUser(this.state);
    }

    getButton() {
        let {createdUser} = this.props;

        if (createdUser.loaded && !createdUser.date) {
            return (
                <button className="confirm-button"
                        onClick={() => this.handleSubmit()}>+
                </button>
            );
        } else if (createdUser.loaded && createdUser.error) {
            return (
                <button className="confirm-button error"
                        onClick={() => this.handleSubmit()}>
                    {createdUser.errorMessage + ' - Click to retry'}

                </button>
            );
        } else if (createdUser.loaded) {
            return (
                <Link to="login">
                    <button className="confirm-button success"
                            onClick={() => this.handleSubmit()}>
                        User created - Go to login.
                    </button>
                </Link>
            );
        }

        return (
            <button className="confirm-button waiting">
                Waiting response !
            </button>
        );
    }

    render() {
        return (
            <div id="v-usercreate">
                <div className="title">
                    Create user
                </div>
                <div className="form-container">
                    <table>
                        <colgroup>
                            <col span="1" style={{width: '20%'}}></col>
                            <col span="1" style={{width: '80%'}}></col>
                        </colgroup>
                        <tbody>
                        <tr>
                            <td>
                                <label htmlFor="firstName">First name</label>
                            </td>
                            <td>
                                <input type="text"
                                       name="firstName"
                                       placeholder="Enter first name"
                                       onChange={(e) => this.handleChange(e, 'firstName')}
                                       value={this.state.firstName}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="lastName">Last name</label>
                            </td>
                            <td>
                                <input type="text"
                                       name="lastName"
                                       placeholder="Enter last name"
                                       onChange={(e) => this.handleChange(e, 'lastName')}
                                       value={this.state.lastName}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="email">E-Mail</label>
                            </td>
                            <td>
                                <input type="email"
                                       name="email"
                                       placeholder="Enter e-mail"
                                       onChange={(e) => this.handleChange(e, 'email')}
                                       value={this.state.email}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="password">Password</label>
                            </td>
                            <td>
                                <input type="password"
                                       name="password"
                                       placeholder="Enter password"
                                       onChange={(e) => this.handleChange(e, 'password')}
                                       value={this.state.password}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2">
                                {this.getButton()}
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        createdUser: state.createdUser
    };
}

function mapDispatchToProps(dispatch){
    return {
        createUser: (credentials) => {
            dispatch(createUser(credentials));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);