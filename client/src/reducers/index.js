import { combineReducers } from "redux";
import VenueReducer from "./reducer_venue";
import EventsReducer from "./reducer_events";
import ActiveEventReducer from "./reducer_active_event";
import ActiveGuestReducer from "./reducer_active_guest";

// Reducers return a piece of the application's state.
// This file combines all the pieces of into one whole.
const rootReducer = combineReducers({
    venue: VenueReducer,
    events: EventsReducer,
    activeEvent: ActiveEventReducer,
    activeGuest: ActiveGuestReducer
});

export default rootReducer;