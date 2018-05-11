import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchExercises, updateSet, deleteExercise } from '../../actions';

class ExercisesAll extends Component {
  componentDidMount() {
    this.props.fetchExercises();
  }

  renderExercises() {
    return this.props.exercises.map((exercise, exerciseId) => {
      return (
        <ul key={exercise._id}>
          <h4>Exercise</h4>
          <button onClick={() => this.props.deleteExercise(exercise._id)}>Delete</button>
          <li>Exercise Name: {exercise.exerciseName}</li>
          <li>Exercise Type: {exercise.exerciseType}</li>
          <h5><strong>Sets</strong></h5>
          {exercise.sets.map((set, setId) =>
            set === null ? '' : (
              <div key={setId}>
                <hr />
                <h6><strong>Set #{setId}</strong></h6>
                <p>
                  <strong>Quantity:</strong> {set.quantity} {exercise.quantityUnit}
                  <button onClick={() => this.props.updateSet('increase', exercise, set, exerciseId, setId)}>Increase</button>
                  <button onClick={() => this.props.updateSet('decrease', exercise, set, exerciseId, setId)}>Decrease</button>
                </p>
                <p><strong>Exertion:</strong> {set.exertion} {exercise.exertionUnit}</p>
              </div>
            )
          )}

        </ul>
      );
    })
  }

  render() {
    return (
      <div>
        <h1>Exercises</h1>
        <Link to="/exercises">
          Go Back
        </Link>
        {this.renderExercises()}
      </div>
    )
  }
}

function mapStateToProps({ exercises }) {
  return { exercises };
}

export default connect(mapStateToProps, { fetchExercises, updateSet, deleteExercise })(ExercisesAll);