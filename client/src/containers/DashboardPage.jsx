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
            testMessage: ""
        };
    }

    // render the component
    render() {
        return (
            <Dashboard />
        );
    }
}

export default DashboardPage;