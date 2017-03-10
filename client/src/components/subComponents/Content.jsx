
//will contain newevent.js(form), addguestform.js(form), eventinfo.js(top info bar), and user list
import React, { PropTypes, Component } from 'react';
//import './Content.css';


class Content extends Component {
	render() {
		return (
			<div className="content" className="left">
				<div className="row">
					<div className="col s12 m8 l9" className="valign-wrapper">

					</div>
				</div>
			</div>
		);
	}
}

Content.propTypes = {
	children: PropTypes.node,
	routes: PropTypes.array
};

export default Content;
