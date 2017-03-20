/*
This is the dashboard page.  After a user logs in successfully, this page will be displayed instead of the home page.
*/

import React, {Component} from "react";
import Auth from "../modules/Auth";
import Dashboard from "../components/Dashboard.jsx";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchVenue, fetchEvents } from "../actions/index";

class DashboardPage extends Component {
    // class constructor
    constructor(props) {
        super(props);

        this.state = {
            venueInfo: {},
        };

        // pass the "this" context, so we will have access to class members from our event handler methods (createNewEvent, updateEventsList).
        this.updateEventsList = this.updateEventsList.bind(this);

    }

    updateEventsList(venueId){
        // Get the events from the mongo database 
        this.props.fetchEvents(venueId, Auth.getToken());
    }

    // lifecycle methods.
    componentWillMount(){
        //make an AJAX-request to the server to get venue information related to this user and store the data in this component's state 
        this.props.fetchVenue(localStorage.getItem("userId"), Auth.getToken()).then(console.log("promise test"));

        // Update the events list in state.
        //this.updateEventsList(xhr.response.venue._id) 
    }

    // render the component
    render() {
        // e.g. console.log("Test asdf:", this.props.asdf) // -> "Test asdf: 123"
        return (
            <Dashboard 
                venueInfo={this.state.venueInfo} 
                children={this.props.children}
            />
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchVenue, fetchEvents }, dispatch);
}

export default connect(null, mapDispatchToProps)(DashboardPage);