/* This is the home page that will be displayed when a user arrives at the site before the user logs in or signs up. */

import React from "react";

const HomePage = () => {
    return (
        <div className="center-align grey-text text-lighten-5" style={{padding: "60px 0px 0px 0px"}}>
            <h2>Welcome to <i>Guestmate</i></h2>
            <h3>The premiere cloud-based guest-list solution</h3>
        </div>
    )
};

export default HomePage;