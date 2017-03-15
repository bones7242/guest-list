// Import dependencies.
import React from "react";
import ReactDom from "react-dom";
// materialize ui 
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

import TopNav from "../components/TopNav.jsx";

// 1. Create the App component that everything will live inside
const App = (props) => { 
    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            {/*this is where the top nav goes*/}
            <TopNav />
            {/*this is where the HomePage or Dashboard will be displayed */}
            {props.children}
        </MuiThemeProvider>        
    )
};

export default App;


