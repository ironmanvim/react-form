import * as React from "react";
import * as PropTypes from 'prop-types';
import * as utils from '../js/utils';

export default class InputError extends React.Component {
    static propTypes = {
        names: PropTypes.string.isRequired,
        errorStyle: PropTypes.object,
        errorClassName: PropTypes.string,
        displayName: PropTypes.string,
    };

    static contextTypes = {
        errors: PropTypes.object,
    };

    render() {
        const {names, errorStyle, errorClassName} = this.props;
        const {errors} = this.context;
        const remainingProps = utils.removeKeysFromObject(this.props, ['name', 'errorStyle', 'errorClassName']);

        let displayErrors = names.split(utils.commaRegex)
            .map(name => {
                return {
                    name,
                    value: errors[name],
                }
            })
            .filter(error => error.value !== null)
            .reduce((dE, error) => {
                dE.push((
                    <span
                        key={error.name}
                        style={errorStyle}
                        className={errorClassName}
                    >
                        {error.value}
                    </span>
                ));
                dE.push(" ");
                return dE;
            }, []);

        return (
            <span {...remainingProps}>
                {displayErrors}
            </span>
        );
    }
}