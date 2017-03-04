import React from "react";
import Auth from "../modules/Auth";
import Dashboard from "../components/Dashboard.jsx";

class DashboardPage extends React.Component {
    // class constructor
    constructor(props) {
        super(props);

        this.state = {
            secretData: ""
        };
    }

    // this method will be executed after initial rendering
    componentDidMount() {
        /*make an AJAX-request to the server to get a message available only to authorized users*/
        const xhr = new XMLHttpRequest();
        xhr.open("get", "/api/dashboard");
        xhr.setRequestHeader("Authorization", `bearer ${Auth.getToken()}`);
        xhr.responseType = "json";
        xhr.addEventListener("load", () => {
            if (xhr.status === ) {
                this.setState({
                    secretData: xhr.response.message
                });
            }
        });
        xhr.send();
    }

    // rener the componentDidMount
    render() {
        return (<Dashboard secretData={this.state.secretData} />);
    }
}

export default DashboardPage;