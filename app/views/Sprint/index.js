import React, {Component} from 'react';
import {connect} from 'react-redux';

import SprintCreation from '../../components/SprintCreation';
import {getSprints} from '../../actions/Sprint';

import './Sprint.less';

class ProjectEdit extends Component {
    static propTypes = {
        loadedSprints: React.PropTypes.object.isRequired,
        getSprints: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {};

        this.props.getSprints();
    }

    componentWillReceiveProps(newProps) {
        this.props = newProps;
    }

    showAddSprintForm(){
        this.setState({
            sprintCreation: true
        });
    }

    getSprint(e, i){
        return (
            <div className="sprint" key={i}>
                <div className="sprint-title">
                    {e.name}
                </div>
                <div className="sprint-informations">
                    Beginning : {new Date(e.beginning).toLocaleString()} - {e.duration} days
                </div>
            </div>
        );
    }

    getClassicView() {
        let {loadedSprints} = this.props;

        return (
            <div>
                <div className="container-edit-button" onClick={() => this.showAddSprintForm()}>
                    <i className="edit-button fa fa-plus fa-2"></i>
                </div>
                <div className="title">
                    Sprints
                </div>
                <div className="sprints-container">
                    {loadedSprints.data &&
                    loadedSprints.data.map((e, i) => this.getSprint(e, i))}
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
                            this.props.getSprints();
                        }}/>
                )}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        loadedSprints: state.loadedSprints
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getSprints : () => dispatch(getSprints())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEdit);