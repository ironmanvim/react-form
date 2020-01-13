import * as React from "react";
import * as PropTypes from 'prop-types';
import * as utils from '../js/utils';

export default class RadioGroup extends React.Component {
    static defaultProps = {
        validate: () => true,
        errorValue: "error",
    };

    static propTypes = {
        name: PropTypes.string.isRequired,
        validate: PropTypes.func,
        errorValue: PropTypes.string,
    };

    static contextTypes = {
        updateErrors: PropTypes.func,
        updateFormState: PropTypes.func,
        form: PropTypes.object,
    };

    static childContextTypes = {
        activeRadio: PropTypes.object,
        updateRadioHandler: PropTypes.func,
        radioGroupName: PropTypes.string,
    };

    getChildContext() {
        return {
            activeRadio: this.state.activeRadio,
            updateRadioHandler: this.updateRadioHandler,
            radioGroupName: this.props.name,
        };
    }

    componentDidMount() {
        const {updateFormState} = this.context;
        const {name, validate} = this.props;

        updateFormState(name, null);
        validate(null);
    }

    state = {
        activeRadio: {
            name: null,
            value: null,
        },
    };

    updateRadioHandler = (name, state, value) => {
        this.setState((prevState) => {
            let activeRadio = {
                name,
                value,
            };
            if (state) {
                return {
                    activeRadio,
                }
            }
            return prevState;
        }, () => {
            const {activeRadio} = this.state;
            const {updateFormState, updateErrors} = this.context;
            const {name, validate, errorValue} = this.props;

            if (activeRadio.name) {
                const {value} = activeRadio;

                updateFormState(name, value);
            }
            if (validate(activeRadio.name !== null)) {
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
        const {activeRadio} = this.state;

        let value = activeRadio.name !== null;

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