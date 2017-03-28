import React, { PropTypes } from "react";
import { Link, IndexLink } from "react-router";
import Auth from "../modules/Auth";

// materialize-ui
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";

const TopNav = () => {
    return (
        <AppBar
            title="theGuestList.io"
            showMenuIconButton={false}
            //onTitleTouchTap={}
            iconElementRight={
                // conditional statement to decide which links to render
                Auth.isUserAuthenticated() ? (
                    <FlatButton href="/logout" label="Log out"/>
                ) : (
                    <div>
                        <FlatButton href="/login" label="Log in" />
                        <FlatButton href="/signup" label="Sign up" />
                    </div>
                )
            }
        />                
    );
};

 export default TopNav;