// Import dependencies.
import React from "react";
import ReactDom from "react-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
// Import routes.
import { browserHistory, Router } from "react-router";
import routes from "./routes.js";

import "../../server/static/vendor/materialize/js/materialize.min.js";

// Remove tap delay, essential for MaterialUI to work properly on mobile.
injectTapEventPlugin();

// 2. Render the app component in the document at the div with id of "react-app".
ReactDom.render(routes(), document.getElementById("react-app"));

