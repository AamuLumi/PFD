import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getCurrentSprint} from '../../actions/Sprint';
import {getTasksForUser, setTaskState} from '../../actions/Task';
import {getLoggedUser} from '../../actions/User';
import {showFloatingMessage, MESSAGE_CLASSES} from '../../actions/LocalActions';

import './Kanban.less';

class Kanban extends Component {
    static propTypes = {
        getCurrentSprint: React.PropTypes.func.isRequired,
        currentSprint: React.PropTypes.object.isRequired,
        getTasksForUser: React.PropTypes.func.isRequired,
        loadedTasks: React.PropTypes.object.isRequired,
        getLoggedUser: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {};

        this.props.getLoggedUser();
    }

    componentWillReceiveProps(newProps) {
        if (newProps.loadedTasks.loaded && !newProps.loadedTasks.data &&
            newProps.loggedUser.data && newProps.loggedUser.data._id) {
            this.props.getTasksForUser(newProps.loggedUser.data._id);
        }

        if (newProps.taskStateSet.loaded && newProps.taskStateSet.error) {
            this.props.showFloatingMessage({
                message: newProps.taskStateSet.errorMessage,
                messageClass: MESSAGE_CLASSES.ERROR
            });
        }

        this.props = newProps;
    }

    getKanbanCardFor(e, i) {
        let goPreviousState = null, goNextState = null;

        if (e.state > 0) {
            goPreviousState = () => {
                this.props.setTaskState({
                    _id: e._id,
                    state: e.state - 1
                });
                e.state--;
            };
        }

        if (e.state < 2) {
            goNextState = () => {
                this.props.setTaskState({
                    _id: e._id,
                    state: e.state + 1
                });
                e.state++;
            };
        }

        return (
            <div className="kanban-card" key={i}>
                <div className="container-edit-button">
                    {e.state > 0 &&
                    <i className="edit-button fa fa-arrow-left"
                       onClick={goPreviousState}></i>
                    }
                    {e.state < 2 &&
                    <i className="edit-button fa fa-arrow-right"
                       onClick={goNextState}></i>
                    }
                </div>
                <div className="card-title">
                    {e.name}
                </div>
                <div className="card-description">
                    {e.description}
                </div>
            </div>
        );
    }

    render() {
        let {loggedUser, loadedTasks} = this.props;

        if (!loggedUser.data || !loggedUser.data._id || !loadedTasks.data) {
            return (
                <div id="v-kanban">
                    <div className="title">
                        Kanban
                    </div>
                    Not connected
                </div>
            );
        }

        let waitingTasks = loadedTasks.data
            .filter((e) => e.state === 0);

        let doingTasks = loadedTasks.data
            .filter((e) => e.state === 1);

        let doneTasks = loadedTasks.data
            .filter((e) => e.state === 2);

        return (
            <div id="v-kanban">
                <div className="title">
                    Kanban
                </div>
                <table id="kanban">
                    <col width="33%" />
                    <col width="33%" />
                    <col width="33%" />
                    <thead>
                    <tr>
                        <td>
                            Waiting
                        </td>
                        <td>
                            Doing
                        </td>
                        <td>
                            Done
                        </td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            {waitingTasks.map((e, i) => this.getKanbanCardFor(e, i))}
                        </td>
                        <td>
                            {doingTasks.map((e, i) => this.getKanbanCardFor(e, i))}
                        </td>
                        <td>
                            {doneTasks.map((e, i) => this.getKanbanCardFor(e, i))}
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        currentSprint: state.currentSprint,
        loadedTasks: state.loadedTasks,
        loggedUser: state.loggedUser,
        taskStateSet: state.taskStateSet
    };
}

function mapDispatchToProps(dispatch) {
    return {
        showFloatingMessage: (params) => dispatch(showFloatingMessage(params)),
        getLoggedUser: () => dispatch(getLoggedUser()),
        getCurrentSprint: () => dispatch(getCurrentSprint()),
        getTasksForUser: (userId) => dispatch(getTasksForUser(userId)),
        setTaskState: (params) => dispatch(setTaskState(params))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Kanban);