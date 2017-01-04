import React from 'react';
import timezones from '../../data/timezones';
import map from 'lodash/map';
import classnames from 'classnames';
import validateInput from '../../../server/shared/validations/signup';
import InputFields from '../common/InputFields'

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            passwordConfirm: '',
            timezone: '',
            errors: {},
            isLoading: false,
            invalid: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.checkUserExists = this.checkUserExists.bind(this);
    }
    onChange(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    isValid() {
        const { errors, isValid } = validateInput(this.state);

        if (!isValid) {
            this.setState({ errors });
        }

        return isValid;
    }
    onSubmit(e) {
        e.preventDefault();

        if (this.isValid()){
            this.setState({ errors: {}, isLoading: true });
            this.props.userSignupRequest(this.state).then(
                () => {
                    this.props.addFlashMessage({
                        type: 'success',
                        text: 'You signed up successfully'
                    });
                    this.context.router.push('/');
                },
                ({response})=>{this.setState({errors:response.data, isLoading: false})}
            );﻿
        }
    }

    checkUserExists(e) {
        const field = e.target.name;
        const val = e.target.value;
        if (val !== '') {
            this.props.isUserExists(val).then(res => {
                let errors = this.state.errors;
                let invalid;
                if (res.data.user) {
                    errors[field] = field + ' already exists';
                    invalid = true
                } else {
                    errors[field] = ''
                    invalid = false
                }
                this.setState({ errors, invalid })
            });
        }
    }
    render() {
        const { errors } = this.state;
        const options = map(timezones, (val, key) =>
            <option key={val} value={val}>{key}</option>
        )
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Join our Community!</h1>
                <InputFields
                    error={errors.username}
                    label="Username"
                    onChange={this.onChange}
                    checkUserExists={this.checkUserExists}
                    value={this.state.username}
                    field="username"
                />
                <InputFields
                    error={errors.email}
                    label="Email"
                    onChange={this.onChange}
                    checkUserExists={this.checkUserExists}
                    value={this.state.email}
                    field="email"
                />
                <InputFields
                    error={errors.password}
                    label="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                    type="password"
                    field="password"
                />
                <InputFields
                    error={errors.passwordConfirm}
                    label="Password Confirmation"
                    onChange={this.onChange}
                    value={this.state.passwordConfirm}
                    type="password"
                    field="passwordConfirm"
                />
                <div className={classnames("form-group",{ 'has-error' : errors.timezone })}>
                    <label className="control-label">Timezone</label>
                    <select
                        value={this.state.timezone}
                        onChange={this.onChange}
                        name="timezone"
                        className="form-control"
                    >
                        <option value="" disabled>Choose Your Timezone</option>
                        {options}
                    </select>
                    {errors.timezone && <span className="help-block">{errors.timezone}</span>}
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-lg" disabled={this.state.isLoading || this.state.invalid}>Sign Up</button>
                </div>
            </form>
        )
    }
}

SignupForm.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired,
    addFlashMessage: React.PropTypes.func.isRequired,
    isUserExists: React.PropTypes.func.isRequired
}

SignupForm.contextTypes = {
    router: React.PropTypes.object.isRequired
}

export default SignupForm
