import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions/index';

class PostsNew extends Component {

    renderField(field) {
        const className = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`;

        return (
            <div className={{className}}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                {/* the error message will show only if the field box has been touched */}
                <div className="text-help">
                    {field.meta.touched ? field.meta.error : ''}</div>
            </div>
        );
    }

    onSubmit(values) {
        // console.log(values);
        this.props.createPost(values, () => {
            this.props.history.push('/'); // navigate with callback func to posts list page
        });
    }

    render() {
        const { handleSubmit } = this.props;
        return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title"
                    name="title"
                    component={this.renderField}
                />
                <Field
                    label="Categories"
                    name="categories"
                    component={this.renderField}
                />
                <Field
                    label="Post Content"
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        )
    }
}

function validate(values) {

    const errors = {}

    if (!values.title || values.title.length <= 3) {
        errors.title = 'please enter a title';
    }
    if (!values.categories) {
        errors.categories = 'please enter some categories';
    }
    if (!values.content) {
        errors.content = 'please enter a content';
    }

    // if errors array is empty, the form is fine to submit
    // if errors has ANY properties, redux form assumes form is invalid
    return errors;
}

// redux util similar to connect
export default reduxForm({
    validate: validate,
    form: 'PostsNewForm'
})(
   connect(null, { createPost })(PostsNew)
);