import React, {Component} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {getProjects} from '../../actions/Project';

import './ProjectList.less';

class ProjectList extends Component {
    static propTypes = {
        getProjects: React.PropTypes.func.isRequired,
        projectList: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.props.getProjects();

        this.state = {
            projects: []
        };
    }

    componentWillReceiveProps(newProps) {
        if (newProps.projectList.loaded && !newProps.projectList.error) {
            this.setState({
                projects: newProps.projectList.data
            });
        }

        this.props = newProps;
    }

    getShortDescription(desc) {
        if (desc.length > 300) {
            return desc.substring(0, 300) + '...';
        }

        return desc;
    }

    getProjectCards() {
        let {projects} = this.state;

        if (projects && projects.length > 0) {
            return (
                <div className="project-list">
                    {projects.map((p, i) =>
                        <Link to={'project/edit/' + p._id} key={i}>
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
            );
        } else {
            return (
                <div className="project-list">
                    No projects found
                </div>
            )
        }
    }

    render() {
        return (
            <div id="v-projectlist">
                <div className="title">
                    Liste des projets
                </div>
                {this.getProjectCards()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        projectList: state.projectList
    };
}

function mapDispatchToProps(dispatch) {
    return {
        getProjects: () => {
            dispatch(getProjects());
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);