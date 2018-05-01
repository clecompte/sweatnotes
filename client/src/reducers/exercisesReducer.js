import { FETCH_EXERCISES } from '../actions/types';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_EXERCISES:
      return action.payload;
    default:
      return state;
  }
}