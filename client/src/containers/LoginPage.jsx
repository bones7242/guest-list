/* This is the login page where users that have already signed up can log in. */

import React, { PropTypes, Component } from 'react';
import Auth from '../modules/Auth';
import LoginForm from '../components/LoginForm.jsx';

class LoginPage extends Component {
  constructor(props, context) {
    // recieve props
    super(props, context);
    // set success message
    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';
    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }
    // set state
    this.state = {
      errors: {},
      successMessage,
      user: {
        email: '',
        password: '',
      },
    };
    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  processForm(event) {
    event.preventDefault();
    // Create a string for an http body message.
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;
    // Create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('post', '/auth/login');
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {  // Success case.  If we reach this point, the user has entered a correct email and password
        this.setState({  // set the state to no errors
          errors: {},
        });
        Auth.authenticateUser(xhr.response.token);
        localStorage.setItem('userId', xhr.response.user.id);
        this.context.router.replace('/dash');
      } else {  // Failure case
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;
        this.setState({
          errors,
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
      user,
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
  router: PropTypes.object.isRequired,
};

export default LoginPage;
