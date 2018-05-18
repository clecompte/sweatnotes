import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { viewExercise } from '../../actions';
import SetList from './SetList';

class ExerciseView extends Component {
  state = { showEditFields: false };
  
  componentDidMount() {
    const { match: { params } } = this.props;
    this.props.viewExercise(params.id);
  }

  showField(field) {
    return (
      <div>
        <input value={field} />
      </div>
    )
  }

  renderExercise() {
    const getExercise = this.props.exercises.filter(exercise => exercise._id === this.props.match.params.id);

    return getExercise.map((exercise, exerciseId) => {
      return (
        <ul key={exercise._id}>
          <h4>Exercise</h4>
          <button onClick={() => this.setState({ showEditFields: true })}>
            Edit
            </button>
          <li>
            Exercise Name: {this.state.showEditFields ? this.showField(exercise.exerciseName) : exercise.exerciseName}
          </li>
          <li>
            Exercise Type: {this.state.showEditFields ? this.showField(exercise.exerciseType) : exercise.exerciseType}
          </li>
          {this.state.showEditFields &&
            <button>
              test
            </button>
          }
          <h5><strong>Sets</strong></h5>
          <SetList exercise={exercise} exerciseId={exerciseId} />
        </ul>
      );
    })
  }

  render() {
    return (
      <div>
        <h1>Exercise</h1>
        <Link to="/exercises">
          Go Back
        </Link>
        {this.renderExercise()}
      </div>
    )
  }
}

function mapStateToProps({ exercises }) {
  return { exercises };
}

export default connect(mapStateToProps, { viewExercise })(ExerciseView);