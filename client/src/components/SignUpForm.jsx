/*
This is the signup form that will be rendered inside of our SignupPage container.  
The form handles showing the fields and getting the user input and checking the input.
*/

import React, { PropTypes } from "react";
import { Link } from "react-router";

const SignUpForm = ({onSubmit, onChange, errors, user, toggleRole, roleSelect}) => {
    return (
        <div className="row">
            {/*spacer*/}
            <div className="col s1 m3 l4"></div>
            {/* main content */}
            <div className="col s8 m6 l4 center-align">                            
                <form action="/" onSubmit={onSubmit} className="form--front-page">
                    <h2>Sign Up</h2>
                    {errors.summary && <p className="error-message ">{errors.summary}</p>}
                   <div>
                        <label htmlFor="name" className="label--front-page">Name: </label>
                        <p className="error-message ">{errors.name}</p>
                        <input name="name" onChange={onChange} value={user.name} />
                    </div>
                    <div>
                        <label htmlFor="email"  className="label--front-page">Email: </label>
                        <p className="error-message " >{errors.email}</p>
                        <input name="email" onChange={onChange} value={user.email} />
                    </div>
                    <div>
                        <label htmlFor="password" className="label--front-page">Password: </label>
                        <p className="error-message">{errors.password}</p>
                        <input type="password" name="password" onChange={onChange} value={user.password} />
                    </div>
                    <div className="row role-selection">                           
                        <div className="col s12 m6">
                            <input className="list-radios" name="owner" type="radio" id="owner" onChange={toggleRole} checked={roleSelect.owner} />
                            <label htmlFor="owner">Venue</label>
                        </div>
                        <div className="col s12 m6">
                            <input className="list-radios" name="artist" type="radio" id="artist" onChange={toggleRole} checked={roleSelect.artist} />
                            <label htmlFor="artist">Artist (coming soon)</label>
                        </div>                            
                    </div>
                    {/* display additional questions below, depending on the role selected above */}
                    {(user.role === "artist") && <div>
                        <div>
                            <p className="error-message">The "Artist" role isn't quite ready yet. Please check back soon.</p>
                        </div>
                    </div> }
                    {(user.role === "owner") && <div>
                        <div>
                            <label htmlFor="venueName" className="label--front-page">Venue Name: </label>
                            <p className="error-message ">{errors.venueName}</p>
                            <input name="venueName" onChange={onChange} value={user.venueName} />                                
                        </div>
                        <div>
                            <label htmlFor="venueAddressOne" className="label--front-page" >Address 1:</label>
                            <p className="error-message ">{errors.venueAddressOne}</p>
                            <input name="venueAddressOne" onChange={onChange} value={user.venueAddressOne} />
                        </div>
                        <div>
                            <label htmlFor="venueAddressTwo" className="label--front-page">Address 2: </label>
                            <p className="error-message ">{errors.venueAddressTwo}</p>
                            <input name="venueAddressTwo" onChange={onChange} value={user.venueAddressTwo} />
                        </div>
                        <div>
                            <label htmlFor="venueZip" className="label--front-page">Zip Code: </label>
                            <p className="error-message ">{errors.venueZip}</p>
                            <input name="venueZip" onChange={onChange} value={user.venueZip} />
                        </div>
                        <div className="button-line">
                            <button type="submit" className="blue accent-2 waves-effect waves-light btn hoverable">Create New Account</button>
                        </div>
                    </div> }
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
