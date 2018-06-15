import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Link } from 'react-router-dom';
import ExerciseField from './ExerciseField';
import { exerciseFields } from './formFields';
import { renderSets } from './renderSets';

const fieldLabel = (label, example) => {
  return <label>{label} <small>{example}</small></label>
}

class ExerciseForm extends Component {
  renderFields() {
    return _.map(exerciseFields, ({ label, name, example }) => {
      return <Field key={name} component={ExerciseField} type="text" label={fieldLabel(label, example)} name={name} />;
    });
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onExerciseSubmit)}>
        {this.renderFields()}
        <FieldArray name="sets" component={renderSets} />

        <div className="btn-group m_spaced">
          <button type="submit" className="btn btn-action">
            Next
          </button>
          <Link to="/exercises" className="btn btn-danger">
            Cancel
          </Link>
        </div>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(exerciseFields, ({ name }) => {
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