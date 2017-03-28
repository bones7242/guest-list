// Import dependencies.
import React from "react";
import ReactDom from "react-dom";
// materialize ui
import injectTapEventPlugin from "react-tap-event-plugin";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
// import routes 
import { browserHistory, Router } from "react-router";  //note: use browserHistory later?
import routes from "./routes.js";
// import redux packages 
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers"
import ReduxPromise from "redux-promise";

// create store for redux 
const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

// Remove tap delay, essential for MaterialUI to work properly on mobile.
injectTapEventPlugin();

// 1. wrap app in the mui theme provider & provider 
const App = () => {
    return (
        <Provider store={createStoreWithMiddleware(reducers)}>
            <MuiThemeProvider muiTheme={getMuiTheme()}>
                <Router history={browserHistory} routes={routes} />
            </MuiThemeProvider>
        </Provider>
    );
};

// 2. Render the app component in the document at the div with id of "react-app".
ReactDom.render(<App />, document.getElementById("react-app"));

