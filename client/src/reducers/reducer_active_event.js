import { EVENT_SELECTED } from "../actions/index";
import { REFRESH_ACTIVE_EVENT } from "../actions/index";

// the 'state' argument is not application state, only the state this reducer is responsible for.
export default function(state = null, action) {
    switch(action.type) {
        case EVENT_SELECTED:
            return action.payload;
            break;
        case REFRESH_ACTIVE_EVENT:
            return action.payload.data.event;
            break;
    }

    return state;
}