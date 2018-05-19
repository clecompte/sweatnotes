import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field, FieldArray } from 'redux-form';
import { Link } from 'react-router-dom';
import ExerciseField from './ExerciseField';
import { exerciseFields, setFields } from './formFields';

const renderSets = ({ fields, meta: { touched, error } }) => (
  <div>
    {touched && error && <span>{error}</span>}

    {fields.map((set, index) => (
      <div key={index} className="form_set">
        <h3>Set #{index + 1}</h3>

        {_.map(setFields, ({ label, name }) => {
          return <Field key={name} component={ExerciseField} type="text" label={label} name={`${set}.${name}`} />
        })}

        <button className="btn btn-mute" type="button" onClick={() => fields.remove(index)}>Remove Set</button>
      </div>
    ))}

    <button className="btn btn-neutral" type="button" onClick={() => fields.push({})}>Add Set</button>
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