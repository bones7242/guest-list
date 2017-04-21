import { FETCH_VENUE } from "../actions/index";
import { FETCH_EVENTS } from "../actions/index";

// This function produces the value of our state.
export default function(state = null, action) {

    switch (action.type) {
        case FETCH_VENUE:
            return action.payload.data.venue.events;
            break;    
        case FETCH_EVENTS:
            return action.payload.data.events;
            break;    
    }

    return state;
}