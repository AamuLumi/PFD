import React, {Component} from 'react';

import './Input.less';

export const TYPES = {
    TEXT: 1,
    TEXTAREA: 2,
    SELECT: 3
};

export default class Input extends Component {
    static propTypes = {
        type: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        placeholder: React.PropTypes.string,
        onChange: React.PropTypes.func,
        value: React.PropTypes.any,
        style: React.PropTypes.object,
        /* Text area props */
        rows: React.PropTypes.number,
        /* Select props */
        options: React.PropTypes.array,
        optionStyle: React.PropTypes.object
    };

    constructor(props) {
        super(props);

    }

    static firstLetterUp(text) {
        if (!text) {
            return '';
        }

        return text[0].toUpperCase() + text.substring(1);
    }

    getTextInput() {
        const {placeholder, name, value, onChange, style} = this.props;

        return (
            <input
                className="input-text"
                type="text"
                onChange={onChange}
                value={value}
                placeholder={Input.firstLetterUp(placeholder ? placeholder : name)}
                name={name}
                style={style}
            />
        );
    }

    getTextArea() {
        const {placeholder, name, value, onChange, rows, style} = this.props;

        return (
            <textarea
                className="input-textarea"
                onChange={onChange}
                value={value}
                placeholder={Input.firstLetterUp(placeholder ? placeholder : name)}
                name={name}
                rows={rows}
                style={style}
            />
        );
    }

    getSelect() {
        const {options, value, onChange, style} = this.props;

        return (
            <select
                className="input-select"
                onChange={onChange}
                value={value}
                style={style}
            >
                {options.map((e, i) =>
                    <option value={e.value} key={i}>{e.name}</option>
                )}
            </select>
        );
    }

    render() {
        const {type} = this.props;
        let inputField = undefined;

        switch (type) {
            case TYPES.TEXT:
                inputField = this.getTextInput();
                break;
            case TYPES.TEXTAREA:
                inputField = this.getTextArea();
                break;
            case TYPES.SELECT:
                inputField = this.getSelect();
                break;
            default:
                inputField = this.getTextInput();
        }

        return (
            <div className="input">
                {inputField}
            </div>
        );
    }
}