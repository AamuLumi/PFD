import React, {Component} from 'react';
import {connect} from 'react-redux';

import {createSprint} from '../../actions/Sprint';
import {showFloatingMessage, MESSAGE_CLASSES} from '../../actions/LocalActions';
import Form from '../Form';

import './SprintCreation.less';

class SprintCreation extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    static propTypes = {
        dismiss: React.PropTypes.func.isRequired,
        createSprint: React.PropTypes.func.isRequired,
        createdSprint: React.PropTypes.object.isRequired,
        showFloatingMessage: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.createdSprint.loaded &&
            newProps.createdSprint.date !== this.props.createdSprint.date) {
            if (newProps.createdSprint.error) {
                this.props.showFloatingMessage(
                    newProps.createdSprint.errorMessage,
                    MESSAGE_CLASSES.ERROR
                );
            } else {
                this.props.dismiss();
                this.props.showFloatingMessage(
                    'Sprint created',
                    MESSAGE_CLASSES.SUCCESS
                );
            }
        }

        this.props = newProps;
    }

    checkMousePosition(e) {
        if (e.target.id === 'c-sprint-creation') {
            this.props.dismiss();
        }
    }

    createSprint(data) {
        if (!data.name){
            this.props.showFloatingMessage(
                'Error : missing name',
                MESSAGE_CLASSES.ERROR
            );
        } else {
            data.duration = parseInt(data.beginningDuration);

            this.props.createSprint(data);
        }
    }

    render() {
        return (
            <div id="c-sprint-creation" onClick={(e) => this.checkMousePosition(e)}>
                <div className="sprint-creation-container">
                    <div className="form">
                        <h1>Sprint creation</h1>
                        <Form
                            onAccept={(state) => this.createSprint(state)}
                            inputs={[
                                {name: 'name', type: 'text'},
                                {name: 'beginning', type: 'dateRange'}
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
        createdSprint: state.createdSprint
    };
}

function mapDispatchToProps(dispatch) {
    return {
        createSprint: (sprint) => {
            dispatch(createSprint(sprint));
        },
        showFloatingMessage: (message, messageClass) => {
            dispatch(showFloatingMessage({
                message, messageClass
            }));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SprintCreation);