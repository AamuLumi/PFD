import React, {Component} from 'react';
import {connect} from 'react-redux';

import {createTask} from '../../actions/Task';
import {showFloatingMessage, MESSAGE_CLASSES} from '../../actions/LocalActions';
import {getUsers} from '../../actions/User';
import Form from '../Form';

import './TaskCreation.less';

class UserStoryCreation extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    static propTypes = {
        dismiss: React.PropTypes.func.isRequired,
        createTask: React.PropTypes.func.isRequired,
        createdTask: React.PropTypes.object.isRequired,
        showFloatingMessage: React.PropTypes.func.isRequired,
        userStoryID: React.PropTypes.string.isRequired,
        getUsers: React.PropTypes.func.isRequired,
        loadedUsers: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.props.getUsers();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.createdTask.loaded &&
            newProps.createdTask.date !== this.props.createdTask.date) {
            if (newProps.createdTask.error) {
                this.props.showFloatingMessage(
                    newProps.createdTask.errorMessage,
                    MESSAGE_CLASSES.ERROR
                );
            } else {
                this.props.dismiss();
                this.props.showFloatingMessage(
                    'Task created',
                    MESSAGE_CLASSES.SUCCESS
                );
            }
        }

        this.props = newProps;
    }

    checkMousePosition(e) {
        if (e.target.id === 'c-task-creation') {
            this.props.dismiss();
        }
    }

    createTask(data) {
        data.userStoryId = this.props.userStoryID;
        data.userId = data.user;

        this.props.createTask(data);
    }

    render() {
        return (
            <div id="c-task-creation" onClick={(e) => this.checkMousePosition(e)}>
                <div className="task-creation-container">
                    <div className="form">
                        <h1>Task creation</h1>
                        <Form
                            onAccept={(e) => this.createTask(e)}
                            inputs={[
                                {name: 'name', type: 'text', placeholder: 'Task name'},
                                {
                                    name: 'description',
                                    type: 'text',
                                    placeholder: 'Task description'
                                },
                                {
                                    name: 'user',
                                    type: 'select',
                                    options: this.props.loadedUsers.data &&
                                    this.props.loadedUsers.data.map(
                                        (user) => {
                                            return {
                                                name: user.firstName + ' ' + user.lastName,
                                                value: user._id
                                            };
                                        })
                                }
                            ]}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        createdTask: state.createdTask,
        loadedUsers: state.loadedUsers
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createTask: (userStory) => {
            dispatch(createTask(userStory));
        },
        showFloatingMessage: (message, messageClass) => {
            dispatch(showFloatingMessage({
                message, messageClass
            }));
        },
        getUsers: () => {
            dispatch(getUsers());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserStoryCreation);