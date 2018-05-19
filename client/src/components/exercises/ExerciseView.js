import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { viewExercise, editExercise } from '../../actions';
import SetList from './SetList';

class ExerciseView extends Component {
  state = {
    showEditFields: false,
    newExerciseTitle: "",
    newExerciseType: ""
  };
  
  componentDidMount() {
    this.props.viewExercise(this.props.match.params.id);
  }

  componentDidUpdate() {
    this.props.viewExercise(this.props.match.params.id);
  }

  showField(field, updatedField) {
    return (
      <div>
        <input defaultValue={field} onChange={event => this.setState({ [updatedField]: event.target.value }) } />
      </div>
    )
  }

  renderExercise() {
    const getExercise = this.props.exercises.filter(exercise => exercise._id === this.props.match.params.id);

    console.log(getExercise);

    return getExercise.map((exercise, exerciseId) => {
      return (
        <div key={exercise._id}>
          <h1>{exercise.exerciseName}</h1>
          <button onClick={() => this.setState({ showEditFields: true })}>
            Edit
            </button>
          <li>
            Exercise Name: {this.state.showEditFields ? this.showField(exercise.exerciseName, 'newExerciseTitle') : exercise.exerciseName}
          </li>
          <li>
            Exercise Type: {this.state.showEditFields ? this.showField(exercise.exerciseType, 'newExerciseType') : exercise.exerciseType}
          </li>
          {this.state.showEditFields &&
            <button onClick={
              () => this.props.editExercise(
                exercise._id, (this.state.newExerciseTitle || exercise.exerciseName),
                (this.state.newExerciseType || exercise.exerciseType),
                () => this.setState({ showEditFields: false })
              )
            }>
              Update
            </button>
          }
          <h5><strong>Sets</strong></h5>
          <SetList exercise={exercise} exerciseId={exerciseId} />
        </div>
      );
    })
  }

  render() {
    return (
      <div>
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

export default connect(mapStateToProps, { viewExercise, editExercise })(ExerciseView);