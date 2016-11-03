import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getProject, editProject} from '../../actions/Project';

import './ProjectEdit.less';

import Projects from '../../data/projects.js';

class ProjectEdit extends Component {
    static propTypes = {
        params: React.PropTypes.object.isRequired,
        loadedProject: React.PropTypes.object.isRequired,
        getProject: React.PropTypes.func.isRequired,
        editedProject: React.PropTypes.object.isRequired,
        editProject: React.PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        let projectToLoad = undefined;

        if (this.props.params.id < Projects.length && this.props.params.id >= 0) {
            projectToLoad = Projects[this.props.params.id];
        } else {
            projectToLoad = {
                name: undefined,
                description: undefined
            };
        }

        this.state = {
            project: projectToLoad,
            edit: false
        };
    }

    acceptEdit() {
        this.setState({
            edit: false
        }, () => {
            this.props.editProject(this.state.project, this.props.params.id);
        });
    }

    switchEdit() {
        this.setState({
            edit: !this.state.edit
        });
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
                <input type="text"
                       className="title"
                       value={project.name}
                       placeholder="Name"/>
                <textarea type="text"
                          rows="5"
                       className="description"
                       placeholder="Description">
                    {project.description}
                </textarea>
            </div>
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
                <div className="description">
                    {project.description}
                </div>
            </div>
        );
    }

    render() {
        let {edit} = this.state;

        return (
            <div id="v-projectedit">
                {edit && this.getEditableView()}
                {!edit && this.getClassicView()}
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        loadedProject: state.loadedProject,
        editedProject: state.editedProject
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getProject: (id) => {
            dispatch(getProject(id));
        },
        editProject: (project, id) => {
            dispatch(editProject(project, id));
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectEdit);