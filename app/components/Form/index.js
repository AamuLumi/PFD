import React, {Component} from 'react';

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
            <input type="text"
                   name={element.name}
                   placeholder={firstLetterUp(element.placeholder) || firstLetterUp(element.name)}
                   onChange={(e) => this.handleChange(e, element.name)}
                   value={this.state[element.name]}/>
        );
    }

    getTextArea(element) {
        return (
            <textarea name={element.name}
                      rows="4"
                      placeholder={firstLetterUp(element.placeholder) ||
                      firstLetterUp(element.name)}
                      onChange={(e) => this.handleChange(e, element.name)}
                      value={this.state[element.name]}/>
        );
    }

    getChoices(element) {
        return (
            <select value={this.state[element.name]}
                    onChange={(e) => this.handleChange(e, element.name)}>
                {element.choices.map((e, i) =>
                    <option value={e.value} key={i}>{e.name}</option>
                )}
            </select>
        );
    }

    getFieldFor(element, i) {
        let htmlField = null;

        if (element.type === 'text') {
            htmlField = this.getText(element);
        } else if (element.type === 'textArea') {
            htmlField = this.getTextArea(element);
        } else if (element.type === 'choices') {
            htmlField = this.getChoices(element);
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
