import React from 'react';
import classnames from 'classnames'

const InputFields = ({ field, value, label, error, type, onChange}) => {
    return (
        <div className={classnames("form-group",{ 'has-error' : error })}>
            <label className="control-label">{label}</label>
            <input
                value={value}
                onChange={onChange}
                type={type}
                name={field}
                className="form-control"
            />
            {error && <span className="help-block">{error}</span>}
        </div>
    )
}

InputFields.propTypes = {
    field: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired,
    label: React.PropTypes.string.isRequired,
    error: React.PropTypes.string,
    type: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
}

InputFields.defaultProps = {
    type: 'text'
}

export default InputFields
