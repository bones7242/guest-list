import { FETCH_VENUE } from "../actions/index";
import { FETCH_EVENTS } from "../actions/index";

// This function the producers the value of our state.
// in our case the value of our state will be an array of events.

export default function(state = null, action) {
    console.log("Action received", action);

    switch (action.type) {
        case FETCH_VENUE:
            return action.payload.data.venue.events;
            break;    
        case FETCH_EVENTS:
            return action.payload.data.message;
            break;    
    }

    return state;
}