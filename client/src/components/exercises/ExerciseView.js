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

  showField(field, updatedField) {
    return (
      <div>
        <input defaultValue={field} onChange={event => this.setState({ [updatedField]: event.target.value }) } />
      </div>
    )
  }

  renderExercise() {
    const getExercise = this.props.exercises.filter(exercise => exercise._id === this.props.match.params.id);

    return getExercise.map((exercise, exerciseId) => {
      return (
        <div key={exercise._id} className="exercise">
          <h1>{exercise.exerciseName}</h1>

          <div className="container m_content">
            <SetList exercise={exercise} exerciseId={exerciseId} />

            <h3>Exercise Details</h3>
            <div className="exercise-details">
              <div className="exercise-details-name">
                <span>Exercise Name</span>
                {this.state.showEditFields ? this.showField(exercise.exerciseName, 'newExerciseTitle') : exercise.exerciseName}
              </div>
              <div className="exercise-details-type">
                <span>Exercise Type</span>
                {this.state.showEditFields ? this.showField(exercise.exerciseType, 'newExerciseType') : exercise.exerciseType}
              </div>
            </div>

            {this.state.showEditFields &&
              <div className="btn-group m_inline">
                <button
                  className="btn btn-action"
                  onClick={
                    () => this.props.editExercise(
                      exercise._id,
                      (this.state.newExerciseTitle || exercise.exerciseName),
                      (this.state.newExerciseType || exercise.exerciseType),
                      () => {
                        this.setState({ showEditFields: false });
                        this.props.viewExercise(this.props.match.params.id);
                      }
                    )
                  }
                >
                  Update
                  </button>
                <button className="btn btn-mute" onClick={() => this.setState({ showEditFields: false })}>Cancel</button>
              </div>
            }
            {!this.state.showEditFields &&
              <button className="btn btn-neutral" onClick={() => this.setState({ showEditFields: true })}>Edit</button>
            }
          </div>
        </div>
      );
    })
  }

  render() {
    return (
      <div>
        {this.renderExercise()}
        <Link to="/exercises" className="btn-back">Go Back</Link>
      </div>
    )
  }
}

function mapStateToProps({ exercises }) {
  return { exercises };
}

export default connect(mapStateToProps, { viewExercise, editExercise })(ExerciseView);