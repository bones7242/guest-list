import { combineReducers } from "redux";
import EventsReducer from "./reducer_events";
import ActiveEvent from "./reducer_active_event";

// Reducers are functions that return a piece of the application's state.
// This file combines all the pieces of into one whole.

const rootReducer = combineReducers({
    events: EventsReducer,
    activeEvent: ActiveEvent
});

export default rootReducer;