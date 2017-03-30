// Import dependencies.
import React from "react";
import ReactDom from "react-dom";

import TopNav from "../components/TopNav.jsx";

// 1. Create the App component that everything will live inside
const App = (props) => { 
    return (        
        <div>
            {/*this is where the top nav goes*/}
            <TopNav />
            {/*this is where the HomePage or Dashboard will be displayed */}
            {props.children}
        </div>
    )
};

export default App;


