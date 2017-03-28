import React, { PropTypes } from 'react';
import { Link } from 'react-router';
// material-ui components
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from "material-ui/Card";
import RaisedButton from "material-ui/RaisedButton";


/* 
This is the login form.
This is the "dumb" component that will get the information from the user and will use the methods from the parent component to check the input.
*/

const LoginForm = ({onSubmit, onChange, errors, successMessage, user}) => (
 
    <Card>

      <CardHeader title="Login" />

      <form action="/" onSubmit={onSubmit} className="form--front-page">

        {successMessage && <p className="success-message ">{successMessage}</p>}
        {errors.summary && <p className="error-message ">{errors.summary}</p>}

        <div className="field-line">
          <label htmlFor="email" className="white-text">Email</label>
          <input
            name="email"
            onChange={onChange}
            value={user.email}
          />
          <p className="error-message ">{errors.email}</p>
        </div>

        <div className="field-line">
          <label htmlFor="password" className="white-text">Password</label>
          <input
            type="password"
            name="password"
            onChange={onChange}
            value={user.password}
          />
          <p className="error-message ">{errors.password}</p>
        </div>

        <div className="button-line">
          <button type="submit" className="grey darken-1 waves-effect waves-light btn hoverable">Log In</button>
        </div>

        <p className="help-message">Don't have an account? <Link to={'/signup'}>Create one</Link>.</p>
      </form>
    
  </Card>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;