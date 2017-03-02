import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import Dash from './containers/Dash';
import Login from './containers/Login';


export default () => {
	return <Route path="/" component={App}>
		<IndexRoute component={Login}/>

		<Route path="/dash" component={Dash}>


		</Route>
		
	</Route>;
};
