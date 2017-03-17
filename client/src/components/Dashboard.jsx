/*
This is the dashboard component.  It will be rendered inside the dashboard page.  
It will render sub-components that have the nav and content our users want to see.
*/
import React, { PropTypes } from "react";

import NavBar from "./subComponents/NavBar.jsx";
import Content from "./subComponents/Content.jsx";
import EventInfo from "./subComponents/EventInfo.jsx";
import Footer from "./subComponents/Footer.jsx";
import DashboardLogo from "./subComponents/DashboardLogo.jsx";
import DashboardHeader from "./subComponents/DashboardHeader.jsx";

const Dashboard = ({venueInfo, events, currentEvent, children, selectEvent, createNewEvent}) => {
    //console.log("current event", currentEvent);
    return (
        
        <div className="row" style={{backgroundColor:"#424242"}}>
            <div className="col s3 m3 l3" style={{padding:"0px"}}>
                
                <div className="row" style={{padding:"0px"}}>
                    <div className="col s12 m12 l12" style={{paddingRight:"0px", paddingLeft:"0px"}}>
                        <DashboardLogo 
                            venueInfo={venueInfo}
                        />
                    </div>

                    <div className="col s12 m12 l12" style={{paddingRight:"0px", paddingLeft:"0px"}}>
                        {/*this is our nav bar subcomponent, which will show the logo and all the upcoming events*/}
                        <NavBar 
                            events={events}  // pass the array of all the events to the nav bar 
                            selectEvent={selectEvent}  //pass the function that updates the selected event 
                        />
                    </div>

                </div>

            </div>

            <div className="col s9 m9 l9" style={{padding:"0px"}}>

                <div className="row" style={{padding:"0px"}}>

                    <div className="col s12 m12 l12" style={{paddingRight:"0px", paddingLeft:"0px"}}>
                        <DashboardHeader 
                            currentEvent={currentEvent}
                        />
                    </div>

                    {/*this is the content subcomponent, which will show the guests on the guestlist for the selected event  */}
                    <div className="col s12 m12 l12" style={{paddingRight:"0px", paddingLeft:"0px"}}>
                        <Content 
                            children={children}
                            currentEvent={currentEvent}
                            createNewEvent={createNewEvent}
                            venueInfo={venueInfo}
                        />
                    </div>

                </div>

            </div>
        </div>
    );
}

Dashboard.propTypes = {
    venueInfo: PropTypes.object.isRequired,
    events: PropTypes.array.isRequired,
    //currentEvent: PropTypes.object.isRequired,
    //children: PropTypes.object.isRequired,
    selectEvent: PropTypes.func.isRequired
};

export default Dashboard;
