import React, { PropTypes } from "react";
import { Link } from "react-router";

/*
This is the signup form that will be rendered inside of our signup page.  
The form handles showing the fields and getting the user input and checking the input.
*/

const SignUpForm = ({onSubmit, onChange, errors, user}) => {
    return (
        <div className="container">
                
            <h2 className="card-heading  white-text text-darken-2">Sign Up</h2>

            <form action="/" onSubmit={onSubmit}>
            
                {errors.summary && <p className="error-message">{errors.summary}</p>}

                <div className="field-line">
                    <label htmlFor="name" className="white-text">Name: </label>
                    <p className="error-message">{errors.name}</p>
                    <input
                        name="name"                               
                        onChange={onChange}
                        value={user.name}
                    />
                    
                </div>

                <div className="">
                    <label htmlFor="email" className="white-text">Email: </label>
                    <p className="error-message">{errors.email}</p>
                    <input
                        name="email"                               
                        onChange={onChange}
                        value={user.email}
                    />
                    
                </div>

                <div className="">
                    <label htmlFor="password" className="white-text">Password: </label>
                    <p className="error-message">{errors.password}</p>
                    <input
                        type="password"
                        name="password"                               
                        onChange={onChange}
                        value={user.password}
                    />
                    
                </div>

                <div className="input-field col s3">
                    {/*role selection goes here*/}
                </div>

                {/*
                    display additional questions below, depending on the role selected above
                */}

                <div className="">
                    <label htmlFor="venueName" className="white-text">Venue Name: </label>
                    <p className="error-message">{errors.venueName}</p>
                    <input
                        name="venueName"
                        onChange={onChange}
                        value={user.venueName}
                    />
                    
                </div>

                <div className="">
                    <label htmlFor="venueAddressOne" className="white-text">Address 1: </label>
                    <p className="error-message">{errors.venueAddressOne}</p>
                    <input
                        name="venueAddressOne"
                        onChange={onChange}
                        value={user.venueAddressOne}
                    />
                    
                </div>
                <div className="">
                    <label htmlFor="venueAddressTwo" className="white-text">Address 2: </label>
                    <p className="error-message">{errors.venueAddressTwo}</p>
                    <input
                        name="venueAddressTwo"
                        onChange={onChange}
                        value={user.venueAddressTwo}
                    />
                    
                </div>

                <div className="">
                    <label htmlFor="venueZip" className="white-text">Zip Code: </label>
                    <p className="error-message">{errors.venueZip}</p>
                    <input
                        name="venueZip"
                        onChange={onChange}
                        value={user.venueZip}
                    />
                    
                </div>

                <div className="button-line">
                    <button type="submit" className="waves-effect waves-light btn">Create New Account</button>
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
