import axios from "axios";

export const FETCH_VENUE = "FETCH_VENUE";
export const FETCH_EVENTS = "FETCH_EVENTS";
export const EVENT_SELECTED = "EVENT_SELECTED";

export function fetchVenue(userId, authToken){
    
    const url = `/api/venue/${userId}`;
    const config = {
        headers: {"Authorization": `bearer ${authToken}`}
    };
    const request = axios.get(url, config);

    console.log("fetchVenue request:", url, config)

    return {
        type: FETCH_VENUE,
        payload: request
    }

}

export function fetchEvents(venueId, authToken){
    
    const url = `/api/event/${venueId}`;
    const config = {
        headers: {"Authorization": `bearer ${authToken}`}
    };
    const request = axios.get(url, config);

    console.log("fetchEvents request:", url, config)

    return {
        type: FETCH_EVENTS,
        payload: request
    }

}

export function selectEvent(event) {
    // selectEvent is an ActionCreator, it needs to return an action, which is a plain js object with a type property and a payload (a piece of data).
    return {
        type: EVENT_SELECTED,
        payload: event
    };
}