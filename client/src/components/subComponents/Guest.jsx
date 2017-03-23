import React, { PropTypes, Component } from 'react';

class Guest extends Component {
	constructor(props){
		super(props);

		this.updateCheckins = this.updateCheckins.bind(this);

	}

	updateCheckins() { 
		this.props.updateTotalChecked(this.props.guest.plusOne + 1); 
	}

	render(){
		if (!this.props.guest){
			return (<div> guest loading...</div>);
		}
		//otherwise...
		return (
			<tr className="grey darken-4 bordered">
				<td className="white-text text-blue-grey lighten-5 hoverable">{this.props.guest.name.toUpperCase()}</td>
				<td className="white-text text-blue-grey lighten-5">{this.props.guest.affiliation}</td>
				<td className="white-text text-blue-grey lighten-5">{this.props.guest.plusOne}</td>
				<td>
					{this.props.guest.vip}
					{this.props.guest.allAccess}
					{this.props.guest.photoPass}
					{this.props.guest.pressPass}
				</td>
				<td>
					{this.props.guest.houseList && <p>House</p>}
					{this.props.guest.headlinerList && <p>{this.props.headliner}</p>}
					{this.props.guest.supportOneList && <p>{this.props.supportOne}</p>}
					{this.props.guest.supportTwoList && <p>{this.props.supportTwo}</p>}
					{this.props.guest.supportThreeList && <p>{this.props.supportThree}</p>}
				</td>
				<td>
					<a className="waves-effect waves-light btn deep-purple darken-3 hoverable" onClick={this.updateCheckins}>ENTERED</a>
				</td>
				<td>
					
					<a className="btn-floating btn-small waves-effect waves-light blue-grey lighten-2 hoverable" style={{margin:"3px"}}><i className="material-icons">delete</i></a>
					
					<a className="btn-floating btn-small waves-effect waves-light blue-grey lighten-2 hoverable" style={{margin:"3px"}}><i className="material-icons">shuffle</i></a>
				</td>
			</tr>
		);
	}		
}



export default Guest;
