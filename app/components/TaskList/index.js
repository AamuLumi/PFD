import React, {Component} from 'react';
import {connect} from 'react-redux';
import ClassNames from 'classnames';

import './TaskList.less';

class UserStoryList extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    static propTypes = {
        tasks: React.PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillReceiveProps(newProps) {
        this.props = newProps;
    }

    getViewForTask(e, i) {
        let classes = {'task-container' : true};

        if (e.state === 2){
            classes.done = true;
        } else if (e.state === 1){
            classes.doing = true;
        } else {
            classes.waiting = true;
        }

        classes = ClassNames(classes);

        return (
            <div className={classes}
                key={i}>
                {e.name}
            </div>
        );
    }

    render() {
        const {tasks} = this.props;

        return (
            <div className="c-task-list">
                {tasks.filter((e) => e.state === 0)
                    .map((e, i) => this.getViewForTask(e, i))}
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

export default connect(mapStateToProps, mapDispatchToProps)(UserStoryList);
