import * as React from "react";
import * as PropTypes from 'prop-types';
import * as utils from '../js/utils';

export default class Checkbox extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        value: PropTypes.string,
        defaultChecked: PropTypes.bool,
    };

    static contextTypes = {
        checkbox: PropTypes.object,
        updateCheckboxHandler: PropTypes.func,
        checkboxGroupName: PropTypes.string,
    };

    componentDidMount() {
        const {updateCheckboxHandler} = this.context;
        let {name, defaultChecked, value} = this.props;

        defaultChecked = defaultChecked || false;

        updateCheckboxHandler(name, value, defaultChecked);
    }

    onChange = (event) => {
        const {updateCheckboxHandler} = this.context;
        const {name, value} = this.props;
        const {checked} = event.target;

        updateCheckboxHandler(name, value, checked);
    };

    render() {
        const {checkboxGroupName, checkbox} = this.context;
        const {name} = this.props;
        const remainingProps = utils.removeKeysFromObject(this.props,
            ['name', 'value', 'defaultChecked']);

        let checked = checkbox[name] || null;
        checked = checked ? checked.state : false;

        return (
            <input {...remainingProps} type="checkbox" name={checkboxGroupName} checked={checked} onChange={this.onChange}/>
        );
    }
}