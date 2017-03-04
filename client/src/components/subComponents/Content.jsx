import React, { PropTypes, Component } from 'react';
import './Content.css';


class Content extends Component {
	render() {
		return (
			<div className="content">
				<p> this is the Content </p>
			</div>
		);
	}
}

Content.propTypes = {
	children: PropTypes.node,
	routes: PropTypes.array
};

export default Content;
