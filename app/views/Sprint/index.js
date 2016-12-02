import React, {Component} from 'react';
import {connect} from 'react-redux';

import SprintCreation from '../../components/SprintCreation';

import './Sprint.less';

class ProjectEdit extends Component {
    static propTypes = {};

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillReceiveProps(newProps) {
        this.props = newProps;
    }

    showAddSprintForm(){
        this.setState({
            sprintCreation: true
        });
    }

    getClassicView() {
        return (
            <div>
                <div className="container-edit-button" onClick={() => this.showAddSprintForm()}>
                    <i className="edit-button fa fa-plus fa-2"></i>
                </div>
                <div className="title">
                    Sprints
                </div>
                <div className="sprints-container">

                </div>
            </div>
        );
    }

    render() {
        let {sprintCreation} = this.state;

        return (
            <div id="v-sprint">
                {this.getClassicView()}
                {sprintCreation && (
                    <SprintCreation
                        dismiss={() => {
                            this.setState({sprintCreation: false});
                        }}/>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {};
}

function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEdit);