/*  This container will be displayed inside the app container.  It will be displayed instead of home/login/signup if a user logs in successfully. */

import React, {Component} from "react";
import Auth from "../modules/Auth";
import Dashboard from "../components/Dashboard.jsx";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { fetchVenue } from "../actions/index";

class DashboardPage extends Component {
    constructor(props) {
        super(props);
    }
    // lifecycle methods.
    componentWillMount(){
        //make a request to the server to get all of the venue information related to this user
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
	return {
		venue: state.venue
	};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchVenue }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);