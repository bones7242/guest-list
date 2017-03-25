/*
This is the dashboard page.  After a user logs in successfully, this page will be displayed instead of the home page.
*/

import React, {Component} from "react";

import Auth from "../modules/Auth";

import Dashboard from "../components/Dashboard.jsx";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchVenue } from "../actions/index";

class DashboardPage extends Component {
    // class constructor
    constructor(props) {
        super(props);

    }

    // lifecycle methods.
    componentWillMount(){
        //make a request to the server to get venue information related to this user
        this.props.fetchVenue(localStorage.getItem("userId"), Auth.getToken());
    }

    // render the component
    render() {
        
        return (
            <Dashboard 
                children={this.props.children}
            />
        );
    }
}

function mapStateToProps(state) {
	// whatever is returned will be mapped to the props of this component
	return {
		venue: state.venue
	};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchVenue }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);