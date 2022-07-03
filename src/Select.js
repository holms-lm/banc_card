import validators from './validators';

export default function Select({ name, value, onChange, options, typeValidate, paramsValidate=[], checkValidate }) {
    function validator(e) {
        const $element = e.target;
        const name = $element.name;
        const value = $element.value;
        let isValid = false;
        if (validators.hasOwnProperty(typeValidate)) {
            isValid = validators[typeValidate](value, ...paramsValidate);
        }
        checkValidate(isValid, name, value);
    }

    function renderOptions() {
        return options.map((option) => <option key={option.value} value={option.value}>{option.text}</option>);
    }

    return (
        <select name={name} value={value} onChange={(e) => { onChange(e); validator(e)}} >
            {renderOptions()}
        </select>
    )
}