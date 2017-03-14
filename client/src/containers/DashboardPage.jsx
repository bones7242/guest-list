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
            venueName: "Test Venue Name"
            //events: []
        };

        // pass the "this" context, so we will have access to class members from our event handler methods (createNewEvent).
        this.createNewEvent = this.createNewEvent.bind(this);
    }

    // custom methods
    createNewEvent(newEvent){
        console.log("new event:", newEvent);
        //store the data in state 
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/event", true);
        xhr.setRequestHeader("Authorization", `bearer ${Auth.getToken()}`);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.responseType = "json";
        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
                console.log(" createNewEvent xhr response:", xhr.response.message);
            }
        });
        xhr.send(JSON.stringify(newEvent));
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
            <Dashboard venueName={this.state.venueName}/>
        );
    }
}

export default DashboardPage;