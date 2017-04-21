/* New user signup (registration) page.  The signup form is a component that will be rendered inside this page. */

import React, { PropTypes, Component } from 'react';
import SignUpForm from "../components/SignUpForm.jsx";

class SignUpPage extends Component {
    // class constructor
    constructor(props, context) {
        // receive parent props
        super(props, context);
        // set the initial component state
        this.state = {
            errors: {},
            user: {
                email: "",
                name: "",
                password: "",
                role: "",
                venueName: "",
                venueAddressOne: "",
                venueAddressTwo: "",
                venueZip: "",
            },
            roleSelect: {
                owner: false,
                artist: false,
            }
        };
        // bind "this" to the methods we define below 
        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
        this.toggleRole = this.toggleRole.bind(this);
    }
    // create a method to handle processing of the sign up form 
    processForm(event) {
        // Prevent default action.  in this case, action is the form submission event.
        event.preventDefault();
        // Create a string for an HTTP body message
        const name = encodeURIComponent(this.state.user.name);
        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const role = encodeURIComponent(this.state.user.role);
        let formData = `name=${name}&email=${email}&password=${password}&role=${role}`;
        if (role.toLowerCase() === "owner") { 
            const venueName = encodeURIComponent(this.state.user.venueName);
            const venueAddressOne = encodeURIComponent(this.state.user.venueAddressOne);
            const venueAddressTwo = encodeURIComponent(this.state.user.venueAddressTwo);
            const venueZip = encodeURIComponent(this.state.user.venueZip);
            formData = `name=${name}&email=${email}&password=${password}&role=${role}&venueName=${venueName}&venueAddressOne=${venueAddressOne}&venueAddressTwo=${venueAddressTwo}&venueZip=${venueZip}`;
        };
        // Create an ajax request, which will change the component state depending on the HTTP response code status received.
        const xhr = new XMLHttpRequest();
        xhr.open("post", "/auth/signup");
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.responseType = "json";
        xhr.addEventListener("load", () => {
            if (xhr.status === 200) { // success case
                // change the component-container state
                this.setState({
                    errors: {}
                });
                // set a message 
                localStorage.setItem("successMessage", xhr.response.message);
                // make a redirect
                this.context.router.replace("/login");
            } else { // failure case
                // receive the errors back 
                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.message;
                // change this container's state to show the errors
                this.setState({
                    errors
                });
            }
        });
        // initiate the http request and use the formData as the body 
        xhr.send(formData);
    }
    // define a method that will change the 'user' object and reset the state
    changeUser(event) {
        console.log("event", event);
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;
        this.setState({
            user
        });
    }
    // helper function to toggle the user's role in the state
    toggleRole(event){
		const field = event.target.name; // will be either 'owner' or 'artist' 
        let roleSelect = {};
        const user = this.state.user;
		// toggle the state for the particular field 
		if (field === "owner") {
            roleSelect = {owner: true, artist: false};
            user.role = "owner";
        } else if (field === "artist") {
            roleSelect = {owner: false, artist: true};
            user.role = "artist";
        }
		// reset the state 
        this.setState({
            roleSelect,
            user
        });
	}
    // Render the component.
    render() {
        return (
            <SignUpForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                user={this.state.user}
                toggleRole={this.toggleRole}
                roleSelect={this.state.roleSelect}
            />
        );
    }
}

SignUpPage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default SignUpPage;

