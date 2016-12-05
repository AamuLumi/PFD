import React, {Component} from 'react';

import './Input.less';

export const TYPES = {
    TEXT: 1,
    TEXTAREA: 2,
    SELECT: 3,
    PASSWORD: 4,
    DATE_RANGE: 5
};

export default class Input extends Component {
    static propTypes = {
        type: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        placeholder: React.PropTypes.string,
        onChange: React.PropTypes.func,
        value: React.PropTypes.any,
        style: React.PropTypes.object,
        className: React.PropTypes.string,
        /* Text area props */
        rows: React.PropTypes.number,
        /* Select props */
        options: React.PropTypes.array,
        optionStyle: React.PropTypes.object,
        /* DateRange props */
        onDurationChange: React.PropTypes.func,
        durationValue: React.PropTypes.string
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

    getTextInput(inputType) {
        let {className, placeholder, name, value, onChange, style} = this.props;

        if (className) {
            className += ' input-text';
        } else {
            className = 'input-text';
        }

        return (
            <input
                className={className}
                type={inputType}
                onChange={onChange}
                value={value}
                placeholder={Input.firstLetterUp(placeholder ? placeholder : name)}
                name={name}
                style={style}
            />
        );
    }

    getTextArea() {
        let {className, placeholder, name, value, onChange, rows, style} = this.props;

        if (className) {
            className += ' input-textarea';
        } else {
            className = 'input-textarea';
        }

        return (
            <textarea
                className={className}
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
        let {className, optionStyle, options, value, onChange, style} = this.props;

        if (className) {
            className += ' input-select';
        } else {
            className = 'input-select';
        }

        return (
            <select
                className={className}
                onChange={onChange}
                value={value}
                style={style}
            >
                {options && options.map((e, i) =>
                    <option value={e.value} key={i} style={optionStyle}>{e.name}</option>
                )}
            </select>
        );
    }

    getDateRange() {
        let {value, durationValue, onChange, onDurationChange, style, name} = this.props;

        return (
            <div>
                <div>
                    <span className="label-input">
                        Beginning
                    </span>
                    <input
                        className="input-text"
                        type="date"
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder="Beginning"
                        style={style}
                    />
                </div>
                <div>
                    <span className="label-input">
                        Duration (in days)
                    </span>
                    <input
                        className="input-text"
                        type="number"
                        name="duration"
                        value={durationValue}
                        onChange={onDurationChange}
                        style={style}
                    />
                </div>
            </div>
        );
    }

    render() {
        const {type} = this.props;
        let inputField = undefined;

        switch (type) {
            case TYPES.TEXT:
                inputField = this.getTextInput('text');
                break;
            case TYPES.TEXTAREA:
                inputField = this.getTextArea();
                break;
            case TYPES.SELECT:
                inputField = this.getSelect();
                break;
            case TYPES.PASSWORD:
                inputField = this.getTextInput('password');
                break;
            case TYPES.DATE_RANGE:
                inputField = this.getDateRange();
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