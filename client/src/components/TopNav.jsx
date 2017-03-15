import React, { PropTypes } from "react";
import { Link, IndexLink } from "react-router";
import Auth from "../modules/Auth";

const TopNav = () => {
    return (
        <div>
            <div className="top-bar deep-purple" style={{marginBottom:"0"}}>

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

        </div>
                
    );
};

 export default TopNav;