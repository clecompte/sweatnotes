import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { exerciseFields } from './formFields';
import { withRouter } from 'react-router-dom';
import * as actions from '../../actions';

const ExerciseFormReview = ({ onCancel, formValues, submitExercise, history }) => {
  const reviewExerciseFields = _.map(exerciseFields, ({ name, label }) => {
    return (
      <div key={name} className="review-exercise">
        <label className="review-exercise-label">{label}</label>
        <p className="review-exercise-data">
          {formValues[name]}
        </p>
      </div>
    );
  });

  return (
    <div className="review">
      <h3>New Exercise Details</h3>
      {reviewExerciseFields}

      <h3>Sets</h3>
      {formValues.sets.map((set, index) => (
        <div key={index} className="review-set">
          <p className="review-set-number">Set {index + 1}</p>
          <p className="review-set-quantity"><strong>Quantity:</strong> {set.quantity}</p>
          <p className="review-set-exertion"><strong>Exertion:</strong> {set.exertion}</p>
        </div>
      ))}

      <div className="btn-group m_inline">
        <button className="btn btn-neutral" onClick={onCancel}>Back</button>
        <button className="btn btn-action" onClick={() => submitExercise(formValues, history)}>Submit</button>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return { formValues: state.form.exerciseForm.values }
}

export default connect(mapStateToProps, actions)(withRouter(ExerciseFormReview));