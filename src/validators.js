const validators = {
    length(value, length = 0) {
        return value.length > length;
    },
    numbers (value) {
        const reg = new RegExp('^[0-9]*$');
        return reg.test(value);
    },
    name (value) {
        return (value.length > 2 && value.length < 11);
    },
    cardNumber (value) {
        const reg = new RegExp('^[0-9]*$');
        return (reg.test(value) && value.length === 16);
    },
    cvv (value) {
        const reg = new RegExp('^[0-9]*$');
        return (reg.test(value) && value.length === 3);
    },
    selected (value) {
      return (value !== '')
    }
}

export default validators;