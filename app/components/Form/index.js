import React, {Component} from 'react';

import Input, {TYPES} from '../../atoms/Input';
import './Form.less';

function firstLetterUp(text) {
    if (!text) {
        return text;
    }

    return text[0].toUpperCase() + text.substring(1);
}

export default class UserStoryCreation extends Component {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    };

    static propTypes = {
        onAccept: React.PropTypes.func.isRequired,
        inputs: React.PropTypes.array.isRequired
    };

    constructor(props) {
        let input = null;

        super(props);

        this.state = {};

        for (let i in props.inputs) {
            input = props.inputs[i];
            if (input.type === 'number') {
                this.state[input.name] = 0;
            } else if (input.type === 'choices') {
                this.state[input.name] = input.choices[0].value;
            } else if (input.type === 'dateRange') {
                this.state[input.name] = '';
                this.state[input.name + 'Duration'] = '0';
            } else {
                this.state[input.name] = '';
            }
        }
    }

    handleChange(e, field) {
        let stateChange = {};

        stateChange[field] = e.target.value;

        this.setState(stateChange);
    }

    getText(element) {
        return (
            <Input type={TYPES.TEXT}
                   name={element.name}
                   placeholder={element.placeholder}
                   onChange={(e) => this.handleChange(e, element.name)}
                   value={this.state[element.name]}/>
        );
    }

    getTextArea(element) {
        return (
            <Input
                type={TYPES.TEXTAREA}
                name={element.name}
                rows={4}
                placeholder={element.placeholder}
                onChange={(e) => this.handleChange(e, element.name)}
                value={this.state[element.name]}/>
        );
    }

    getSelect(element) {
        return (
            <Input
                name={element.name}
                type={TYPES.SELECT}
                onChange={(e) => this.handleChange(e, element.name)}
                value={this.state[element.name]}
                options={element.options}
            />
        );
    }

    getDateRange(element) {
        return (
            <Input
                name={element.name}
                type={TYPES.DATE_RANGE}
                onChange={(e) => this.handleChange(e, element.name)}
                onDurationChange={(e) => this.handleChange(e, element.name + 'Duration')}
                value={this.state[element.name]}
                durationValue={this.state[element.name + 'Duration']}
                options={element.options}
            />
        );
    }

    getFieldFor(element, i) {
        let htmlField = null;

        if (element.type === 'text') {
            htmlField = this.getText(element);
        } else if (element.type === 'textArea') {
            htmlField = this.getTextArea(element);
        } else if (element.type === 'select') {
            htmlField = this.getSelect(element);
        } else if (element.type === 'dateRange') {
            htmlField = this.getDateRange(element);
        }

        return (
            <tr key={i}>
                <td>
                    <label htmlFor={element.name}>{firstLetterUp(element.name)}</label>
                </td>
                <td>
                    {htmlField}
                </td>
            </tr>
        );
    }

    render() {
        return (
            <div className="form-container">
                <table>
                    <colgroup>
                        <col span="1" style={{width: '20%'}}></col>
                        <col span="1" style={{width: '80%'}}></col>
                    </colgroup>
                    <tbody>
                    {this.props.inputs.map((e, i) => this.getFieldFor(e, i))}

                    <tr>
                        <td colSpan="2">
                            <button className="confirm-button"
                                    onClick={() => this.props.onAccept(this.state)}>
                                Send
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}
