/*
This is the dashboard component.  It will be rendered inside the dashboard page.  
It will render sub-components that have the nav and content our users want to see.
*/
import React, { PropTypes } from "react";

import NavBar from "../containers/NavBar.jsx";
import Content from "./Content.jsx";

const Dashboard = ({children}) => {
    
    return (
        <div className="row dashboard">
            <div className="col s3 m3 l3 grey darken-3" style={{padding:"0px"}}>    
                {/*this is our nav bar subcomponent, which will show the logo and all the upcoming events*/}
                <NavBar />
            </div>
            <div className="col s9 m9 l9" style={{padding:"0px"}}>
                {/*this is the content component, which will show the add-event form, add-guest form, or event details */}
                <Content children={children} />
            </div> 
        </div>
    );
}

export default Dashboard;
