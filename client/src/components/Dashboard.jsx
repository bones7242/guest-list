/*
This is the dashboard component.  It will be rendered inside the dashboard page.  
It will render sub-components that have the nav and content our users want to see.
*/
import React, { PropTypes } from "react";

import Navbar from "./subComponents/Navbar.jsx";
import Content from "./subComponents/Content.jsx";
import EventInfo from "./subComponents/Eventinfo.jsx"

const Dashboard = () => {
    return (
        <div>
            {/*this is a title card that shows what the page is about*/}
            <h2>Dashboard</h2>
            <h3>This is the dashboard component, which will have your events and your guest lists.</h3>
            {/*this is our nav bar subcomponent, which will show the logo and all the upcoming events*/}
            <Navbar />
            {/*this is the content subcomponent, which will show the guests on the guestlist for the selected event  */}
            <Content />
        </div>
    );
}

export default Dashboard;
