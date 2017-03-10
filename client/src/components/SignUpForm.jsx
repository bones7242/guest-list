import React, { PropTypes } from "react";
import { Link } from "react-router";

/*
This is the signup form that will be rendered inside of our signup page.  
The form handles showing the fields and getting the user input and checking the input.
*/

const SignUpForm = ({onSubmit, onChange, errors, user}) => {
    return (
        <div className="container">
            <form action="/" onSubmit={onSubmit}>
                
                <h2 className="card-heading">Sign Up</h2>

                {errors.summary && <p className="error-message">{errors.summary}</p>}

                <div className="field-line">
                    <label htmlFor="name">Name </label>
                    <input
                        name="name"
                        
                        onChange={onChange}
                        value={user.name}
                    />
                    <p className="error-message">{errors.name}</p>
                </div>

                <div className="field-line">
                    <label htmlFor="email">Email </label>
                    <input
                        name="email"
                        
                        onChange={onChange}
                        value={user.email}
                    />
                    <p className="error-message">{errors.email}</p>
                </div>

                <div className="field-line">
                    <label htmlFor="password">Password </label>
                    <input
                        type="password"
                        name="password"
                        
                        onChange={onChange}
                        value={user.password}
                    />
                    <p className="error-message">{errors.password}</p>
                </div>

                <div className="button-line">
                    <button type="submit" label="Create New Account">Create New Account</button>
                </div>

                <p>Already have an account? <Link to={"/login"}>Log in</Link></p>

            </form>
        </div> 
    );
};

SignUpForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};

export default SignUpForm;
