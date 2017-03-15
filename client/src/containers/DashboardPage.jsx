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
            venueName: "Venue name is loading...",
            events: []
        };

        // pass the "this" context, so we will have access to class members from our event handler methods (createNewEvent, updateEventsList).
        this.createNewEvent = this.createNewEvent.bind(this);
        this.updateEventsList = this.updateEventsList.bind(this);
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
                console.log(" createNewEvent xhr response:", xhr.response.message);
                // update the events in state
                this.updateEventsList("58c84145d8c6541e80b285dd")
            }
        });
        xhr.send(JSON.stringify(newEvent));
    }

    updateEventsList(venueId){
        // add the new event to the mongo database 
        const xhr = new XMLHttpRequest();
        let queryUrl = "/api/event/" + venueId;  //note: the redwood bar is hard coded in.  grab from local storage.
        xhr.open("GET", queryUrl);
        xhr.setRequestHeader("Authorization", `bearer ${Auth.getToken()}`);
        xhr.responseType = "json";
        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
                // console log for testing. 
                console.log("get all events xhr response:", xhr.response.message);
                // update the events in state
                this.setState({
                    events: xhr.response.message  //this must return all events
                });
            }
        });
        xhr.send();
    }

    // lifecycle methods.
    componentWillMount(){
        //make an AJAX-request to the server to get information related to this user
        //store the data in state 
        const xhr = new XMLHttpRequest();
        const queryUrl = "/api/dashboard/" + localStorage.getItem("guestListUserId");
        //console.log("query:", queryUrl);
        xhr.open("get", queryUrl);
        xhr.setRequestHeader("Authorization", `bearer ${Auth.getToken()}`);
        xhr.responseType = "json";
        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
                console.log("get user info xhr response:", xhr.response.venue);
                this.setState({
                    venueName: xhr.response.venue.name
                    //events: xhr.response.venue.events
                });
            }
        });
        xhr.send();
    }

    componentDidMount(){
        // testing the event creation....
        this.createNewEvent({
            venue: "58c84145d8c6541e80b285dd",  // the redwood bar
            headliner: "58c833c1e229040fd8022b2f", // the cool kids 
            supportOne: "58c83bb757196231ac0280ae",
            supportTwo: "58c83ba257196231ac0280ad",
            supportThree: null,
            date: "2014-01-01",
            time: 1600,
            headlinerAllotment: 42,
            supportOneAllotment: 5,
            supportTwoAllotment: 6,
            supportThreeAllotment: 7,
        })
    }

    // render the component
    render() {
        return (
            <Dashboard 
                venueName={this.state.venueName} 
                events={this.state.events}
                children={this.props.children}
            />
        );
    }
}

export default DashboardPage;