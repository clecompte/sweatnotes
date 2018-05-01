import axios from 'axios';
import { FETCH_USER, FETCH_EXERCISES } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');

  dispatch({ type: FETCH_USER, payload: res.data });
};

export const submitExercise = (values, history) => async dispatch => {
  const res = await axios.post('/api/exercises', values);

  history.push('/exercises');
  dispatch({ type: FETCH_USER, payload: res.data });
}

export const fetchExercises = () => async dispatch => {
  const res = await axios.get('/api/exercises');

  dispatch({ type: FETCH_EXERCISES, payload: res.data });
}