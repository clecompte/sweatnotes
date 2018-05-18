import _ from 'lodash';
import update from 'immutability-helper';
import { FETCH_EXERCISES, UPDATE_EXERCISE, DELETE_EXERCISE, DUPLICATE_EXERCISE, VIEW_EXERCISE } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_EXERCISES:
      return action.payload;
    case UPDATE_EXERCISE:
      let updatedExertion = action.payload.sets[action.setId];
      let exerciseId = action.exerciseId;
      let setId = action.setId;

      return update(state, {
        [exerciseId]: {
          sets: {
            [setId]: {
              $set: updatedExertion
            }
          }
        }
      });
    case DELETE_EXERCISE:
      const exerciseTargetId = action.payload._id;
      return _.filter(state, exercise => exercise._id !== exerciseTargetId);
    case DUPLICATE_EXERCISE:
      return _.concat(state, action.payload);
    case VIEW_EXERCISE:
      return action.payload;
    default:
      return state;
  }
}