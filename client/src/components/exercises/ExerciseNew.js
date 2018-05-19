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
      <section>
        <header>
          <h1>New Exercise</h1>
        </header>

        <div className="container m_content">
          {this.renderContent()}
        </div>
      </section>
    );
  }
}

export default reduxForm({
  form: 'exerciseForm'
})(ExerciseNew);