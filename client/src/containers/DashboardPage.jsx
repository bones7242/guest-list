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
        };
    }

    componentWillMount(){
        //make an AJAX-request to the server to get information related to this user
        const xhr = new XMLHttpRequest();
        const queryUrl = "/api/dashboard/" + localStorage.getItem("guestListUserId");
        console.log("query:", queryUrl);
        xhr.open("get", queryUrl);
        xhr.setRequestHeader("Authorization", `bearer ${Auth.getToken()}`);
        xhr.responseType = "json";
        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
                console.log("xhr response:", xhr.response.message);
                this.setState({
                    venueName: xhr.response.message.name
                });
            }
        });
        xhr.send();

    }

    // render the component
    render() {
        return (
            <Dashboard venueName={this.state.venueName}/>
        );
    }
}

export default DashboardPage;