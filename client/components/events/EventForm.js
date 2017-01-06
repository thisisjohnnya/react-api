import React from 'react'
import InputFields from '../common/InputFields'
import { connect } from 'react-redux'
import { createEvent } from '../../actions/eventActions'


class EventForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            errors: {},
            isLoading: false
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });

    }
    onSubmit(e) {
        e.preventDefault();
        this.props.createEvent(this.state);
    }

    render() {
        const { errors, title, isLoading} = this.state;
        return (
            <form onSubmit={this.onSubmit}>
                <h1>Title</h1>
                <InputFields
                    name="title"
                    field="title"
                    label="Event Title"
                    value={title}
                    error={errors.title}
                    onChange={this.onChange}
                    />
                <button className="btn btn-primary btn-lg" type="submit">Create</button>
            </form>
        )
    }
}

EventForm.propTypes = {
    createEvent: React.PropTypes.func.isRequired
}

export default connect(null, { createEvent })(EventForm);
