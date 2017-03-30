import { FETCH_VENUE } from "../actions/index";

// This function produces the value of our state.

export default function(state = null, action) {

    switch (action.type) {
        case FETCH_VENUE:
            return action.payload.data.venue;
    }

    return state;
}