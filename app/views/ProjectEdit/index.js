import React, {Component} from 'react';
import {connect} from 'react-redux';

import UserStoryCreation from '../../components/UserStoryCreation';
import {getProject, editProject, subscribe} from '../../actions/Project';
import {getUserStories} from '../../actions/UserStory';
import {showFloatingMessage, MESSAGE_CLASSES} from '../../actions/LocalActions';
import UserStoryList from '../../components/UserStoryList';
import Input, {TYPES} from '../../atoms/Input';

import './ProjectEdit.less';

class ProjectEdit extends Component {
    static propTypes = {
        params: React.PropTypes.object.isRequired,
        loadedProject: React.PropTypes.object.isRequired,
        getProject: React.PropTypes.func.isRequired,
        editedProject: React.PropTypes.object.isRequired,
        editProject: React.PropTypes.func.isRequired,
        loggedUser: React.PropTypes.object.isRequired,
        showFloatingMessage: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            project: {
                name: '',
                description: '',
                _id: ''
            },
            projectBeforeEdit: undefined,
            edit: false,
            userStoryCreation: false
        };

        if (this.props.params.id) {
            this.props.getProject(this.props.params.id);
        }
    }

    componentWillReceiveProps(newProps) {
        // If project is loaded, add it to state
        if (newProps.loadedProject.loaded && !newProps.loadedProject.error) {
            this.setState({
                project: newProps.loadedProject.data
            });
        } else if (newProps.loadedProject.error) {
            this.props.showFloatingMessage({
                message: newProps.loadedProject.errorMessage,
                messageClass: MESSAGE_CLASSES.ERROR
            });
        } else {
            this.setState({
                project: {}
            });
        }

        // If there's new edition of project, show the result of the edition
        if (newProps.editedProject.date !== this.props.editedProject.date) {
            this.props.showFloatingMessage({
                message: newProps.editedProject.errorMessage,
                messageClass: newProps.editedProject.error ?
                    MESSAGE_CLASSES.ERROR : MESSAGE_CLASSES.SUCCESS
            });
        }

        if (newProps.subscribeResult.date !== this.props.subscribeResult.date) {
            this.props.showFloatingMessage({
                message: newProps.subscribeResult.errorMessage,
                messageClass: newProps.subscribeResult.error ?
                    MESSAGE_CLASSES.ERROR : MESSAGE_CLASSES.SUCCESS
            });

            if (this.props.params.id) {
                this.props.getProject(this.props.params.id);
            }
        }

        this.props = newProps;
    }

    acceptEdit() {
        if (!this.state.project.name || this.state.project.name.length === 0) {
            this.props.showFloatingMessage({
                message: 'Name needed',
                messageClass: MESSAGE_CLASSES.ERROR
            });
        } else {
            this.setState({
                edit: false
            }, () => {
                this.props.editProject(this.state.project, this.props.params.id);
            });
        }
    }

    switchEdit() {
        if (this.state.edit){
            this.setState({
                edit: false,
                project: this.state.projectBeforeEdit
            });
        } else {
            this.setState({
                edit: true,
                projectBeforeEdit: Object.assign({}, this.state.project)
            });
        }
    }

    handleChange(e, field) {
        let nextState = {
            project: this.state.project
        };

        nextState.project[field] = e.target.value;

        this.setState(nextState);
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
                <Input type={TYPES.TEXT}
                       value={project.name}
                       onChange={(e) => this.handleChange(e, 'name')}
                       name="name"
                       placeholder="Name"
                       className="title"/>
                <div className="project-container">
                    <Input type={TYPES.TEXTAREA}
                           rows={5}
                           value={project.description}
                           onChange={(e) => this.handleChange(e, 'description')}
                           name="description"
                           className="description"
                           placeholder="Description"/>
                </div>
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
                        <button className="participate-button on-project">
                            On the project
                        </button>
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

    getAddUserStoryButton() {
        let {loggedUser} = this.props;

        if (!loggedUser.data) {
            return;
        }

        return (
            <button className="new-user-story-button"
                    onClick={() => this.setState({
                        userStoryCreation: true
                    })}>
                Add new User Story
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
                    <div>
                        {this.getParticipateButton()}
                        {this.getAddUserStoryButton()}
                    </div>
                    <div>
                        <UserStoryList projectID={this.props.params.id}/>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        let {edit, userStoryCreation, project} = this.state;

        return (
            <div id="v-projectedit">
                {edit && this.getEditableView()}
                {!edit && this.getClassicView()}
                {userStoryCreation && (
                    <UserStoryCreation
                        projectID={project._id}
                        dismiss={() => {
                            this.setState({userStoryCreation: false},
                                () => this.props.getUserStories(this.props.params.id));
                        }}/>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loadedProject: state.loadedProject,
        editedProject: state.editedProject,
        loggedUser: state.loggedUser,
        subscribeResult: state.subscribeResult
    };
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
        },
        showFloatingMessage: (params) => {
            dispatch(showFloatingMessage(params));
        },
        getUserStories: (id) =>
            dispatch(getUserStories(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEdit);