
import React, { PropTypes } from "react";
import {Route, Router, browserHistory, IndexRoute, Redirect} from "react-router";

import Auth from "./modules/Auth";

import App from './containers/App.jsx';
import HomePage from "./components/HomePage.jsx";
import LoginPage from "./containers/LoginPage.jsx";
import SignUpPage from "./containers/SignUpPage.jsx";
import DashboardPage from "./containers/DashboardPage.jsx";

import WelcomePage from "./components/WelcomePage.jsx";
import AddGuest from "./containers/AddGuest.jsx";
import AddEvent from "./containers/AddEvent.jsx";
import EditEvent from "./containers/EditEvent.jsx";
import EditGuest from "./containers/EditGuest.jsx";
import EventDetail from "./containers/EventDetail.jsx";
import EditVenue from "./containers/EditVenue.jsx";

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers"
import ReduxPromise from "redux-promise";

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const myRoutes = (
    
    <Provider store={createStoreWithMiddleware(reducers)}>

        <Router history={browserHistory}>
            {/* main route */}
            <Route path="/" component={App}>

                {/* route if logged in.  One of the below routes will be passed to App as children*/}
                <Route path="dash" 
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
                    <Route path="add-guest" component={AddGuest} />
                    {/* add event*/}
                    <Route path="add-event" component={AddEvent} />
                    {/* edit an event */}
                    <Route path="edit-event" component={EditEvent} />
                    {/* edit a guest */}
                    <Route path="edit-guest" component={EditGuest} />
                    {/* view event*/}
                    <Route path= "event" component={EventDetail} />
                    {/* edit venue */} 
                    <Route path= "edit-venue" component={EditVenue} /> 
                </Route>
                
                {/* login route */}
                <Route path="login" component={LoginPage}/>
                
                {/* signup route */}
                <Route path="signup" component={SignUpPage}/>
                
                {/* log out route */}
                <Route path="logout" 
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
        
        </Router>

    </Provider>

);

export default myRoutes;