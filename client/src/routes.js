
import React from 'react';
import {Route, Router, browserHistory, IndexRoute } from 'react-router';

import Auth from './modules/Auth';

import App from './containers/App.jsx';
import HomePage from './components/HomePage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import DashboardPage from './containers/DashboardPage.jsx';

import WelcomePage from './components/WelcomePage.jsx';
import AddGuest from './containers/AddGuest.jsx';
import AddEvent from './containers/AddEvent.jsx';
import EditEvent from './containers/EditEvent.jsx';
import EditGuest from './containers/EditGuest.jsx';
import EventDetail from './containers/EventDetail.jsx';
import EditVenue from './containers/EditVenue.jsx';
import EventData from './containers/EventData.jsx';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import reducers from './reducers';
import ReduxPromise from 'redux-promise';

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore);
const myRoutes = (
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route
          path="dash"
          getComponent={(location, callback) => {
            if (Auth.isUserAuthenticated()) {
              callback(null, DashboardPage);
            } else {
              callback(null, HomePage);
            }
          }}
        >
          <IndexRoute component={WelcomePage} />
          <Route path="add-guest" component={AddGuest} />
          <Route path="add-event" component={AddEvent} />
          <Route path="edit-event" component={EditEvent} />
          <Route path="edit-guest" component={EditGuest} />
          <Route path="event" component={EventDetail} />
          <Route path="edit-venue" component={EditVenue} />
          <Route path="event-data" component={EventData} />
        </Route>
        <Route path="login" component={LoginPage} />
        <Route path="signup" component={SignUpPage} />
        <Route
          path="logout"
          onEnter={(nextState, replace) => {
            Auth.deauthenticateUser();
            replace('/');
          }}
        />
        <IndexRoute
          onEnter={(nextState, replace) => {
            replace('/dash');
          }}
        />
      </Route>
    </Router>
  </Provider>
);

export default myRoutes;
