import React, { PropTypes } from 'react';
import Auth from "../modules/Auth";
import LoginForm from '../components/LoginForm.jsx';


class LoginPage extends React.Component {

    // Class constructor.
    constructor(props, context) {
        super(props, context);

        const storedMessage = localStorage.getItem("successMessage");
        let successMessage = "";

        if (storedMessage) {
            successMessage = storedMessage;
            localStorage.removeItem("successMessage");
        }

        // Set the initial component state.
        this.state = {
            errors: {},
            successMessage,
            user: {
                email: '',
                password: ''
            }
        };

        // pass the "this" context, so we will have access to class members from our event handler methods (processForm, changeUser).
        this.processForm = this.processForm.bind(this);
        this.changeUser = this.changeUser.bind(this);
    }

    // Process the form.
    // @param {object} event - the JavaScript event object 
    processForm(event) {
        // Prevent default action. in this case, action is the form submission event.
        event.preventDefault();

        // Create a string for an http body message.
        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `email=${email}&password=${password}`;

        console.log("login - processing form. formData:", formData);

        // Create an AJAX request 
        const xhr = new XMLHttpRequest();
        xhr.open("post", "/auth/login");
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.responseType = "json";
        xhr.addEventListener("load", () => {
            // Success case.
            if (xhr.status === 200) {
                /*if we reach this point, the user has entered a correct email and password, so we want to save the token and redirect to the dashboard. */
                // change the componenet-container state.
                console.log("The username and password came back as a match.")
                this.setState({
                    errors: {}
                });
                // save the token.
                Auth.authenticateUser(xhr.response.token); //note: i changed fromd deauthenticateUser to authenticateUser 
                // redirect by changing the current URL to "/".
                this.context.router.replace("/");
            // Failure case.
            } else {
                // ?? 
                const errors = xhr.response.errors ? xhr.response.errors : {};
                errors.summary = xhr.response.message;
                // change the componenet-container state to show errors.
                this.setState({
                    errors
                });
            }
        });
        // send the HTTP request, using the formData as the body.
        xhr.send(formData);
    }

    // Change the user object.
    // @param {object} event - the JavaScript event object. 
    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;

        this.setState({
            user
        });
    }

    // Render the component.
    render() {
        return (
            <LoginForm
                onSubmit={this.processForm}
                onChange={this.changeUser}
                errors={this.state.errors}
                successMessage={this.state.successMessage}
                user={this.state.user}
            />
        );
    }

}

// ?? 
LoginPage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default LoginPage;