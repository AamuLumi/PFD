import React, {Component} from 'react';
import {connect} from 'react-redux';
import ClassNames from 'classnames';

import './FloatingMessage.less';

class FloatingMessage extends Component {
    static propTypes = {
        floatingMessage: React.PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            message: undefined,
            messageClass: undefined
        };
    }

    componentWillReceiveProps(newProps){
        if (newProps.floatingMessage.date !== this.props.floatingMessage.date){
            this.setState({
                message : newProps.floatingMessage.message,
                messageClass : newProps.floatingMessage.messageClass
            }, () => {
                setTimeout(() => {
                    this.setState({
                        message: undefined,
                        messageClass: undefined
                    });
                }, 2000);
            });
        }

        this.props = newProps;
    }

    render() {
        let {message, messageClass} = this.state;

        if (!message){
            return (<div id="c-floating-message"></div>);
        }

        let divClasses = {
            'floating-message': true
        };

        if (messageClass){
            divClasses[messageClass] = true;
        }

        divClasses = ClassNames(divClasses);

        return (
            <div id="c-floating-message">
                <div className={divClasses}>
                    {message}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        floatingMessage: state.floatingMessage
    };
}

export default connect(mapStateToProps)(FloatingMessage);