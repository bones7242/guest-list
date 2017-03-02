import React, { PropTypes, Component } from 'react';
import './App.css';




class App extends Component {
	render() {
		return (
			<div className="App">
				{this.props.children}
			</div>
		);
	}
}

App.propTypes = {
	children: PropTypes.node,
	routes: PropTypes.array
};

export default App;
