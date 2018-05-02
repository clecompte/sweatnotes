import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Link } from 'react-router-dom';
import ExerciseField from './ExerciseField';
import { exerciseFields, setFields } from './formFields';

const renderSets = ({ fields, meta: { touched, error } }) => (
  <div>
    <button type="button" onClick={() => fields.push({})}>
      Add Set
    </button>
    {touched && error && <span>{error}</span>}

    {fields.map((set, index) => (
      <div key={index}>
        <button
          type="button"
          title="Remove Member"
          onClick={() => fields.remove(index)}
        />
        <h4>Set #{index + 1}</h4>
        {_.map(setFields, ({ label, name }) => {
          return <Field key={name} component={ExerciseField} type="text" label={label} name={`${set}.${name}`} />
        })}
      </div>
    ))}
  </div>
);

class ExerciseForm extends Component {
  renderFields() {
    return _.map(exerciseFields, ({ label, name }) => {
      return <Field key={name} component={ExerciseField} type="text" label={label} name={name} />;
    });
  }

  render() {
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onExerciseSubmit)}>
        {this.renderFields()}
        <FieldArray name="sets" component={renderSets} />

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