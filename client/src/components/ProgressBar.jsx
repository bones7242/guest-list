/* progress bar for eventData */
import React, { PropTypes } from "react";
import NavBar from "../containers/NavBar.jsx";
import Content from "./Content.jsx";

const ProgressBar = ({children}) => {
    return (
        <div className="meter">
            <span style="width: 25%"></span>
        </div>
    );
}

export default ProgressBar;