import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getUserStories} from '../../actions/UserStory';
import {showFloatingMessage, MESSAGE_CLASSES} from '../../actions/LocalActions';

import './UserStoryList.less';

class UserStoryList extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    static propTypes = {
        projectID: React.PropTypes.string.isRequired,
        loadedUserStories: React.PropTypes.object.isRequired,
        getUserStories: React.PropTypes.func.isRequired,
        showFloatingMessage: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            userStories: []
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

    static getViewForUserStory(e, i) {
        return (
            <div className="user-story" key={i}>
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

    render() {
        const {userStories} = this.state;

        return (
            <div id="c-user-story-list">
                {userStories.sort((e1, e2) => e1.priority > e2.priority ? -1 : 1)
                    .map((e, i) => UserStoryList.getViewForUserStory(e, i))}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loadedUserStories: state.loadedUserStories
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getUserStories: (id) =>
            dispatch(getUserStories(id)),
        showFloatingMessage: (params) =>
            dispatch(showFloatingMessage(params))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserStoryList);
