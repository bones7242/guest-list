
import React, { PropTypes } from "react";
import {Route, Router, hashHistory, IndexRoute, Redirect} from "react-router";

import Auth from "./modules/Auth";

import App from './containers/App.jsx';
import HomePage from "./components/HomePage.jsx";
import LoginPage from "./containers/LoginPage.jsx";
import SignUpPage from "./containers/SignUpPage.jsx";
import DashboardPage from "./containers/DashboardPage.jsx";

import AddGuestForm from "./components/subComponents/AddGuestForm.jsx";
import AddEventForm from "./components/subComponents/AddEventForm.jsx";
import EditEventForm from "./components/subComponents/EditEventForm.jsx";
import EventDetail from "./components/subComponents/EventDetail.jsx";

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers"
import ReduxPromise from "redux-promise";

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);

const myRoutes = (
    
    <Provider store={createStoreWithMiddleware(reducers)}>

        <Router history={hashHistory}>

            <Route path="/" component={App}>

                {/*one of the below routes will be passed to App as children*/}
                <Route path="dash" 
                    getComponent={(location, callback) => {
                        if (Auth.isUserAuthenticated()) {  
                            callback(null, DashboardPage);
                        } else {
                            callback(null, HomePage);
                        };
                    }
                }>
            
                    {/* add a new guest */}
                    <Route path="add-guest" component={AddGuestForm} />  
                    {/* add event*/}
                    <Route path="add-event" component={AddEventForm} /> 
                    {/* edit an event */}
                    <Route path="edit-event" component={EditEventForm} /> 
                    {/* view event*/} 
                    <Route path= "event" component={EventDetail} />
                    
            
                </Route>
            
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