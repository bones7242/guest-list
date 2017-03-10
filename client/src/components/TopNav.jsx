import React, { PropTypes } from "react";
import { Link, IndexLink } from "react-router";
import Auth from "../modules/Auth";

const TopNav = ({ children }) => {
    return (
        <div>
            <div className="top-bar">
                {/*logo area on top left of screen*/}
                <div className="row left deep-orange" className="valign-wrapper" id="logoContainer">
                    <div className="col s3">
                        
                        <div className="top-bar-left">
                            <h1>GL</h1>
                            <a className="waves-effect waves-light btn hoverable" className="valign">
                                <i className="material-icons left">cloud</i>
                                button
                            </a>
                        </div>
                    </div>
                        
                </div>

                {/*conditional statement to decide which links to render*/}
                {Auth.isUserAuthenticated() ? (
                    <div className="top-bar-right">
                        <Link to="/logout">Log out</Link>
                    </div>
                ) : (
                    <div className="top-bar-right">
                        <Link to="/login">Log in</Link>
                        <Link to="/signup">Sign up</Link>
                    </div>
                )}                

            </div>

            {/*child components will be rendered here */}
            { children }

        </div>
                
    );
};

 TopNav.propTypes = {
     children: PropTypes.object.isRequired
 };

 export default TopNav;