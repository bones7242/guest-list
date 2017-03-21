import React, { PropTypes, Component } from 'react';
//import './Attendee.css';


const Guest = ({guest}) => {
	return (
		<div>{guest.name}</div>
		/*<tr>
			<td>{guest.name}</td>
			<td>{guest.email}</td>
			<td>{guest.affiliation}</td>
			<td>{guest.phone}</td>
			<td>{guest.plusOne}</td>
			<td>
				{guest.vip}
				{guest.allAccess}
				{guest.photoPass}
				{guest.pressPass}
			</td>
			<td>
				{guest.houseList}
				{guest.headlinerList}
				{guest.supportOneList}
				{guest.supportTwoList}
				{guest.supportthreeList}
			</td>
			<td>
				<input type="radio">Checked In</input>
			</td>
			<td>
				<button>Delete</button>
				<button>Edit</button>
			</td>
		</tr>*/
	);
}



export default Guest;
