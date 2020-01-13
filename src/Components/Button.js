import React from 'react';
import * as PropTypes from 'prop-types';
import * as utils from '../js/utils';

export default class Button extends React.Component {
    static propTypes = {
        type: PropTypes.oneOf(['submit', 'button', 'reset']),
        disableOnError: PropTypes.bool,
        errorStyle: PropTypes.string,
        errorClassName: PropTypes.string,
    };

    static contextTypes = {
        errors: PropTypes.object,
    };

    render() {
        const remainingProps = utils.removeKeysFromObject(this.props,
            ['style', 'className', 'errorClassName', 'errorStyle', 'disableOnError']);

        const {disableOnError} = this.props;
        let {style, errorStyle, errorClassName, className} = this.props;
        const {errors} = this.context;
        const hasErrors = !utils.hasOnlyNullKeys(errors);

        const disabled = disableOnError ? hasErrors : false;
        style = hasErrors ? errorStyle: style;
        className = hasErrors ? errorClassName: className;

        return (
            <button {...remainingProps} disabled={disabled} style={style} className={className}>
                {this.props.children}
            </button>
        );
    }
}