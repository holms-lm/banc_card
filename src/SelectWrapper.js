import validators from './validators';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

export default function SelectWrapper({ name, label, error, message, value, onChange, options, typeValidate, paramsValidate=[], checkValidate }) {
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
        // return options.map((option) => <option key={option.value} value={option.value}>{option.text}</option>);
        return options.map((option) => <MenuItem key={option.value} value={option.value}>{option.text}</MenuItem>);
    }

    return (
/*
        <select name={name} value={value} onChange={(e) => { onChange(e); validator(e)}} >
            {renderOptions()}
        </select>
*/
        <FormControl error={error}>
            <InputLabel>{label}</InputLabel>
            <Select
                className='select'
                label={label}
                name={name}
                value={value}
                onChange={(e) => { onChange(e); validator(e)}}
            >
                {renderOptions()}
            </Select>
            <FormHelperText>{message}</FormHelperText>
        </FormControl>
    )
}