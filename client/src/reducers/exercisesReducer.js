import _ from 'lodash';
import update from 'immutability-helper';
import { FETCH_EXERCISES, UPDATE_EXERCISE, DELETE_EXERCISE, DUPLICATE_EXERCISE } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_EXERCISES:
      return action.payload;
    case UPDATE_EXERCISE:
      const updatedExertion = action.payload.sets[action.setId];
      return update(state, {
          [action.exerciseId]: {
            sets: {
              [action.setId]: {
                $set: updatedExertion
              }
            }
          }
       });
    case DELETE_EXERCISE:
      const exerciseTargetId = action.payload._id;
      return _.filter(state, exercise => exercise._id !== exerciseTargetId);
    case DUPLICATE_EXERCISE:
       console.log(action.payload);
    default:
      return state;
  }
}