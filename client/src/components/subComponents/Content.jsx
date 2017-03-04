import React, { PropTypes, Component } from 'react';
//import './Content.css';


class Content extends Component {
	render() {
		return (
			<div className="content">
				<p>This is the Content subComponent.</p>
			</div>
		);
	}
}

Content.propTypes = {
	children: PropTypes.node,
	routes: PropTypes.array
};

export default Content;
