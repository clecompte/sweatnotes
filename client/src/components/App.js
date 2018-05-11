import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';
import Exercises from './exercises/Exercises';
import ExerciseNew from './exercises/ExerciseNew';
import ExercisesAll from './exercises/ExercisesAll';
import Dashboard from './Dashboard';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route exact path="/" component={Landing} />
            <Route exact path="/exercises" component={Exercises} />
            <Route path="/exercises/new" component={ExerciseNew} />
            <Route exact path="/exercises/all" component={ExercisesAll} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

export default connect(null, actions)(App);
