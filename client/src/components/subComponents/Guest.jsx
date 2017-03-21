import React, { PropTypes, Component } from 'react';
//import './Attendee.css';


const Guest = ({guest, headliner, supportOne, supportTwo, supportThree}) => {
	return (
		<tr>
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
				{guest.houseList && <p>House</p>}
				{guest.headlinerList && <p>{headliner}</p>}
				{guest.supportOneList && <p>{supportOne}</p>}
				{guest.supportTwoList && <p>{supportTwo}</p>}
				{guest.supportThreeList && <p>{supportThree}</p>}
			</td>
			<td>
				<button>Check In</button>
			</td>
			<td>
				<button>Delete</button>
				<button>Edit</button>
			</td>
		</tr>
	);
}



export default Guest;
