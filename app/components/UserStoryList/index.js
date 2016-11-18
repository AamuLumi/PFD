import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getUserStories, editUserStory, deleteUserStory} from '../../actions/UserStory';
import {showFloatingMessage, MESSAGE_CLASSES} from '../../actions/LocalActions';
import Input, {TYPES} from '../../atoms/Input';

import './UserStoryList.less';

class UserStoryList extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    static propTypes = {
        projectID: React.PropTypes.string.isRequired,
        loadedUserStories: React.PropTypes.object.isRequired,
        getUserStories: React.PropTypes.func.isRequired,
        showFloatingMessage: React.PropTypes.func.isRequired,
        editUserStory: React.PropTypes.func.isRequired,
        editedUserStory: React.PropTypes.object.isRequired,
        deleteUserStory: React.PropTypes.func.isRequired,
        deletedUserStory: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            userStories: [],
            editCard: -1,
            name: '',
            description: '',
            priority: 0,
            effort: -1
        };

        if (this.props.projectID) {
            this.props.getUserStories(this.props.projectID);
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.loadedUserStories.loaded && !newProps.loadedUserStories.error) {
            this.setState({
                userStories: newProps.loadedUserStories.data
            });
        } else if (newProps.loadedUserStories.error) {
            this.props.showFloatingMessage({
                message: newProps.loadedUserStories.errorMessage,
                messageClass: MESSAGE_CLASSES.ERROR
            });
        } else {
            this.setState({
                userStories: []
            });
        }

        if (newProps.editedUserStory.loaded && newProps.editedUserStory.error) {
            this.props.showFloatingMessage({
                message: newProps.editedUserStory.errorMessage,
                messageClass: MESSAGE_CLASSES.ERROR
            });
        }

        if (newProps.deletedUserStory.loaded && newProps.deletedUserStory.error) {
            this.props.showFloatingMessage({
                message: newProps.deletedUserStory.errorMessage,
                messageClass: MESSAGE_CLASSES.ERROR
            });
        }

        this.props = newProps;
    }

    static getShortDescription(description) {
        return description.length > 140 ?
        description.substring(0, 140) + '...' :
            description;
    }

    static getEffortStringFor(effort) {
        switch (effort) {
            case 1:
                return 'Very easy (1)';
            case 2:
                return 'Easy (2)';
            case 3:
                return 'Normal (3)';
            case 5:
                return 'Hard (5)';
            case 8:
                return 'Very hard (8)';
            default :
                return 'Not found (?)';
        }
    }

    static getPriorityStringFor(priority) {
        switch (priority) {
            case 0:
                return 'Option';
            case 1:
                return 'Desired';
            case 2:
                return 'Required';
            default :
                return 'Not found';
        }
    }

    handleChange(e, field) {
        let nextState = {};

        nextState[field] = e.target.value;

        this.setState(nextState);
    }

    switchEdit(e, number) {
        this.setState({
            editCard: number,
            name: e.name,
            description: e.description,
            effort: e.effort,
            priority: e.priority
        });
    }

    acceptEdit(number) {
        if (!this.state.name || this.state.name.length === 0) {
            this.props.showFloatingMessage({
                message: 'Name needed',
                messageClass: MESSAGE_CLASSES.ERROR
            });
        } else {
            let userStory = this.state.userStories[number];

            userStory.name = this.state.name;
            userStory.description = this.state.description;
            userStory.effort = parseInt(this.state.effort);
            userStory.priority = parseInt(this.state.priority);

            this.setState({
                editCard: -1
            }, () => this.props.editUserStory(userStory));
        }
    }

    remove(number) {
        let userStory = this.state.userStories[number];

        let newUserStories = this.state.userStories.splice(number, 1);

        this.setState({
            userStories: newUserStories
        }, () => this.props.deleteUserStory(userStory));
    }

    getEditViewForUserStory(e, i) {
        return (
            <div className="user-story">
                <div className="container-edit-button">
                    <i className="edit-button fa fa-close fa-2"
                       onClick={() => this.switchEdit({}, -1)}></i>
                    <i className="edit-button fa fa-check fa-2"
                       onClick={() => this.acceptEdit(i)}></i>
                </div>
                <div className="user-story-title">
                    <Input
                        className="user-story-title input-name"
                        type={TYPES.TEXT}
                        value={this.state.name}
                        onChange={(e) => this.handleChange(e, 'name')}
                        name="name"
                        placeholder="Name"
                    />
                </div>
                <div className="user-story-description">
                    <div className="little-text" style={{width: '100%'}}>
                        <Input
                            type={TYPES.TEXTAREA}
                            className="input-description"
                            rows={4}
                            name="description"
                            value={this.state.description}
                            onChange={(e) => this.handleChange(e, 'description')}
                            placeholder="Description"/>
                    </div>
                    <div>
                        <span>US Number : {e.number} - </span>
                        <span>Effort : </span>
                        <Input
                            type={TYPES.SELECT}
                            name="effort"
                            value={this.state.effort}
                            onChange={(e) => this.handleChange(e, 'effort')}
                            options={[
                                {name: 'Very Easy (1)', value: '1'},
                                {name: 'Easy (2)', value: '2'},
                                {name: 'Normal (3)', value: '3'},
                                {name: 'Hard (5)', value: '5'},
                                {name: 'Very Hard (8)', value: '8'}
                            ]} />
                        <span> - Priority : </span>
                        <Input
                            type={TYPES.SELECT}
                            name="priority"
                            value={this.state.priority}
                            onChange={(e) => this.handleChange(e, 'priority')}
                            options={[
                                {name: 'Option', value: '1'},
                                {name: 'Desired', value: '2'},
                                {name: 'Required', value: '3'}
                            ]} />
                    </div>
                </div>
            </div>
        );
    }

    getClassicViewForUserStory(e, i, editButtonVisible) {
        let containerEditButton = undefined;

        if (editButtonVisible) {
            containerEditButton = (
                <div className="container-edit-button">
                    <i className="edit-button fa fa-close fa-2"
                       onClick={() => this.remove(i)}></i>
                    <i className="edit-button fa fa-cog fa-2"
                       onClick={() => this.switchEdit(e, i)}></i>
                </div>
            );
        }

        return (
            <div className="user-story">
                {containerEditButton}
                <div className="user-story-title">
                    {e.name}
                </div>
                <div className="user-story-description">
                    <div className="little-text">
                        {UserStoryList.getShortDescription(e.description)}
                    </div>
                    <div>
                        US Number : {e.number} -
                        Effort : {UserStoryList.getEffortStringFor(e.effort)} -
                        Priority : {UserStoryList.getPriorityStringFor(e.priority)}
                    </div>
                </div>
            </div>
        );
    }

    getViewForUserStory(e, i) {
        const {editCard} = this.state;

        let userStory = undefined;

        if (editCard === -1) {
            userStory = this.getClassicViewForUserStory(e, i, true);
        } else if (editCard === i) {
            userStory = this.getEditViewForUserStory(e, i);
        } else {
            userStory = this.getClassicViewForUserStory(e, i, false);
        }

        return (
            <div className="user-story-container" key={i}>
                {userStory}
            </div>
        );
    }

    render() {
        const {userStories} = this.state;

        return (
            <div id="c-user-story-list">
                {userStories.sort((e1, e2) => e1.priority > e2.priority ? -1 : 0)
                    .map((e, i) => this.getViewForUserStory(e, i))}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loadedUserStories: state.loadedUserStories,
        editedUserStory: state.editedUserStory,
        deletedUserStory: state.deletedUserStory
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUserStories: (id) =>
            dispatch(getUserStories(id)),
        showFloatingMessage: (params) =>
            dispatch(showFloatingMessage(params)),
        editUserStory: (params) =>
            dispatch(editUserStory(params)),
        deleteUserStory: (params) =>
            dispatch(deleteUserStory(params))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserStoryList);
