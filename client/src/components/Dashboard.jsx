/*
This is the dashboard component.  It will be rendered inside the dashboard page.  
It will render sub-components that have the nav and content our users want to see.
*/
import React, { PropTypes } from "react";

import DashboardLogo from "./subComponents/DashboardLogo.jsx";
import DashboardHeader from "./subComponents/DashboardHeader.jsx";
import NavBar from "./subComponents/NavBar.jsx";
import Content from "./subComponents/Content.jsx";

const Dashboard = ({children}) => {
    //console.log("current event", currentEvent);
    return (
        
        <div className="row dashboard">
            <div className="col s3 m3 l3" style={{padding:"0px"}}>
                
                <div className="row grey darken-3" style={{padding:"0px"}}>
                    <div className="col s12 m12 l12" style={{paddingRight:"0px", paddingLeft:"0px"}}>
                        <DashboardLogo />
                    </div>

                    <div className="col s12 m12 l12" style={{paddingRight:"0px", paddingLeft:"0px"}}>
                        {/*this is our nav bar subcomponent, which will show the logo and all the upcoming events*/}
                        <NavBar />
                    </div>

                </div>

            </div>

            <div className="col s9 m9 l9" style={{padding:"0px"}}>

                <div className="row" style={{padding:"0px"}}>

                    {/*this is the content subcomponent, which will show the add-event form, add-guest form, or event details */}
                    <div className="col s12 m12 l12" style={{paddingRight:"0px", paddingLeft:"0px"}}>
                        <Content children={children} />
                    </div>

                </div>

            </div> 
        </div>
    );
}

Dashboard.propTypes = {
    //children: PropTypes.object.isRequired
};

export default Dashboard;
