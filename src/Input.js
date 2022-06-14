import validateLength from './validateLength';

export default function Input({ validate, name, typeValidate }) {
    let validator = () => true;
    if (typeValidate === 'length') {
        validator = (e) => validate(validateLength(e.target.value, 3), e.target.name);
    }
    return (
        <input type="text" name={name} onBlur={validator} />
    )
}