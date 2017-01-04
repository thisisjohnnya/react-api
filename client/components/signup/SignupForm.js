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
            isLoading: false
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
                () => {},
                ({response})=>{this.setState({errors:response.data, isLoading: false})}
            );﻿
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
                    value={this.state.username}
                    field="username"
                />
                <InputFields
                    error={errors.email}
                    label="Email"
                    onChange={this.onChange}
                    value={this.state.email}
                    field="email"
                />
                <InputFields
                    error={errors.password}
                    label="Password"
                    onChange={this.onChange}
                    value={this.state.password}
                    field="password"
                />
                <InputFields
                    error={errors.passwordConfirm}
                    label="Password Confirmation"
                    onChange={this.onChange}
                    value={this.state.passwordConfirm}
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
                    <button className="btn btn-primary btn-lg" disabled={this.state.isLoading}>Sign Up</button>
                </div>
            </form>
        )
    }
}

SignupForm.propTypes = {
    userSignupRequest: React.PropTypes.func.isRequired
}

export default SignupForm
