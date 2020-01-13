import * as React from "react";
import * as PropTypes from 'prop-types';
import * as utils from '../js/utils';

export default class RadioButton extends React.Component {
    static propTypes = {
        name: PropTypes.string.isRequired,
        value: PropTypes.string,
        defaultChecked: PropTypes.bool,
    };

    static contextTypes = {
        activeRadio: PropTypes.object,
        updateRadioHandler: PropTypes.func,
        radioGroupName: PropTypes.string,
    };

    componentDidMount() {
        const {updateRadioHandler} = this.context;
        let {name, defaultChecked, value} = this.props;

        defaultChecked = defaultChecked || false;
        updateRadioHandler(name, defaultChecked, value);
    }

    onChange = (event) => {
        const {updateRadioHandler} = this.context;
        const {name, value} = this.props;
        const {checked} = event.target;

        updateRadioHandler(name, checked, value);
    };

    render() {
        const {radioGroupName, activeRadio} = this.context;
        const {name} = this.props;
        const remainingProps = utils.removeKeysFromObject(this.props,
            ['name', 'value', 'defaultChecked']);

        let checked = activeRadio.name === name;

        return (
            <input {...remainingProps} type="radio" name={radioGroupName} checked={checked} onChange={this.onChange}/>
        );
    }
}