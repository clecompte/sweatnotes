import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Footer from './Footer';
import Landing from './Landing';
import ExercisesOverview from './exercises/ExercisesOverview';
import ExerciseNew from './exercises/ExerciseNew';
import ExercisesAll from './exercises/ExercisesAll';
import ExerciseView from './exercises/ExerciseView';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path="/" component={Landing} />
          <Route exact path="/exercises" component={ExercisesOverview} />
          <Route path="/exercises/new" component={ExerciseNew} />
          <Route exact path="/exercises/all" component={ExercisesAll} />
          <Route exact path="/exercise/:id" component={ExerciseView} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
};

export default connect(null, actions)(App);
