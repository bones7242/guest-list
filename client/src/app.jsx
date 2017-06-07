import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './routes.js';
import '../../server/static/vendor/materialize/js/materialize.min.js';

// Remove tap delay, essential for MaterialUI to work properly on mobile.
injectTapEventPlugin();

// Render the app component in the document at the div with id of "react-app".
ReactDom.render(routes, document.getElementById('react-app'));

