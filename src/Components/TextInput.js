import React from "react";
import * as PropTypes from 'prop-types';
import * as utils from '../js/utils';

export default class TextInput extends React.Component {
    static defaultProps = {
        validate: () => true,
        type: "text",
    };

    static propTypes = {
        name: PropTypes.string.isRequired,
        value: PropTypes.string,
        errorValue: PropTypes.string,
        errorStyle: PropTypes.object,
        errorClassName: PropTypes.string,
        validate: PropTypes.func,
        type: PropTypes.oneOf(["text", "password"]),
    };

    static contextTypes = {
        updateErrors: PropTypes.func,
        updateFormState: PropTypes.func,
        form: PropTypes.object,
    };

    componentDidMount() {
        const {updateFormState, updateErrors} = this.context;

        let {name, value, validate, errorValue} = this.props;
        value = value || "";
        errorValue = errorValue || "error";

        if (validate(value)) {
            updateErrors(name, null);
        } else {
            updateErrors(name, errorValue);
        }

        updateFormState(name, value);
    }

    updateInput = (event) => {
        const {updateFormState, updateErrors} = this.context;

        let {name, validate, errorValue} = this.props;
        let {value} = event.target;

        errorValue = errorValue || "error";

        if (validate(value)) {
            updateErrors(name, null);
        } else {
            updateErrors(name, errorValue);
        }

        updateFormState(name, value);
    };

    onChange = (event) => {
        this.updateInput(event);
        this.props.onChange(event);
    };

    render() {
        let remainingProps = utils.removeKeysFromObject(this.props,
            ['onChange', 'name', 'value', 'errorValue', 'validate', 'style', 'className', 'errorClassName', 'errorStyle']);
        let {name, style, validate, errorStyle, className, errorClassName} = this.props;
        const {form} = this.context;

        let value = form[name] || "";

        const valueIsValidated = validate(value);
        style = valueIsValidated ? style : errorStyle;
        className = valueIsValidated ? className : errorClassName;

        return (
            <input {...remainingProps} className={className} style={style} value={value} onChange={this.updateInput}/>
        );
    }
}
