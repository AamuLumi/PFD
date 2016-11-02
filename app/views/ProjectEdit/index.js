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

        if (this.props.params.id < Projects.length && this.props.params.id >= 0){
            projectToLoad = Projects[this.props.params.id];
        } else {
            projectToLoad = {
                name: undefined,
                description: undefined
            };
        }

        this.state = {
            project : projectToLoad
        };
    }

    render() {
        let {project} = this.state;

        return (
            <div id="v-projectedit">
                <div className="title">
                    {project.name}
                </div>
            </div>
        );
    }
}
