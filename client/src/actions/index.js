// load dependencies
import axios from "axios";
// export action types
export const FETCH_VENUE = "FETCH_VENUE";
export const FETCH_EVENTS = "FETCH_EVENTS";
export const EVENT_SELECTED = "EVENT_SELECTED";
export const REFRESH_ACTIVE_EVENT = "REFRESH_ACTIVE_EVENT";
export const CLEAR_ACTIVE_EVENT = "CLEAR_ACTIVE_EVENT";
export const REFRESH_ACTIVE_GUEST = "REFRESH_ACTIVE_GUEST";
export const CLEAR_ACTIVE_GUEST = "CLEAR_ACTIVE_GUEST";
export const ON_CHANGE_SEARCH_TERM = "ON_CHANGE_SEARCH_TERM";

/* Define the ActionCreators, which will return an action (i.e. a plain js object with a type property and a payload) */

// this method gets all data for a venue based on user Id (must be the owner)
export function fetchVenue(userId, authToken){
    const url = `/api/venue/${userId}`;
    const config = {
        headers: {"Authorization": `bearer ${authToken}`}
    };
    const request = axios.get(url, config);
    return {
        type: FETCH_VENUE,
        payload: request
    };
}
// this method gets all event data for a venue based on venue id
export function fetchEvents(venueId, authToken){
    const url = `/api/event/all/${venueId}`;
    const config = {
        headers: {"Authorization": `bearer ${authToken}`}
    };
    const request = axios.get(url, config);
    return {
        type: FETCH_EVENTS,
        payload: request
    };
}
// this method changes which of the events is the "active" event 
export function selectEvent(event) {
    return {
        type: EVENT_SELECTED,
        payload: event
    };
}

// this method gets all data for an event based on an event id
export function refreshActiveEvent(event_id, authToken){
    const url = `/api/event/one/${event_id}`;
    const config = {
        headers: {"Authorization": `bearer ${authToken}`}
    };
    const request = axios.get(url, config);
    return {
        type: REFRESH_ACTIVE_EVENT,
        payload: request
    };
}
// this method gets all data for an event based on an event id
export function clearActiveEvent(){
    return {
        type: CLEAR_ACTIVE_EVENT,
        payload: null
    };
}
// this method gets all data for an event based on an event id
export function refreshActiveGuest(guest_id, authToken){
    const url = `/api/guest/one/${guest_id}`;
    const config = {
        headers: {"Authorization": `bearer ${authToken}`}
    };
    const request = axios.get(url, config);
    return {
        type: REFRESH_ACTIVE_GUEST,
        payload: request
    };
}
// this method gets all data for an event based on an event id
export function clearActiveGuest(){
    return {
        type: CLEAR_ACTIVE_GUEST,
        payload: null
    };
}
// this method updates the search term
export function onChangeSearchTerm(term) {
    return {
        type: ON_CHANGE_SEARCH_TERM,
        payload: {
            term: term
        }
    };
}