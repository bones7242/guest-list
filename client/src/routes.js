import Base from "./components/Base.jsx";
import HomePage from "./components/HomePage.jsx";
import LoginPage from "./containers/LoginPage.jsx";
import SignUpPage from "./containers/SignUpPage.jsx";
import DashboardPage from "./components/Dashboard.jsx";
import Auth from "./modules/Auth";

const routes = {
    // Base component (wrapper for the whole applications).
    component: Base,
    // Child routes.
    childRoutes: [
        {
            // Index route.
            path: "/",
            // decide which component to render, depending on whether the user is authenticated.
            getComponent: (location, callback) => {
                if (Auth.isUserAuthenticated()) {
                    callback(null, DashboardPage);
                } else {
                    callback(null, HomePage);
                }
            }
        },
        {
            // Log in route.
            path: "/login",
            component: LoginPage
        },
        {
            // Sign up route.
            path: "/signup",
            component: SignUpPage
        },
        {
            path: "/logout",
            onEnter: (nextState, replace) => {
                // de-authenticate the user
                Auth.deauthenticateUser();
                // redirect the user to the index page
                replace("/");
            }
        }
    ]
};

export default routes;