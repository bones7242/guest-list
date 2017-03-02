import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router, browserHistory } from 'react-router';
import makeRoutes from './routes';

const appEntry = <Router history={browserHistory}>{makeRoutes()}</Router>;
ReactDOM.render(
	appEntry,
	document.getElementById('root')
);
