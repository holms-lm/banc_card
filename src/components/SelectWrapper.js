import validators from './validators';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

export default function SelectWrapper({
        name,
        label,
        error,
        message,
        value,
        onChange,
        options,
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
        checkValidate(isValid, name, value);
    }

    function renderOptions() {
        return options.map(({ value, text }) => <MenuItem key={ value } value={ value }>{ text }</MenuItem>);
    }

    return (
        <FormControl error={ error }>
            <InputLabel>{ label }</InputLabel>
            <Select
                label={ label }
                name={ name }
                value={ value }
                onChange={ (event) => { onChange(event); validator(event) }}
            >
                { renderOptions() }
            </Select>
            <FormHelperText>{ message }</FormHelperText>
        </FormControl>
    )
}