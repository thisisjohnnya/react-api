import React from 'react';
import timezones from '../../data/timezones'
import map from 'lodash/map'
import classnames from 'classnames'

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
    onSubmit(e) {
        this.setState({ errors: {}, isLoading: true });
        e.preventDefault();
        this.props.userSignupRequest(this.state).then(
            () => {},
            ({response})=>{this.setState({errors:response.data, isLoading: false})}
        );﻿
        console.log(this.state);
    }
    render() {
        const { errors } = this.state;
        const options = map(timezones, (val, key) =>
            <option key={val} value={val}>{key}</option>
        )
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Join our Community!</h1>
                <div className={classnames("form-group",{ 'has-error' : errors.username })}>
                    <label className="control-label">Username</label>
                    <input
                        value={this.state.username}
                        onChange={this.onChange}
                        type="text"
                        name="username"
                        className="form-control"
                    />
                    {errors.username && <span className="help-block">{errors.username}</span>}
                </div>
                <div className={classnames("form-group",{ 'has-error' : errors.email })}>
                    <label className="control-label">Email</label>
                    <input
                        value={this.state.email}
                        onChange={this.onChange}
                        type="text"
                        name="email"
                        className="form-control"
                    />
                    {errors.email && <span className="help-block">{errors.email}</span>}
                </div>
                <div className={classnames("form-group",{ 'has-error' : errors.password })}>
                    <label className="control-label">Password</label>
                    <input
                        value={this.state.password}
                        onChange={this.onChange}
                        type="password"
                        name="password"
                        className="form-control"
                    />
                    {errors.password && <span className="help-block">{errors.password}</span>}
                </div>
                <div className={classnames("form-group",{ 'has-error' : errors.passwordConfirm })}>
                    <label className="control-label">Password Confirm</label>
                    <input
                        value={this.state.passwordConfirm}
                        onChange={this.onChange}
                        type="password"
                        name="passwordConfirm"
                        className="form-control"
                    />
                    {errors.passwordConfirm && <span className="help-block">{errors.passwordConfirm}</span>}
                </div>
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
