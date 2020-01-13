import React from "react";
import * as PropTypes from 'prop-types';
import * as utils from '../js/utils';


export default class Form extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func,
    };

    static childContextTypes = {
        form: PropTypes.object,
        errors: PropTypes.object,
        updateFormState: PropTypes.func,
        updateErrors: PropTypes.func
    };

    getChildContext() {
        return {
            form: this.state.form,
            errors: this.state.errors,
            updateFormState: this.updateFormState,
        updateErrors: this.updateErrors,
        }
    }

    state = {
        form: {},
        errors: {},
    };

    updateFormState = (name, value) => {
        this.setState((prevState) => {
            return {
                form: {
                    ...prevState.form,
                    [name]: value,
                }
            };
        });
    };

    updateErrors = (name, value) => {
        this.setState((prevState) => {
            return {
                errors: {
                    ...prevState.errors,
                    [name]: value,
                }
            };
        })
    };

    onFormSubmit = (event) => {
        event.preventDefault();

        const {onSubmit} = this.props;
        const {form, errors} = this.state;
        console.log(form);
        console.log(errors);

        if (!utils.hasOnlyNullKeys(errors)) {
            return;
        }

        onSubmit(form);
    };

    render() {
        const remainingProps = utils.removeKeysFromObject(this.props, ['onSubmit']);
        return (
            <form {...remainingProps} onSubmit={this.onFormSubmit}>
                {this.props.children}
            </form>
        )
    }
}