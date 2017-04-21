/* this component will be rendered at the top of all pages by the App container. It will provide login/logout navigation */

import React, { PropTypes } from "react";
import { Link, IndexLink } from "react-router";
import Auth from "../modules/Auth";

const TopNav = () => {
    return (
        <div>
            <div className="top-bar grey darken-4" style={{marginBottom:"0"}}>
                {/*logo */}
                <div className="top-bar-left">
                    {/*Guestmate.io branding here */}
                </div>
                {/*conditional to decide which links to render*/}
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
        </div>
    );
};

export default TopNav;