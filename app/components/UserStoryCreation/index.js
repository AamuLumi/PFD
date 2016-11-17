import React, {Component} from 'react';
import {connect} from 'react-redux';

import {createUserStory} from '../../actions/UserStory';
import {showFloatingMessage, MESSAGE_CLASSES} from '../../actions/LocalActions';
import Form from '../Form';

import './UserStoryCreation.less';

class UserStoryCreation extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    static propTypes = {
        dismiss: React.PropTypes.func.isRequired,
        createUserStory: React.PropTypes.func.isRequired,
        createdUserStory: React.PropTypes.object.isRequired,
        showFloatingMessage: React.PropTypes.func.isRequired,
        projectID: React.PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.createdUserStory.loaded &&
            newProps.createdUserStory.date !== this.props.createdUserStory.date) {
            if (newProps.createdUserStory.error) {
                this.props.showFloatingMessage(
                    newProps.createdUserStory.errorMessage,
                    MESSAGE_CLASSES.ERROR
                );
            } else {
                this.props.dismiss();
                this.props.showFloatingMessage(
                    'User Story created',
                    MESSAGE_CLASSES.SUCCESS
                );
            }
        }

        this.props = newProps;
    }

    checkMousePosition(e) {
        if (e.target.id === 'c-user-story-creation') {
            this.props.dismiss();
        }
    }

    createUserStory(data) {
        data.projectID = this.props.projectID;
        data.effort = parseInt(data.effort);
        data.priority = parseInt(data.priority);

        this.props.createUserStory(data);
    }

    render() {
        return (
            <div id="c-user-story-creation" onClick={(e) => this.checkMousePosition(e)}>
                <div className="user-story-creation-container">
                    <div className="form">
                        <h1>User Story creation</h1>
                        <Form
                            onAccept={(state) => this.createUserStory(state)}
                            inputs={[
                                {name: 'name', type: 'text'},
                                {name: 'description', type: 'textArea'},
                                {
                                    name: 'effort', type: 'choices', choices: [
                                    {value: 1, name: 'Very easy (1)'},
                                    {value: 2, name: 'Easy (2)'},
                                    {value: 3, name: 'Normal (3)'},
                                    {value: 5, name: 'Hard (5)'},
                                    {value: 8, name: 'Very hard(8)'}
                                    ]
                                },
                                {
                                    name: 'priority', type: 'choices', choices: [
                                    {value: 0, name: 'Option (0)'},
                                    {value: 1, name: 'Desired (1)'},
                                    {value: 2, name: 'Required (2)'}
                                    ]
                                }
                            ]}/>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        createdUserStory: state.createdUserStory
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createUserStory: (userStory) => {
            dispatch(createUserStory(userStory));
        },
        showFloatingMessage: (message, messageClass) => {
            dispatch(showFloatingMessage({
                message, messageClass
            }));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(UserStoryCreation);