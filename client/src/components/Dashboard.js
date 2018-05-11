import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <div>
        <Link to="/exercises">
          View Exercises
        </Link>
        <Link to="/exercises/new">
          Add Exercise
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;