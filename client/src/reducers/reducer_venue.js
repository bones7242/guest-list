import { FETCH_VENUE } from '../actions/index';

export default function (state = null, action) {
  switch (action.type) {
    case FETCH_VENUE:
      return action.payload.data.venue;
    default:
      break;
  }
  return state;
}
