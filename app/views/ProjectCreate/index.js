import React, {Component} from 'react';
import {connect} from 'react-redux';

import {createProject} from '../../actions/Project';

import './ProjectCreate.less';

class ProjectCreate extends Component {
    static propTypes = {
        createProject: React.PropTypes.func.isRequired,
        createdProject: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            project: ""
        };
    }

    handleChange(e, field) {
        let stateChange = {};

        stateChange[field] = e.target.value;

        this.setState(stateChange);
    }

    handleSubmit() {
        this.props.createProject(this.state);
    }

    getButton() {
        let {createdProject} = this.props;

        if (createdProject.loaded && !createdProject.date) {
            return (
                <button className="confirm-button"
                        onClick={() => this.handleSubmit()}>+
                </button>
            );
        } else if (createdProject.loaded && createdProject.error) {
            return (
                <button className="confirm-button error"
                        onClick={() => this.handleSubmit()}>
                    {createdProject.data + ' - Click to retry'}

                </button>
            );
        } else if (createdProject.loaded) {
            return (
                <button className="confirm-button success"
                        onClick={() => this.handleSubmit()}>
                    Project created ! Click to see your project !
                </button>
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
            <div id="v-projectcreate">
                <div className="title">
                    Créer un projet
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
                                <label htmlFor="name">Name</label>
                            </td>
                            <td>
                                <input type="text"
                                       name="name"
                                       placeholder="Project name"
                                       onChange={(e) => this.handleChange(e, 'name')}
                                       value={this.state.name}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <label htmlFor="description">Description</label>
                            </td>
                            <td>
                                <textarea name="description"
                                          rows="4"
                                          placeholder="Project description"
                                          onChange={(e) => this.handleChange(e, 'description')}
                                          value={this.state.description}/>
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

function mapStateToProps(state) {
    return {
        createdProject: state.createdProject
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createProject: (project) => {
            dispatch(createProject(project));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCreate);