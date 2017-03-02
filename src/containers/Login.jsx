import React, { PropTypes, Component } from 'react';
import './Login.css';




class Login extends Component {
	render() {
		return (
			<div className="Login">
				<p> this is the log in</p>
				<a href="/dash">go to dash</a>
			</div>
		);
	}
}

Login.propTypes = {
	children: PropTypes.node,
	routes: PropTypes.array
};

export default Login;
