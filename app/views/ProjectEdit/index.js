import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getProject, editProject, subscribe} from '../../actions/Project';

import './ProjectEdit.less';

class ProjectEdit extends Component {
    static propTypes = {
        params: React.PropTypes.object.isRequired,
        loadedProject: React.PropTypes.object.isRequired,
        getProject: React.PropTypes.func.isRequired,
        editedProject: React.PropTypes.object.isRequired,
        editProject: React.PropTypes.func.isRequired,
        loggedUser: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            project: {
                name: "",
                description: ""
            },
            edit: false,
            successfulEdit: undefined,
            error: undefined
        };

        if (this.props.params.id) {
            this.props.getProject(this.props.params.id);
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.loadedProject.loaded && !newProps.loadedProject.error) {
            this.setState({
                project: newProps.loadedProject.data
            });
        }

        if (newProps.editedProject.date !== this.props.editedProject.date) {
            this.setState({
                successfulEdit: !newProps.editedProject.error
            }, () => {
                setTimeout(() => {
                    this.setState({
                        successfulEdit: undefined
                    });
                }, 2000);
            })
        }

        if (newProps.subscribeResult.date !== this.props.subscribeResult.date) {
            this.setState({
                error: newProps.subscribeResult.errorMessage
            }, () => {
                setTimeout(() => {
                    this.setState({
                        error: undefined
                    });
                }, 2000);
            });

            if (this.props.params.id) {
                this.props.getProject(this.props.params.id);
            }
        }

        this.props = newProps;
    }

    acceptEdit() {
        if (!this.state.project.name || this.state.project.name.length === 0) {
            this.setState({
                error: 'Name needed'
            }, () => {
                setTimeout(() => {
                    this.setState({
                        error: undefined
                    });
                }, 2000);
            })
        } else {
            this.setState({
                edit: false
            }, () => {
                this.props.editProject(this.state.project, this.props.params.id);
            });
        }
    }

    switchEdit() {
        this.setState({
            edit: !this.state.edit
        });
    }

    handleChange(e, field) {
        let nextState = {
            project: this.state.project
        };

        nextState.project[field] = e.target.value;

        this.setState(nextState);
    }

    getEditMessage() {
        let {successfulEdit, error} = this.state;

        if (successfulEdit === true) {
            return (
                <div className="floating-message success">
                    Project edited !
                </div>
            );
        } else if (successfulEdit === false) {
            return (
                <div className="floating-message error">
                    {this.props.editedProject.errorMessage}
                </div>
            );
        } else if (error) {
            return (
                <div className="floating-message error">
                    {error}
                </div>
            );
        }
    }

    getEditableView() {
        let {project} = this.state;

        return (
            <div>
                <div className="container-edit-button">
                    <i className="edit-button fa fa-close fa-2"
                       onClick={() => this.switchEdit()}></i>
                    <i className="edit-button fa fa-check fa-2"
                       onClick={() => this.acceptEdit()}></i>
                </div>
                <input type="text"
                       className="title"
                       value={project.name}
                       onChange={(e) => this.handleChange(e, 'name')}
                       placeholder="Name"
                       required/>
                <textarea type="text"
                          rows="5"
                          value={project.description}
                          onChange={(e) => this.handleChange(e, 'description')}
                          className="description"
                          placeholder="Description">
                </textarea>
            </div>
        );
    }

    getParticipateButton() {
        let {loggedUser} = this.props;
        let {project} = this.state;

        if (!project || !loggedUser.data) {
            return;
        }

        if (project.users) {
            for (let user of project.users) {
                if (user === loggedUser.data._id) {
                    return (
                        <div className="participate-button on-project">
                            On the project
                        </div>
                    );
                }
            }
        }

        return (
            <button className="participate-button"
                    onClick={() => this.props.subscribe(
                    this.props.loadedProject.data._id,
                    this.props.loggedUser.data._id
            )}>
                Participate
            </button>
        );
    }

    getClassicView() {
        let {project} = this.state;

        return (
            <div>
                <div className="container-edit-button" onClick={() => this.switchEdit()}>
                    <i className="edit-button fa fa-cog fa-2"></i>
                </div>
                <div className="title">
                    {project.name}
                </div>
                <div className="project-container">
                    <div className="description">
                        {project.description}
                    </div>
                    {this.getParticipateButton()}
                </div>
            </div>
        );
    }

    render() {
        let {edit} = this.state;

        return (
            <div id="v-projectedit">
                {edit && this.getEditableView()}
                {!edit && this.getClassicView()}
                {this.getEditMessage()}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loadedProject: state.loadedProject,
        editedProject: state.editedProject,
        loggedUser: state.loggedUser,
        subscribeResult: state.subscribeResult
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProject: (id) => {
            dispatch(getProject(id));
        },
        editProject: (project, id) => {
            dispatch(editProject(project, id));
        },
        subscribe: (projectId, userId) => {
            dispatch(subscribe(projectId, userId));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEdit);