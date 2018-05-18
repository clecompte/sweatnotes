import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchExercises, deleteExercise } from '../../actions';
import SetList from './SetList';

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
          <li>
            <Link to={`/exercise/${exercise._id}`}>
              Exercise Name: {exercise.exerciseName}
            </Link>
          </li>
          <li>Exercise Type: {exercise.exerciseType}</li>
          <SetList exercise={exercise} exerciseId={exerciseId} />

      
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

export default connect(mapStateToProps, { fetchExercises, deleteExercise })(ExercisesAll);