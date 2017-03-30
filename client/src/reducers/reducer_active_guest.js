import { REFRESH_ACTIVE_GUEST } from "../actions/index";
import { CLEAR_ACTIVE_GUEST } from "../actions/index";

// the 'state' argument is not application state, 
// only the state this reducer is responsible for.

export default function(state = null, action) {
    switch(action.type) {
        case REFRESH_ACTIVE_GUEST:
            return action.payload.data;
            break;
        case CLEAR_ACTIVE_GUEST:
            return action.payload;
            break;
    }

    return state;
}