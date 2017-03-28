import React, { PropTypes } from "react";
import { Link } from "react-router";

/*
This is the signup form that will be rendered inside of our signup page.  
The form handles showing the fields and getting the user input and checking the input.
*/

const SignUpForm = ({onSubmit, onChange, errors, user}) => {
    return (
        <div className="row">
            <div className="col s1 m3 l3">
                {/*spacer*/}
            </div>
            
            <div className="col s8 m8 l6 center-align">                            

                <form action="/" onSubmit={onSubmit} className="form--front-page">

                    <h2>Sign Up</h2>
                
                    {errors.summary && <p className="error-message ">{errors.summary}</p>}

                    <div className="row">
                        <div className="col s12 m6 l6">
                            <label htmlFor="name" className="label--front-page">Name: </label>
                            <p className="error-message ">{errors.name}</p>
                            <input
                                name="name"                               
                                onChange={onChange}
                                value={user.name}
                            />
                            
                        </div>

                        <div className="col s12 m6 l6">
                            <label htmlFor="email"  className="label--front-page">Email: </label>
                            <p className="error-message " >{errors.email}</p>
                            <input
                                name="email"                               
                                onChange={onChange}
                                value={user.email}
                            />
                            
                        </div>
                    </div>

                    <div className="row">
                        <div className="col s12 m6 l6">
                            <label htmlFor="password" className="label--front-page">Password: </label>
                            <p className="error-message">{errors.password}</p>
                            <input
                                type="password"
                                name="password"                               
                                onChange={onChange}
                                value={user.password}
                            />
                            
                        </div>

                        <div className="col s12 m6 l6">
                            <label htmlFor="role" className="label--front-page">Role: </label>
                            <p className="error-message">{errors.venueName}</p>
                            <input
                                name="venueName"
                                onChange={onChange}
                                value={user.venueName}
                            />
                           
                        </div>
                    </div>

                    {/*
                        display additional questions below, depending on the role selected above
                    */}
                    <div className="row">
                        <div className="col s12 m6 l6">
                        
                         <label htmlFor="venueName" className="label--front-page">Venue Name: </label>
                            <p className="error-message ">{errors.venueName}</p>
                            <input
                                name="venueName"
                                onChange={onChange}
                                value={user.venueName}
                            />
                            
                        </div>

                        <div className="col s12 m6 l6">
                            <label htmlFor="venueAddressOne" className="label--front-page">Address 1: </label>
                            <p className="error-message ">{errors.venueAddressOne}</p>
                            <input
                                name="venueAddressOne"
                                onChange={onChange}
                                value={user.venueAddressOne}
                            />                                                    
                        
                            <label htmlFor="venueAddressTwo" className="label--front-page">Address 2: </label>
                            <p className="error-message ">{errors.venueAddressTwo}</p>
                            <input
                                name="venueAddressTwo"
                                onChange={onChange}
                                value={user.venueAddressTwo}
                            />
                        
                            <label htmlFor="venueZip" className="label--front-page">Zip Code: </label>
                            <p className="error-message ">{errors.venueZip}</p>
                            <input
                                name="venueZip"
                                onChange={onChange}
                                value={user.venueZip}
                            />
                            
                        </div>
                    </div>

                    <div className="button-line">
                        <button type="submit" className="grey darken-1 waves-effect waves-light btn hoverable">Create New Account</button>
                    </div>

                    <p className="help-message">Already have an account? <Link to={"/login"}>Log in</Link></p>

                </form>
            
            </div>
        
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
