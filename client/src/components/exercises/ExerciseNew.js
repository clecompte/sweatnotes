import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import ExerciseForm from './ExerciseForm';
import ExerciseFormReview from './ExerciseFormReview';

class ExerciseNew extends Component {
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return <ExerciseFormReview onCancel={() => this.setState({ showFormReview: false })} />;
    }

    return <ExerciseForm onExerciseSubmit={() => this.setState({ showFormReview: true })} />
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    );
  }
}

export default reduxForm({
  form: 'exerciseForm'
})(ExerciseNew);