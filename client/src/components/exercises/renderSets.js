import _ from 'lodash';
import React from 'react';
import { Field } from 'redux-form';
import ExerciseField from './ExerciseField';
import { setFields } from './formFields';

const setLabel = (label, example) => {
  return <label>{label} <small>{example}</small></label>
}

export const renderSets = ({ fields, meta: { touched, error } }) => (
  <div>
    {touched && error && <span>{error}</span>}

    {fields.map((set, index) => (
      <div key={index} className="form_set">
        <h3>Set #{index + 1}</h3>

        {_.map(setFields, ({ label, name, example }) => {
          return <Field key={name} component={ExerciseField} type="text" label={setLabel(label, example)} name={`${set}.${name}`} />
        })}

        <button className="btn btn-mute" type="button" onClick={() => fields.remove(index)}>Remove Set</button>
      </div>
    ))}

    <button className="btn btn-neutral" type="button" onClick={() => fields.push({})}>Add Set</button>
  </div>
);
