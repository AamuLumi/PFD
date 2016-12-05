import React, {Component} from 'react';
import {connect} from 'react-redux';
import ClassNames from 'classnames';

import {getUsers} from '../../actions/User';
import Input, {TYPES} from '../../atoms/Input';
import {showFloatingMessage, MESSAGE_CLASSES} from '../../actions/LocalActions';
import {editTask, deleteTask} from '../../actions/Task';

import './TaskList.less';

class UserStoryList extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    static propTypes = {
        tasks: React.PropTypes.array.isRequired,
        userStoryID: React.PropTypes.string.isRequired,
        getUsers: React.PropTypes.func.isRequired,
        loadedUsers: React.PropTypes.object.isRequired,
        editedTask: React.PropTypes.object.isRequired,
        editTask: React.PropTypes.func.isRequired,
        deletedTask: React.PropTypes.object.isRequired,
        deleteTask: React.PropTypes.func.isRequired,
        refreshUserStories: React.PropTypes.func
    };

    constructor(props) {
        super(props);

        this.state = {
            hoveredTask: -1,
            editTask: -1
        };

        this.props.getUsers();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.editedTask.loaded && newProps.editedTask.error) {
            this.props.showFloatingMessage({
                message: newProps.editedTask.errorMessage,
                messageClass: MESSAGE_CLASSES.ERROR
            });
        }

        if (newProps.deletedTask.loaded && newProps.deletedTask.error) {
            this.props.showFloatingMessage({
                message: newProps.deletedTask.errorMessage,
                messageClass: MESSAGE_CLASSES.ERROR
            });
        } else if (newProps.deletedTask.loaded &&
            this.props.deletedTask.date !== newProps.deletedTask.date &&
            !newProps.deletedTask.error && this.props.refreshUserStories) {
            this.props.refreshUserStories();
        }

        this.props = newProps;
    }

    handleChange(e, field) {
        let nextState = {};

        nextState[field] = e.target.value;

        this.setState(nextState);
    }

    acceptEdit(number) {
        if (!this.state.name || this.state.name.length === 0) {
            this.props.showFloatingMessage({
                message: 'Name needed',
                messageClass: MESSAGE_CLASSES.ERROR
            });
        } else {
            let task = this.state.tasks[number];

            task.name = this.state.name;
            task.description = this.state.description;
            task.userId = this.state.user;

            this.setState({
                editTask: -1
            }, () => this.props.editTask(task));
        }
    }

    switchEdit(e, number) {
        this.setState({
            editTask: number,
            name: e.name,
            description: e.description,
            user: e.user,
            hoveredTask: -1
        });
    }

    acceptEdit(number) {
        if (!this.state.name || this.state.name.length === 0) {
            this.props.showFloatingMessage({
                message: 'Name needed',
                messageClass: MESSAGE_CLASSES.ERROR
            });
        } else {
            let task = this.props.tasks[number];

            task.name = this.state.name;
            task.description = this.state.description;
            task.user = this.state.user;

            this.setState({
                editTask: -1
            }, () => this.props.editTask(task));
        }
    }

    deleteTask(number){
        this.props.deleteTask({
            _id: this.props.tasks[number]._id,
            userStoryId: this.props.userStoryID
        });
    }

    getViewForTask(e, i) {
        let classes = {'task-container': true};
        let buttons = undefined;

        if (e.state === 2) {
            classes.done = true;
        } else if (e.state === 1) {
            classes.doing = true;
        } else {
            classes.waiting = true;
        }

        classes = ClassNames(classes);

        if (i === this.state.hoveredTask) {
            buttons = (
                <span className="task-buttons">
                    <i className="fa fa-times"
                        onClick={() => this.deleteTask(i)}></i>
                    <i className="fa fa-cog"
                       onClick={() => this.switchEdit(e, i)}></i>
                </span>
            );
        }

        return (
            <div className={classes}
                 key={i}
                 onMouseEnter={() => this.setState({hoveredTask: i})}
                 onMouseLeave={() => this.setState({hoveredTask: -1})}>
                <span>
                    {e.name}
                </span>
                {buttons}
            </div>
        );
    }

    getEditViewForTask(i) {
        return (
            <div className="task-edit-container">
                <div className="task-container-edit-button">
                    <i className="edit-button fa fa-close fa-2"
                       onClick={() => this.switchEdit({}, -1)}></i>
                    <i className="edit-button fa fa-check fa-2"
                       onClick={() => this.acceptEdit(i)}></i>
                </div>
                <div>
                    <Input
                        className="task-input-name input-name"
                        type={TYPES.TEXT}
                        value={this.state.name}
                        onChange={(e) => this.handleChange(e, 'name')}
                        name="name"
                        placeholder="Name"
                    />
                    <Input
                        type={TYPES.TEXTAREA}
                        className="task-input-description"
                        rows={4}
                        name="description"
                        value={this.state.description}
                        onChange={(e) => this.handleChange(e, 'description')}
                        placeholder="Description"/>
                    <Input
                        type={TYPES.SELECT}
                        name="user"
                        value={this.state.user}
                        onChange={(e) => this.handleChange(e, 'user')}
                        options={this.props.loadedUsers.data &&
                        this.props.loadedUsers.data.map(
                            (e) => {
                                return {
                                    name: e.firstName + ' ' + e.lastName,
                                    value: e._id
                                };
                            })}
                    />
                </div>
            </div>
        );
    }

    render() {
        const {tasks} = this.props;
        const {editTask} = this.state;

        return (
            <div className="c-task-list">
                {editTask !== -1 && this.getEditViewForTask(editTask)}
                {editTask === -1 && tasks.map((e, i) => this.getViewForTask(e, i))}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loadedUsers: state.loadedUsers,
        editedTask: state.editedTask,
        deletedTask: state.deletedTask
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUsers: () => dispatch(getUsers()),
        showFloatingMessage: (params) => dispatch(showFloatingMessage(params)),
        editTask: (task) => dispatch(editTask(task)),
        deleteTask: (task) => dispatch(deleteTask(task))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserStoryList);
