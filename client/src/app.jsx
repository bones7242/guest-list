// Import dependencies.
import React from "react";
import ReactDom from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// Import routes.
import { browserHistory, Router } from "react-router";
import routes from "./routes.js";

// Remove tap delay, essential for MaterialUI to work properly on mobile.
injectTapEventPlugin();

// Create an App component that is wrapped in MuitThemeProvider.
const App = () => {
    return (
        <MuiThemeProvider muiTheme={getMuiTheme()}>
                <Router history={browserHistory} routes={routes} />
        </MuiThemeProvider>
    )
};

// Render the component.
ReactDom.render(<App />, document.getElementById("react-app"));

