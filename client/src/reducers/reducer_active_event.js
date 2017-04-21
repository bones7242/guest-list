import { EVENT_SELECTED } from "../actions/index";
import { REFRESH_ACTIVE_EVENT } from "../actions/index";
import { CLEAR_ACTIVE_EVENT } from "../actions/index";
import { ON_CHANGE_SEARCH_TERM } from "../actions/index";

const initialState = {
    activeEvent: {},
    searchTerm: ''
}

// This function produces the value of our state.
// note: the 'state' argument is not application state, only the state this reducer is responsible for.
export default function(state = null, action) {  
    switch(action.type) {
        case EVENT_SELECTED:
            return action.payload;
            break;
        case REFRESH_ACTIVE_EVENT:
            return action.payload.data.event;
            break;
        case CLEAR_ACTIVE_EVENT:
            return action.payload;
            break;
        case ON_CHANGE_SEARCH_TERM:
            return Object.assign(
                {},
                state,
                {
                    searchTerm: action.payload.term
                }
            );
            break;
    };
    return state;
}