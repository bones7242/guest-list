import React, { PropTypes, Component } from 'react';
import './Dash.css';

import NavBar from "../components/NavBar";
import Content from "../components/Content";


class Dash extends Component {
	render() {
		return (
			<div className="Dash">
				<p> this is the dash</p>
				<a href="/">go to login</a>
				<NavBar />
				<Content />
			</div>
		);
	}
}

Dash.propTypes = {
	children: PropTypes.node,
	routes: PropTypes.array
};

export default Dash;
