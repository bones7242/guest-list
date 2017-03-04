import React, { PropTypes } from "react";
import { Link, IndexLink } from "react-router";
import Auth from "../modules/Auth";

const Base = ({ children }) => {
    return (
        <div>

            <div className="top-bar">

                <div className="top-bar-left">
                    <IndexLink to="/">React App</IndexLink>
                </div>

                {/*conditional statement to decide which menu to render*/}
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

 Base.propTypes = {
     children: PropTypes.object.isRequired
 };

 export default Base;