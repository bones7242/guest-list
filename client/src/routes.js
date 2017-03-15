
import React from "react";
import {Route, Router, hashHistory, IndexRoute} from "react-router";

import HomePage from "./components/HomePage.jsx";
import LoginPage from "./containers/LoginPage.jsx";
import SignUpPage from "./containers/SignUpPage.jsx";
import DashboardPage from "./containers/DashboardPage.jsx";
import App from './containers/App.jsx';
import Auth from "./modules/Auth";


const myRoutes  = (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={HomePage}/>
        </Route>
    </Router>
);

export default myRoutes;




// const routes = {
//     // Base component (wrapper for the whole applications).
//     component: TopNav,
//     // Child routes.
//     childRoutes: [
//         {
//             // Index route.
//             path: "/",
//             // decide which component to render, depending on whether the user is authenticated.
//             getComponent: (location, callback) => {
//                 if (Auth.isUserAuthenticated()) {  // run "isUserAuthenticated" and it will return true or false.
//                     callback(null, DashboardPage);
//                 } else {
//                     callback(null, HomePage);
//                 }
//             }
//         },
//         {
//             // Log in route.
//             path: "/login",
//             component: LoginPage
//         },
//         {
//             // Sign up route.
//             path: "/signup",
//             component: SignUpPage
//         },
//         {
//             path: "/logout",
//             onEnter: (nextState, replace) => {
//                 // de-authenticate the user
//                 Auth.deauthenticateUser();
//                 // redirect the user to the index page
//                 replace("/");
//             }
//         }
//     ]
// };

// export default routes;