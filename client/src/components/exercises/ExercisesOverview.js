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
        <div className="exercises-box" key={exercise._id}>
          <span className="exercises-box-type">{exercise.exerciseType}</span>
          <Link to={`/exercise/${exercise._id}`}>
            <span className={"exercises-box-icon m_" + exercise.exerciseType.toLowerCase()} ></span>
          </Link>
          <h2 className="exercises-box-name">
            <Link to={`/exercise/${exercise._id}`}>{exercise.exerciseName}</Link>
          </h2>
          <div className="btn-group">
            <button className="btn btn-neutral" onClick={() => this.props.duplicateExercise(exercise._id)}>Duplicate</button>
            <button className="btn btn-danger" onClick={() => this.props.deleteExercise(exercise._id)}>Delete</button>
          </div>
        </div>
      );
    })
  }

  render() {
    return (
      <section>
        <header>
          <h1>Exercises</h1>
        </header>

        <section className="container m_content">
          <div className="exercises">
            {this.renderExercises()}
          </div>
        </section>
      </section>
    )
  }
}

function mapStateToProps({ exercises }) {
  return { exercises };
}

export default connect(mapStateToProps, { fetchExercises, duplicateExercise, deleteExercise })(ExercisesOverview);