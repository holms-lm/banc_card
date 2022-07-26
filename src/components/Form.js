import React from 'react';
import InputWrapper from './InputWrapper';
import SelectWrapper from './SelectWrapper';
import ButtonWrapper from './ButtonWrapper';

export default class Form extends React.Component{
    constructor(props) {
        super(props);
        const defaultStateElement = {
            message: false,
            isValid: false,
            error: false,
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

    checkValidate(isValid, name) {
        const elements = Object.assign({}, this.state.elements);
        const currentElement = elements[name];
        if (isValid) {
            currentElement.isValid = true;
            currentElement.error = false;
            currentElement.message = false;
        } else {
            currentElement.isValid = false;
            currentElement.error = true;
            if (currentElement.errorMessage) {
                currentElement.message = currentElement.errorMessage;
            } else {
                currentElement.message = 'error';
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
        const { name, value } = e.target;
        const stateElements = Object.assign({}, this.state.elements)
        stateElements[name].value = value;
        this.setState({ elements: stateElements });
    }

    clearForm() {
        this.setState({ isValid: false, elements: this.defaultElements });
    }

    submitForm(event) {
        event.preventDefault();
        console.log(Form.printData(this.state.elements));
        this.clearForm();
    }

    render() {
        const { cardNumber, cardName, cvv, month, year } = this.state.elements;
        return (
            <form>
                <h1>Form</h1>
                <div className="form_element">
                    <InputWrapper name='cardNumber'
                                  label='Card Number' message={ cardNumber.message }
                                  error={ cardNumber.error }
                                  value={ cardNumber.value }
                                  onChange={ this.onChange }
                                  checkValidate={ this.checkValidate }
                                  typeValidate='cardNumber'/>
                </div>
                <div className="form_element">
                    <InputWrapper name='cardName'
                                  value={ cardName.value }
                                  label='Card Name' message={ cardName.message }
                                  error={ cardName.error }
                                  onChange={ this.onChange }
                                  checkValidate={ this.checkValidate }
                                  typeValidate='name'/>
                </div>
                <div className="wrapper__row">
                    <div className="form_element">
                        <InputWrapper name='cvv'
                                      value={ cvv.value }
                                      label='CVV' message={ cvv.message }
                                      error={ cvv.error }
                                      onChange={ this.onChange }
                                      checkValidate={ this.checkValidate }
                                      typeValidate='cvv'/>
                    </div>
                    <div className="form_element">
                        <SelectWrapper name='month'
                                       value={month.value}
                                       label='Month' message={month.message}
                                       error={month.error}
                                       onChange={ this.onChange }
                                       options={ this.getMonths() }
                                       checkValidate={ this.checkValidate }
                                       typeValidate='selected'/>
                    </div>
                    <div className="form_element">
                        <SelectWrapper name='year'
                                       value={ year.value }
                                       label='Year'
                                       message={ year.message }
                                       error={ year.error }
                                       onChange={ this.onChange }
                                       options={ this.getYears() }
                                       checkValidate={ this.checkValidate }
                                       typeValidate='selected'/>
                    </div>
                </div>
                <div className="wrapper__row">
                    <div></div>
                    <div className="form_element">
                        <ButtonWrapper
                            text='Clear'
                            type='button'
                            onClick={ () => this.clearForm() }
                        />
                    </div>
                    <div className="form_element">
                        <ButtonWrapper
                            text='Submit'
                            type='submit'
                            disabled={ !this.state.isValid }
                            onClick={ this.submitForm }
                        />
                    </div>
                </div>
            </form>
        )
    }
}