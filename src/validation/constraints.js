
const validate = (condition, message) => {
    return condition ? null : message
}

export const NotBlank = (message = 'Wartość nie może być pusta') => {
    return val => validate(val.trim().length > 0, message)
}

export const Numeric = (message = 'Wartość może zawierać tylko cyfry i znak minus na początku') => {
    return (val) => {
        const regex = new RegExp('^-?[0-9]*$')
        return validate(regex.test(val), message)
    }
}