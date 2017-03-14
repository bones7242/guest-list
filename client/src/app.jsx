// Import dependencies.
import React from "react";
import ReactDom from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
// Import routes.
import { browserHistory, Router } from "react-router";
import routes from "./routes.js";
import "../../server/static/vendor/materialize/js/materialize.min.js";
// materialize ui 
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

// Remove tap delay, essential for MaterialUI to work properly on mobile.
injectTapEventPlugin();

// 1. Create the App component that everything will live inside
const App = () => { //??
    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <Router history={browserHistory} routes={routes} />
        </MuiThemeProvider>        
    )
};

// 2. Render the app component in the document at the div with id of "react-app".
ReactDom.render(<App />, document.getElementById("react-app"));

