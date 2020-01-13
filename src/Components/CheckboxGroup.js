import * as React from "react";
import * as PropTypes from 'prop-types';
import * as utils from "../js/utils";

export default class CheckboxGroup extends React.Component {
    static defaultProps = {
        errorValue: "error",
        validate: () => true,
    };

    static propTypes = {
        name: PropTypes.string.isRequired,
        errorValue: PropTypes.string,
        validate: PropTypes.func,
    };

    static contextTypes = {
        updateErrors: PropTypes.func,
        updateFormState: PropTypes.func,
        form: PropTypes.object,
    };

    static childContextTypes = {
        checkbox: PropTypes.object,
        updateCheckboxHandler: PropTypes.func,
        checkboxGroupName: PropTypes.string,
    };

    getChildContext() {
        return {
            checkbox: this.state.checkbox,
            updateCheckboxHandler: this.updateCheckboxHandler,
            checkboxGroupName: this.props.name,
        };
    }

    componentDidMount() {
        const {updateFormState} = this.context;
        const {name} = this.props;

        updateFormState(name, []);
    }

    state = {
        checkbox: {},
    };

    updateCheckboxHandler = (name, value, state) => {
        this.setState((prevState) => {
            return {
                checkbox: {
                    ...prevState.checkbox,
                    [name]: {
                        state,
                        value,
                    }
                }
            }
        }, () => {
            const {updateFormState, updateErrors} = this.context;
            const {checkbox} = this.state;
            const {name, validate, errorValue} = this.props;

            let value = Object.keys(checkbox)
                .filter(key => checkbox[key].state === true)
                .map(key => checkbox[key].value);

            updateFormState(name, value);
            if (validate(value.length)) {
                updateErrors(name, null);
            } else {
                updateErrors(name, errorValue);
            }
        });
    };

    render() {
        const remainingProps = utils.removeKeysFromObject(this.props,
            ['name', 'errorValue', 'validate', 'style', 'className', 'errorClassName', 'errorStyle']);
        let {style, validate, errorStyle, className, errorClassName} = this.props;
        const {checkbox} = this.state;

        let value = Object.keys(checkbox)
            .filter(key => checkbox[key].state === true)
            .map(key => checkbox[key].value);

        const valueIsValidated = validate(value);
        style = valueIsValidated ? style : errorStyle;
        className = valueIsValidated ? className : errorClassName;

        return (
            <span {...remainingProps} style={style} className={className}>
                {this.props.children}
            </span>
        );
    }
}