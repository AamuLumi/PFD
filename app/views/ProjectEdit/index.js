import React, {Component} from 'react';

import './ProjectEdit.less';

import Projects from '../../data/projects.js';

export default class Application extends Component {
    static propTypes = {
        params: React.PropTypes.object.isRequired
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
