import React, {Component} from 'react';
import {Link} from 'react-router';

import './ProjectList.less';

import Projects from '../../data/projects.js';

export default class Application extends Component {
    constructor(props) {
        super(props);
    }

    getShortDescription(desc) {
        if (desc.length > 300) {
            return desc.substring(0, 300) + '...';
        }

        return desc;
    }

    render() {
        console.log(Projects);
        return (
            <div id="v-projectlist">
                <div className="title">
                    Liste des projets
                </div>
                <div className="project-list">
                    {Projects.map((p, i) =>
                        <Link to={'project/edit/' + i} key={i}>
                            <div className="project">
                                <div className="project-description">
                                    {this.getShortDescription(p.description)}
                                </div>
                                <div className="project-title">
                                    {p.name}
                                </div>
                            </div>
                        </Link>
                    )}
                </div>
            </div>
        );
    }
}
