
import React, { PropTypes } from "react";
import {Route, Router, hashHistory, IndexRoute, Redirect} from "react-router";

import Auth from "./modules/Auth";

import App from './containers/App.jsx';
import HomePage from "./components/HomePage.jsx";
import LoginPage from "./containers/LoginPage.jsx";
import SignUpPage from "./containers/SignUpPage.jsx";
import DashboardPage from "./containers/DashboardPage.jsx";

import WelcomePage from "./components/WelcomePage.jsx";
import AddGuestForm from "./containers/AddGuestForm.jsx";
import AddEventForm from "./containers/AddEventForm.jsx";
import EditEventForm from "./containers/EditEventForm.jsx";
import EditGuestForm from "./containers/EditGuestForm.jsx";
import EventDetail from "./containers/EventDetail.jsx";

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers"
import ReduxPromise from "redux-promise";

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const myRoutes = (
    
    <Provider store={createStoreWithMiddleware(reducers)}>

        <Router history={hashHistory}>
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
                    <Route path="add-guest" component={AddGuestForm} />  
                    {/* add event*/}
                    <Route path="add-event" component={AddEventForm} /> 
                    {/* edit an event */}
                    <Route path="edit-event" component={EditEventForm} /> 
                    {/* edit a guest */}
                    <Route path="edit-guest" component={EditGuestForm} /> 
                    {/* view event*/} 
                    <Route path= "event" component={EventDetail} />                            
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