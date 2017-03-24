import axios from "axios";

export const FETCH_VENUE = "FETCH_VENUE";
export const FETCH_EVENTS = "FETCH_EVENTS";
export const EVENT_SELECTED = "EVENT_SELECTED";
export const REFRESH_ACTIVE_EVENT = "REFRESH_ACTIVE_EVENT";
export const ON_CHANGE_SEARCH_TERM = "ON_CHANGE_SEARCH_TERM";

// this method gets all data for a venue based on user Id (must be the owner)
export function fetchVenue(userId, authToken){
    
    const url = `/api/venue/${userId}`;
    const config = {
        headers: {"Authorization": `bearer ${authToken}`}
    };
    const request = axios.get(url, config);

    //console.log("fetchVenue request:", url, config)

    return {
        type: FETCH_VENUE,
        payload: request
    }

}

// this method gets all event data for a venue based on venue id
export function fetchEvents(venueId, authToken){
    
    const url = `/api/event/all/${venueId}`;
    const config = {
        headers: {"Authorization": `bearer ${authToken}`}
    };
    const request = axios.get(url, config);

    //console.log("fetchEvents request:", url, config)

    return {
        type: FETCH_EVENTS,
        payload: request
    }

}

// this method gets all data for an event based on an event id
export function refreshActiveEvent(eventId, authToken){
    
    const url = `/api/event/one/${eventId}`;
    const config = {
        headers: {"Authorization": `bearer ${authToken}`}
    };
    const request = axios.get(url, config);

    //console.log("refreshActiveEvent request:", url, config)

    return {
        type: REFRESH_ACTIVE_EVENT,
        payload: request
    }

}

// this method changes which of the events is the "active" event 
export function selectEvent(event) {
    // selectEvent is an ActionCreator, it needs to return an action, which is a plain js object with a type property and a payload (a piece of data).
    return {
        type: EVENT_SELECTED,
        payload: event
    };
}

export function onChangeSearchTerm(term) {
    return {
        type: ON_CHANGE_SEARCH_TERM,
        payload: {
            term: term
        }
    }
}