/* This container will hold the entire app.  It will render the top nav bar, as well as the HomePage/LoginPage/SignupPage/Dashboard as determined by the route*/

import React from "react";
import ReactDom from "react-dom";
import TopNav from "../components/TopNav.jsx";

const App = (props) => { 
    return (        
        <div>
            {/*render the top nav bar*/}
            <TopNav />
            {/* render children */}
            {props.children}
        </div>
    )
};

export default App;


