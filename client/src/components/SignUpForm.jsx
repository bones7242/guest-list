import React, { PropTypes } from "react";
import { Link } from "react-router";

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

/*
This is the signup form that will be rendered inside of our signup page.  
The form handles showing the fields and getting the user input and checking the input.
*/

const SignUpForm = ({onSubmit, onChange, errors, user}) => {
    return (
        <div className="row">
            <div className="col s3 m3"></div>
            <div className="col s6 m6 card grey darken-3">
                <div className="card-title">Sign Up</div>
                <div className="card-content">
                    <form action="/" onSubmit={onSubmit}>
                    
                        {errors.summary && <p className="error-message">{errors.summary}</p>}

                        <div className="">
                            <label htmlFor="name">Name: </label>
                            <p className="error-message">{errors.name}</p>
                            <input
                                name="name"                               
                                onChange={onChange}
                                value={user.name}
                            />
                            
                        </div>

                        <div className="">
                            <label htmlFor="email">Email: </label>
                            <p className="error-message">{errors.email}</p>
                            <input
                                name="email"                               
                                onChange={onChange}
                                value={user.email}
                            />
                            
                        </div>

                        <div className="">
                            <label htmlFor="password">Password: </label>
                            <p className="error-message">{errors.password}</p>
                            <input
                                type="password"
                                name="password"                               
                                onChange={onChange}
                                value={user.password}
                            />
                            
                        </div>

                        <div className="">
                            <label htmlFor="role">Role (optional): Owner</label>
                            {/*<p className="error-message">{errors.role}</p>*/}
                            {/*<SelectField name="role" onChange={onChange} value={user.role}>
                                <MenuItem value="none" primaryText="N/A"/>
                                <MenuItem value="owner" primaryText="Venue Owner"/>
                                <MenuItem value="support" primaryText="Venue Support"/>
                                <MenuItem value="artist" primaryText="Artist"/>
                            </SelectField>*/}
                            
                        </div>

                        {/*
                            display additional questions here, depending on the role selected above
                        */}

                        <div className="">
                            <label htmlFor="venueName">Venue Name: </label>
                            <p className="error-message">{errors.venueName}</p>
                            <input
                                name="venueName"
                                onChange={onChange}
                                value={user.venueName}
                            />
                            
                        </div>

                        <div className="">
                            <label htmlFor="venueAddressOne">Address 1: </label>
                            <p className="error-message">{errors.venueAddressOne}</p>
                            <input
                                name="venueAddressOne"
                                onChange={onChange}
                                value={user.venueAddressOne}
                            />
                            
                        </div>
                        <div className="">
                            <label htmlFor="venueAddressTwo">Address 2: </label>
                            <p className="error-message">{errors.venueAddressTwo}</p>
                            <input
                                name="venueAddressTwo"
                                onChange={onChange}
                                value={user.venueAddressTwo}
                            />
                            
                        </div>

                        <div className="">
                            <label htmlFor="venueZip">Zip Code: </label>
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
            </div> 
            <div className="col s3 m3"></div>
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
