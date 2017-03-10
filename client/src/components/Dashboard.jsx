/*
This is the dashboard component.  It will be rendered inside the dashboard page.  
It will render sub-components that have the nav and content our users want to see.
*/

import React, { PropTypes } from "react";
import { Card, CardTitle, CardText } from "material-ui/Card";

<<<<<<< HEAD
import NavBar from "./subComponents/NavBar.jsx";
import Content from "./subComponents/Content.jsx";

const Dashboard = () => {
=======
import navbar from "./subComponents/Navbar.jsx";
import content from "./subComponents/Content.jsx";
import EventInfo from "./subComponents/Eventinfo.jsx"

const Dashboard = ({ secretData }) => {
>>>>>>> 747c1286eb79c047222dccc0b148c46265692031
    return (
        <Card className="container">
            {/*this is a title card that shows what the page is about*/}
            <CardTitle
                title="Dashboard"
                subtitle="This is the dashboard component, which will have your events and your guest lists."
            />
            {/*this is our nav bar subcomponent, which will show the logo and all the upcoming events*/}
            <NavBar />
            {/*this is the content subcomponent, which will show the guests on the guestlist for the selected event  */}
            <Content />
        </Card>
    );
}

Dashboard.propTypes = {
    testMessage: PropTypes.string.isRequired
};

export default Dashboard;
