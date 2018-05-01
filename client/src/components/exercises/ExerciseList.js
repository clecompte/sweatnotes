import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchExercises } from '../../actions';

class ExerciseList extends Component {
  componentDidMount() {
    this.props.fetchExercises();
  }

  renderExercises() {
    return this.props.exercises.map(exercise => {
      return (
        <div key={exercise._id}>
          {exercise.exercise_name}
        </div>
      );
    })
  }

  render() {
    return (
      <div>
        test:
        {this.renderExercises()}
      </div>
    )
  }
}

function mapStateToProps({ exercises }) {
  return { exercises };
}

export default connect(mapStateToProps, { fetchExercises })(ExerciseList);