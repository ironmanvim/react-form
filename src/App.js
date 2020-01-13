import React from 'react';
import Form from './Components/Form';
import TextInput from "./Components/TextInput";
import InputError from "./Components/InputError";
import RadioGroup from "./Components/RadioGroup";
import RadioButton from "./Components/RadioButton";
import Checkbox from "./Components/Checkbox";
import CheckboxGroup from "./Components/CheckboxGroup";
import Button from "./Components/Button";


import * as utils from './js/utils';
import './App.css';


function App() {
    return (
        <div className="App">
            <Form onSubmit={(form) => {
                console.log(form);
            }}>
                <div>
                    <InputError
                        names="a,b,checkbox,radio"
                        style={{border: "1px solid red", display: "inline-block"}}
                        errorStyle={{border: "1px solid blue", display: "block"}}
                    />
                </div>
                <TextInput
                    type="text"
                    name="a"
                    value="hello"
                    errorValue="No spaces bro"
                    validate={value => value.split(" ").length === 1}
                    errorStyle={{background: "red"}}
                />
                <TextInput
                    name="b"
                    errorValue="Only Numbers dude"
                    value="0"
                    validate={value => !!value.match(utils.onlyNumbers)}
                />
                <RadioGroup name="radio" validate={checked => checked} errorValue="Please check a value">
                    <RadioButton name="a" value="a" />
                    <RadioButton name="1" value="c" />
                    <RadioButton name="b" value="b"/>
                </RadioGroup>
                <CheckboxGroup
                    name="checkbox"
                    validate={size => size === 2}
                    errorValue="please check only two values"
                >
                    <Checkbox name="a" value="a" defaultChecked/>
                    <Checkbox name="b" value="b" defaultChecked/>
                    <Checkbox name="c" value="c"/>
                </CheckboxGroup>
                <Button disableOnError>
                    Submit
                </Button>
                <button type="reset">Reset</button>
            </Form>
        </div>
    );
}

export default App;
