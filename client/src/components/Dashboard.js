import React from 'react';
import { Link } from 'react-router-dom';
import ExerciseList from './exercises/ExerciseList';

const Dashboard = () => {
  return (
    <div>
      <ExerciseList />
      <div>
        <Link to="/exercises/new">
          Add Exercise
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;