import Validator from 'validator'
import isEmpty from 'lodash/isEmpty'

export default function validateInput(data) {
    let errors = {};

    if (Validator.isEmpty(data.email)) {
        errors.email = 'Field is required'
    }
    if (Validator.isEmpty(data.username)) {
        errors.username = 'Field is required'
    }
    if (!Validator.isEmail(data.email)) {
        errors.email = 'Incorrect Email'
    }
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Field is required'
    }
    if (Validator.isEmpty(data.passwordConfirm)) {
        errors.passwordConfirm = 'Field is required'
    }
    if (!Validator.equals(data.password, data.passwordConfirm)) {
        errors.passwordConfirm = "Must match"
    }
    if (Validator.isEmpty(data.timezone)) {
        errors.timezone = 'Field is required'
    }
    return {
        errors,
        isValid: isEmpty(errors)
    }
}
