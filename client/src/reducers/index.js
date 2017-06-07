import { combineReducers } from 'redux';
import VenueReducer from './reducer_venue';
import EventsReducer from './reducer_events';
import ActiveEventReducer from './reducer_active_event';
import ActiveGuestReducer from './reducer_active_guest';

const rootReducer = combineReducers({
  venue: VenueReducer,
  events: EventsReducer,
  activeEvent: ActiveEventReducer,
  activeGuest: ActiveGuestReducer,
});

export default rootReducer;
