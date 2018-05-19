import axios from 'axios';
import { FETCH_USER, FETCH_EXERCISES, VIEW_EXERCISE, UPDATE_EXERCISE, DELETE_EXERCISE, DUPLICATE_EXERCISE, EDIT_EXERCISE } from './types';

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

export const viewExercise = (id) => async dispatch => {
  const res = await axios.get(`/api/exercise/${id}`);
  dispatch({ type: VIEW_EXERCISE, payload: res.data });
}

export const updateSet = (direction, exercise, set, exerciseId, setId) => async dispatch => {
  const res = await axios.put('/api/exercises', {direction, exercise, set});
  dispatch({
    type: UPDATE_EXERCISE,
    exerciseId,
    setId,
    payload: res.data
  });
}

export const deleteExercise = (id) => async dispatch => {
  const res = await axios.delete(`/api/exercises/${id}`);
  dispatch({ type: DELETE_EXERCISE, payload: res.data });
}

export const duplicateExercise = (id) => async dispatch => {
  const res = await axios.post(`/api/exercises/duplicate/${id}`);
  dispatch({ type: DUPLICATE_EXERCISE, payload: res.data });
}

export const editExercise = (id, newExerciseTitle, newExerciseType, callback) => async dispatch => {
  const res = await axios.put(`/api/exercises/${id}`, {newExerciseTitle, newExerciseType});
  dispatch({ type: EDIT_EXERCISE, payload: res.data });
  callback();
}