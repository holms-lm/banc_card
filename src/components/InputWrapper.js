import validators from './validators';
import TextField from '@mui/material/TextField'

export default function InputWrapper({
        name,
        value,
        label,
        message,
        error,
        onChange,
        typeValidate,
        paramsValidate=[],
        checkValidate,
    }) {
    function validator(event) {
        const { name, value } = event.target;
        let isValid = false;
        if (validators.hasOwnProperty(typeValidate)) {
            isValid = validators[typeValidate](value, ...paramsValidate);
        }
        checkValidate(isValid, name);
    }
    return (
        <TextField
            label={ label }
            helperText={ message }
            error={ error }
            name={ name }
            value={ value }
            onChange={ onChange }
            onBlur={ (event) => validator(event, checkValidate) }
        />
    )
}