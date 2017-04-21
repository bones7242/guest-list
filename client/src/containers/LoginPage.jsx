/*
This is the login page.  This is where users that have already signed up can log in.
This login page will display the LoginForm component.
*/


import React, { PropTypes, Component } from 'react';
import Auth from "../modules/Auth";
import LoginForm from '../components/LoginForm.jsx';


class LoginPage extends Component {
    constructor(props, context) {
        //recieve props 
        super(props, context);
        // set success message
        const storedMessage = localStorage.getItem("successMessage");
        let successMessage = "";
        if (storedMessage) {
            successMessage = storedMessage;
            localStorage.removeItem("successMessage");
        }
        // set state 
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
    processForm(event) {
        // Prevent default action. in this case, action is the form submission event.
        event.preventDefault();
        // Create a string for an http body message.
        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `email=${email}&password=${password}`;
        // Create an AJAX request 
        const xhr = new XMLHttpRequest();
        xhr.open("post", "/auth/login");
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        xhr.responseType = "json";
        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {  // Success case.  If we reach this point, the user has entered a correct email and password
                this.setState({  // set the state to no errors
                    errors: {}
                });
                // save the token to authenticate user 
                Auth.authenticateUser(xhr.response.token);
                // save the user's id 
                localStorage.setItem("userId", xhr.response.user.id);
                // redirect by changing the current URL to "/".
                this.context.router.replace("/dash");
            } else {  // Failure case
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
    changeUser(event) {
        const field = event.target.name;
        const user = this.state.user;
        user[field] = event.target.value;
        // set the state with the updated user object
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

LoginPage.contextTypes = {
    router: PropTypes.object.isRequired
};

export default LoginPage;