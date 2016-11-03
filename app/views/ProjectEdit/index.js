import React, {Component} from 'react';
import {connect} from 'react-redux';

import {getProject, editProject} from '../../actions/Project';

import './ProjectEdit.less';

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

        this.state = {
            project: {
                name: "",
                description: ""
            },
            edit: false,
            successfullEdit: undefined
        };

        if (this.props.params.id) {
            this.props.getProject(this.props.params.id);
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.loadedProject.loaded && !newProps.loadedProject.error) {
            this.setState({
                project: newProps.loadedProject.data
            });
        }

        if (newProps.editedProject.date !== this.props.editedProject.date){
            this.setState({
                successfullEdit: !this.props.editedProject.error
            }, () => {
                setTimeout(() => {
                    this.setState({
                        successfullEdit: undefined
                    });
                }, 2000);
            })
        }

        this.props = newProps;
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

    handleChange(e, field){
        let nextState = {
            project: this.state.project
        };

        nextState.project[field] = e.target.value;

        this.setState(nextState);
    }

    getEditMessage(){
        let {successfullEdit} = this.state;

        if (successfullEdit === true){
            return (
                <div className="message success">
                    Project edited !
                    </div>
            );
        } else if (successfullEdit === false){
            return (
                <div className="message error">
                    {this.props.editedProject.errorMessage}
                </div>
            );
        }
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
                       onChange={(e) => this.handleChange(e, 'name')}
                       placeholder="Name"/>
                <textarea type="text"
                          rows="5"
                          value={project.description}
                          onChange={(e) => this.handleChange(e, 'description')}
                          className="description"
                          placeholder="Description">
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
                {this.getEditMessage()}
            </div>
        )
    }
}

function mapStateToProps(state) {
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