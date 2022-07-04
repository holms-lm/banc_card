import validators from './validators';
import TextField from '@material-ui/core/TextField';

export default function InputWrapper({ name, value, label, message, error, onChange, typeValidate, paramsValidate=[], checkValidate }) {
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
/*        <input type="text"
               name={name}
               value={value}
               onChange={onChange}
               onBlur={(e) => validator(e, checkValidate)} />*/
    <TextField
        label={label}
        helperText={message}
        error={error}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={(e) => validator(e, checkValidate)}
    />
    )
}