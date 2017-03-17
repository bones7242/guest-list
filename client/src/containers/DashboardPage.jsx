/*
This is the dashboard page.  After a user logs in successfully, this page will be displayed instead of the home page.
*/

import React from "react";
import Auth from "../modules/Auth";
import Dashboard from "../components/Dashboard.jsx";

class DashboardPage extends React.Component {
    // class constructor
    constructor(props) {
        super(props);

        this.state = {
            venueInfo: {},
            events: [],
            currentEvent: {}
        };

        // pass the "this" context, so we will have access to class members from our event handler methods (createNewEvent, updateEventsList).
        this.createNewEvent = this.createNewEvent.bind(this);
        this.updateEventsList = this.updateEventsList.bind(this);
        this.selectEvent = this.selectEvent.bind(this);
    }

    // custom methods
    createNewEvent(newEvent){
        // add the new event to the mongo database 
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/event");
        xhr.setRequestHeader("Authorization", `bearer ${Auth.getToken()}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.responseType = "json";
        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
                // console log for testing. 
                console.log("createNewEvent ajax response:", xhr.response.message);
                // update the events list in state
                this.updateEventsList("58c84145d8c6541e80b285dd", 0) //note: the event is card coded currently
            }
        });
        xhr.send(JSON.stringify(newEvent));
    }

    updateEventsList(venueId, currentEventIndex){
        // add the new event to the mongo database 
        const xhr = new XMLHttpRequest();
        let queryUrl = "/api/event/" + venueId; 
        xhr.open("GET", queryUrl);
        xhr.setRequestHeader("Authorization", `bearer ${Auth.getToken()}`);
        xhr.responseType = "json";
        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
                // console log for testing. 
                console.log("get all events ajax response:", xhr.response.message);
                // update the events in state
                this.setState({
                    events: xhr.response.message,  //this must return all events
                });

                this.selectEvent(currentEventIndex);   // this will select one of the events 
            }
        });
        xhr.send();
    }

    selectEvent(eventIndex){
        //console.log("selecting event", eventIndex, ":", this.state.events[eventIndex]);
        this.setState({
            currentEvent: this.state.events[eventIndex] 
        });
    }

    // lifecycle methods.
    componentWillMount(){
        //make an AJAX-request to the server to get venue information related to this user and store the data in this component's state 
        const xhr = new XMLHttpRequest();
        const queryUrl = "/api/venue/" + localStorage.getItem("userId");  // the request uses the userId stored in local storage 
        //console.log("query:", queryUrl);
        xhr.open("get", queryUrl);
        xhr.setRequestHeader("Authorization", `bearer ${Auth.getToken()}`);
        xhr.responseType = "json";
        xhr.addEventListener("load", () => {
            // success case 
            if (xhr.status === 200) {
                console.log("get-venue-info ajax response:", xhr.response.venue);
                // set the venueInfo state
                this.setState({
                    venueInfo: xhr.response.venue
                });
                // Update the events list in state.
                console.log("updating events list from componentWillMount");
                this.updateEventsList("58c84145d8c6541e80b285dd", 0) //note: the venue (redwood bar) is hard coded currently
            //fail case
            } else {
                console.log("get-user-info ajax response failed.")
            }
        });
        xhr.send();
    }

    componentDidMount(){
        // testing the event creation ....
        // this.createNewEvent({
        //     venue: "58c84145d8c6541e80b285dd",  // the redwood bar
        //     headliner: "58c833c1e229040fd8022b2f", // the cool kids 
        //     supportOne: "58c83bb757196231ac0280ae",
        //     supportTwo: "58c83ba257196231ac0280ad",
        //     supportThree: null,
        //     date: "2014-01-01",
        //     time: 1600,
        //     headlinerAllotment: 42,
        //     supportOneAllotment: 5,
        //     supportTwoAllotment: 6,
        //     supportThreeAllotment: 7
        // })
    }

    // render the component
    render() {
        return (
            <Dashboard 
                venueInfo={this.state.venueInfo} 
                events={this.state.events}
                currentEvent={this.state.currentEvent}
                children={this.props.children}
                selectEvent={this.selectEvent}  //pass the function that updates the selected event 
            />
        );
    }
}

export default DashboardPage;