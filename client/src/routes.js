
import React from "react";
import {Route, Router, hashHistory, IndexRoute, Redirect} from "react-router";

import HomePage from "./components/HomePage.jsx";
import LoginPage from "./containers/LoginPage.jsx";
import SignUpPage from "./containers/SignUpPage.jsx";
import DashboardPage from "./containers/DashboardPage.jsx";
import App from './containers/App.jsx';
import Auth from "./modules/Auth";


const myRoutes  = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            {/*one of the below routes will be passed to App as children*/}
            <IndexRoute 
                getComponent={(location, callback) => {
                    if (Auth.isUserAuthenticated()) {  
                        callback(null, DashboardPage);
                    } else {
                        callback(null, HomePage);
                    };
                }
            } />
            <Route path="login" component={LoginPage}/>
            <Route path="signup" component={SignUpPage}/>
            <Route path="logout" 
                onEnter={(nextState, replace) => {
                    // de-authenticate the user
                    Auth.deauthenticateUser();
                    // redirect the user to the index page
                    replace("/");
                }
            } />
        </Route>
    </Router>
);

export default myRoutes;