import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import ExerciseField from './ExerciseField';
import formFields from './formFields';

class ExerciseForm extends Component {
  renderFields() {
    return _.map(formFields, ({ label, name }) => {
      return <Field key={name} component={ExerciseField} type="text" label={label} name={name} />;
    });
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onExerciseSubmit)}>
        {this.renderFields()}

        <Link to="/exercises">
          Cancel
        </Link>

        <button type="submit">
          Next
        </button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(formFields, ({ name }) => {
    if (!values[name]) {
      errors[name] = "You must enter a value";
    }
  });

  return errors;
}

export default reduxForm({
  validate,
  form: 'exerciseForm',
  destroyOnUnmount: false
})(ExerciseForm);