import React from 'react';
import Input from './Input';
import Button from './Button';
import FormElement from './FormElement';

export default class Form extends React.Component{
    constructor(props) {
        super(props);
        const defaultStateInput = {
            message: false,
            isValid: false
        }
        const createDefaultStateInput = () => Object.assign({}, defaultStateInput);
        const inputs = {
            email: createDefaultStateInput(),
            phone: createDefaultStateInput(),
        };
        this.state = { isValid: false, inputs: inputs }
        this.validate = this.validate.bind(this);
    }

    validate(isValid, name) {
        console.log(isValid, name);
        const inputs = Object.assign({}, this.state.inputs);
        if (isValid) {
            inputs[name].isValid = true;
            inputs[name].message = false;
        } else {
            inputs[name].isValid = false;
            inputs[name].message = 'error';
        }
        this.setState({inputs});
    }

    render() {
        return (
            <form action="">
                <h1>Form</h1>
                <FormElement label='email' message={this.state.inputs.email.message}>
                    <Input name='email' validate={this.validate} typeValidate='length'/>
                </FormElement>
                <FormElement label='phone' message={this.state.inputs.phone.message}>
                    <Input name='phone' validate={this.validate} typeValidate='length'/>
                </FormElement>
                <div className="form_element">
                    <Button/>
                    <div className="form_element__message"></div>
                </div>
            </form>
        )
    }
}