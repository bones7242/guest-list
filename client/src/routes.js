
import React, { PropTypes } from "react";
import {Route, Router, IndexRoute, Redirect} from "react-router";

import Auth from "./modules/Auth";

import App from './containers/App.jsx';
import HomePage from "./components/HomePage.jsx";
import LoginPage from "./containers/LoginPage.jsx";
import SignUpPage from "./containers/SignUpPage.jsx";
import DashboardPage from "./containers/DashboardPage.jsx";

import WelcomePage from "./components/subComponents/WelcomePage.jsx";
import AddGuestForm from "./components/subComponents/AddGuestForm.jsx";
import AddEventForm from "./components/subComponents/AddEventForm.jsx";
import EditEventForm from "./components/subComponents/EditEventForm.jsx";
import EventDetail from "./components/subComponents/EventDetail.jsx";

const myRoutes = (
            <Route path="/" component={App}>
                {/* route if logged in.  One of the below routes will be passed to App as children*/}
                <Route path="/dash" 
                    getComponent={(location, callback) => {
                        if (Auth.isUserAuthenticated()) {  
                            callback(null, DashboardPage);
                        } else {
                            callback(null, HomePage);
                        };
                    }
                }>
                    <IndexRoute component={WelcomePage} />
                    {/* add a new guest */}
                    <Route path="/add-guest" component={AddGuestForm} />  
                    {/* add event*/}
                    <Route path="/add-event" component={AddEventForm} /> 
                    {/* edit an event */}
                    <Route path="/edit-event" component={EditEventForm} /> 
                    {/* view event*/} 
                    <Route path= "/event" component={EventDetail} />                            
                </Route>
                
                {/* login route */}
                <Route path="/login" component={LoginPage}/>
                
                {/* signup route */}
                <Route path="/signup" component={SignUpPage}/>
                
                {/* log out route */}
                <Route path="/logout" 
                    onEnter={(nextState, replace) => {
                        // de-authenticate the user
                        Auth.deauthenticateUser();
                        // redirect the user to the index page
                        replace("/");
                    }
                } />
                
                {/* default route */}
                <IndexRoute 
                    onEnter={(nextState, replace) => {
                        // redirect the user to the index page
                        replace("/dash");
                    }}/>

            </Route>
);

export default myRoutes;