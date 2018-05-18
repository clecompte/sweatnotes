import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchExercises, duplicateExercise, deleteExercise } from '../../actions';

class ExercisesOverview extends Component {
  componentDidMount() {
    this.props.fetchExercises();
  }

  renderExercises() {
    return this.props.exercises.map((exercise, exerciseId) => {
      return (
        <ul key={exercise._id}>
          <h4>Exercise</h4>
          <button onClick={() => this.props.duplicateExercise(exercise._id)}>Duplicate</button>
          <button onClick={() => this.props.deleteExercise(exercise._id)}>Delete</button>
          <li>
            <Link to={`/exercise/${exercise._id}`}>
              Exercise Name: {exercise.exerciseName}
            </Link>
          </li>
          <li>Exercise Type: {exercise.exerciseType}</li>
        </ul>
      );
    })
  }

  render() {
    return (
      <div>
        <h1>Exercises</h1>
        <Link to="/exercises/new">
          Add Exercises
        </Link>
        <span> | </span>
        <Link to="/exercises/all">
          Expand Exercises
        </Link>
        {this.renderExercises()}
      </div>
    )
  }
}

function mapStateToProps({ exercises }) {
  return { exercises };
}

export default connect(mapStateToProps, { fetchExercises, duplicateExercise, deleteExercise })(ExercisesOverview);