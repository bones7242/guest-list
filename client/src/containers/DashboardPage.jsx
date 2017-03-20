/*
This is the dashboard page.  After a user logs in successfully, this page will be displayed instead of the home page.
*/

import React, {Component} from "react";
import Auth from "../modules/Auth";
import Dashboard from "../components/Dashboard.jsx";

import { connect } from "react-redux";

class DashboardPage extends Component {
    // class constructor
    constructor(props) {
        super(props);

        this.state = {
            venueInfo: {},
            events: [],
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
                console.log("createNewEvent ajax response:", xhr.response.message);
                // update the events list in state
                this.updateEventsList(this.state.venueInfo._id, 0) //note: the event is card coded currently
            }
        });
        xhr.send(JSON.stringify(newEvent));
    }

    updateEventsList(venueId){
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

            }
        });
        xhr.send();
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
                }, () => {
                    // Update the events list in state.
                    console.log("updating events list from componentWillMount");
                    this.updateEventsList(xhr.response.venue._id, 0) //note: the venue (redwood bar) is hard coded currently
                });
                
            //fail case
            } else {
                console.log("get-user-info ajax response failed.")
            }
        });
        xhr.send();
    }

    componentDidMount(){

    }

    // render the component
    render() {
        // e.g. console.log("Test asdf:", this.props.asdf) // -> "Test asdf: 123"
        return (
            <Dashboard 
                venueInfo={this.state.venueInfo} 
                //events={this.state.events}
                children={this.props.children}
                //selectEvent={this.selectEvent}  //pass the function that updates the selected event 
                //createNewEvent={this.state.createNewEvent}  //pass the function that will create a new event 
            />
        );
    }
}

function mapStateToProps(state) {
    // whatever gets returned from this method will show up as props inside of this component
    // this function is the glue between react and redux.
    // important fact 1: whenever our applicaiton state chagnes, this component will re-render
    // important fact 2: whenever our applicaiton state chagnes, the object in the state function will be assigned as props to the component 
    // e.g. asdf: "123"
    return {
        events: state.events,
        activeEvent: state.activeEvent    
    };
}

export default connect(mapStateToProps)(DashboardPage);