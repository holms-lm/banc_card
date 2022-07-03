import validators from './validators';

export default function Input({ name, value, onChange, typeValidate, paramsValidate=[], checkValidate }) {
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
    return (
        <input type="text"
               name={name}
               value={value}
               onChange={onChange}
               onBlur={(e) => validator(e, checkValidate)} />
    )
}