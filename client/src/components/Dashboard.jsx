import React, { PropTypes } from "react";
import { Card, CardTitle, CardText } from "material-ui/Card";

import navbar from "./subComponents/Navbar.jsx";
import content from "./subComponents/Content.jsx";
import EventInfo from "./subComponents/Eventinfo.jsx"

const Dashboard = ({ secretData }) => {
    return (
        <Card className="container">
            <CardTitle
                title="Dashboard"
                subtitle="You should get access to this page only after authentication."
            />
            {secretData && <CardText style={{ fontSize: "16px", color: "green" }}>{secretData}</CardText>}
        </Card>
    );
}

Dashboard.propTypes = {
    secretData: PropTypes.string.isRequired
};

export default Dashboard;