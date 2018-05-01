import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const ExerciseFormReview = ({ onCancel, formValues, submitExercise, history }) => {
  const reviewFields = _.map(formFields, ({ name, label }) => {
    return (
      <div key={name}>
        <label>{label}</label>
        <div>
          {formValues[name]}
        </div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm your entries</h5>
      {reviewFields}
      <button onClick={onCancel}>
        Back
      </button>
      <button onClick={() => submitExercise(formValues, history)}>
        Submit
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.exerciseForm.values }
}

export default connect(mapStateToProps, actions)(withRouter(ExerciseFormReview));