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

    return getExercise.map((exercise, exerciseId) => {
      return (
        <div key={exercise._id} className="exercise">
          <h1>{exercise.exerciseName}</h1>

          <div className="container m_content">

            <div className="exercise-details">
              <div className="exercise-details-name">
                <span>Exercise Name</span>
                {this.state.showEditFields ? this.showField(exercise.exerciseName, 'newExerciseTitle') : exercise.exerciseName}
              </div>
              <div className="exercise-details-type">
                <span>Exercise Type</span>
                {this.state.showEditFields ? this.showField(exercise.exerciseType, 'newExerciseType') : exercise.exerciseType}
              </div>

              <div className="btn-group m_inline">
                {this.state.showEditFields &&
                  <button
                    className="btn btn-action"
                    onClick={
                      () => this.props.editExercise(
                        exercise._id, (this.state.newExerciseTitle || exercise.exerciseName),
                        (this.state.newExerciseType || exercise.exerciseType),
                        () => this.setState({ showEditFields: false })
                      )
                    }
                  >
                    Update
                  </button>
                }
                {!this.state.showEditFields &&
                  <button className="btn btn-neutral" onClick={() => this.setState({ showEditFields: true })}>Edit</button>
                }
                <button className="btn btn-mute" onClick={() => this.setState({ showEditFields: false })}>Cancel</button>
              </div>
            </div>


            <SetList exercise={exercise} exerciseId={exerciseId} />
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