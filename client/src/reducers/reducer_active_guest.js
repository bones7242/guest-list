import { REFRESH_ACTIVE_GUEST } from "../actions/index";
import { CLEAR_ACTIVE_GUEST } from "../actions/index";

// This function produces the value of our state.
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