import React from 'react';
import Input from './Input';
import Select from './Select';
import Button from './Button';
import FormElement from './FormElement';

export default class Form extends React.Component{
    constructor(props) {
        super(props);
        const defaultStateElement = {
            message: false,
            isValid: false,
            value: '',
        }
        const createDefaultStateElement = (errorMessage) => Object.assign({errorMessage}, defaultStateElement);
        const elements = {
            cardNumber: createDefaultStateElement('Должно быть 16 цифр'),
            cardName: createDefaultStateElement('Имя от 3 до 10 символов'),
            cvv: createDefaultStateElement('Необходимо ввести 3 цифры'),
            month: createDefaultStateElement('Выберите месяц'),
            year: createDefaultStateElement('Выберите год'),
        };
        this.defaultElements = {};
        const cThis = this;
        Object.keys(elements).forEach(function(key) {
            cThis.defaultElements[key] = Object.assign({}, this[key]);
        }, elements);
        this.defaultElements.holms = 'Hi';
        this.state = { isValid: false, elements: elements }
        this.checkValidate = this.checkValidate.bind(this);
        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    static printData(elements) {
        return {
            number: elements.cardNumber.value,
            name: elements.cardName.value,
            expires: `${elements.month.value}/${elements.year.value}`
        }
    }

    checkValidate(isValid, name, value) {
        const elements = Object.assign({}, this.state.elements);
        if (isValid) {
            elements[name].isValid = true;
            elements[name].message = false;
        } else {
            elements[name].isValid = false;
            if (elements[name].errorMessage) {
                elements[name].message = elements[name].errorMessage;
            } else {
                elements[name].message = 'error';
            }
        }
        let isValidForm = true;
        Object.keys(elements).forEach(function(key) {
            if (!this[key].isValid) {
                isValidForm = false;
                return;
            }
        }, elements);
        this.setState({isValid: isValidForm, elements: elements});
        if (isValidForm) {
            this.props.printDataCard(Form.printData(elements));
        }
    }

    getMonths() {
        const result = [{value: '', text: 'Month'}];
        for(let i = 1;i<=12;i++){
            result.push({ value: i.toString(), text: i.toString() });
        }
        return result;
    }

    getYears() {
        const current = (new Date()).getFullYear();
        const result = [{ value: '', text: 'Year' }];
        for(let i = current; i <= (current + 10); i++){
            result.push({ value: i.toString(), text: i.toString() });
        }
        return result;
    }

    onChange(e) {
        const $element = e.target;
        const name = $element.name;
        const value = $element.value;
        const stateElements = Object.assign({}, this.state.elements)
        stateElements[name].value = value;
        this.setState({ elements: stateElements });
    }

    clearForm() {
        this.setState({elements: this.defaultElements});
    }

    submitForm(event) {
        event.preventDefault();
        console.log(Form.printData(this.state.elements));
        this.clearForm();
    }

    render() {
        return (
            <form action="">
                <h1>Form</h1>
                <FormElement label='Card Number' message={this.state.elements.cardNumber.message}>
                    <Input name='cardNumber'
                           value={this.state.elements.cardNumber.value}
                           onChange={this.onChange}
                           checkValidate={this.checkValidate}
                           typeValidate='cardNumber'/>
                </FormElement>
                <FormElement label='Card Name' message={this.state.elements.cardName.message}>
                    <Input name='cardName'
                           value={this.state.elements.cardName.value}
                           onChange={this.onChange}
                           checkValidate={this.checkValidate}
                           typeValidate='name'/>
                </FormElement>
                <FormElement label='CVV' message={this.state.elements.cvv.message}>
                    <Input name='cvv'
                           value={this.state.elements.cvv.value}
                           onChange={this.onChange}
                           checkValidate={this.checkValidate}
                           typeValidate='cvv'/>
                </FormElement>
                <FormElement label='Month' message={this.state.elements.month.message}>
                    <Select name='month'
                            value={this.state.elements.month.value}
                            onChange={this.onChange}
                            options={this.getMonths()}
                            checkValidate={this.checkValidate}
                            typeValidate='selected'/>
                </FormElement>
                <FormElement label='Year' message={this.state.elements.year.message}>
                    <Select name='year'
                            value={this.state.elements.year.value}
                            onChange={this.onChange}
                            options={this.getYears()}
                            checkValidate={this.checkValidate}
                            typeValidate='selected'/>
                </FormElement>
                <div className="form_element">
                    <Button text='Clear' type='button' onClick={() => this.clearForm()}/>
                </div>
                <div className="form_element">
                    <Button text='Submit' type='submit' disabled={!this.state.isValid} onClick={this.submitForm}/>
                </div>
            </form>
        )
    }
}