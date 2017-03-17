//display event data and data functions bellow;
//appendix:
///1. total event counter
///2. total emails / attendees counter

///3. diference between total band allowance and attendees on list
///4. total attendees entered per event
///5. difference between number of attended attendees and allowance per event

////internal:
////1. total venues in co .data base
////2. total attendees in co. data base

// PER VENUE:

var totalEventsByVenue;
var totalAttendeesByVenue;
var totalAttendeesByEvent;
var attendeesEntered;

var totalEventsPerVenue = () => {
	totalEventsByVenue = totalEventsByVenue + 1;
}

var totalAttendeesPerVenue = () => {
	totalAttendeesByVenue = totalAttendeesByVenue + 1;
}

var headlinerSpotsLeft = () => {
	var hspotsLeft = (event.headliner.allotment - totalAttendeesByEvent.headliner);
}

var firstSpotsLeft = () => {
	var firstspotsLeft = (event.firstSupport.allotment - totalAttendeesByEvent.firstSupport);
}

var totalAttendeesPerEvent = () => {
	totalAttendeesByEvent = totalAttendeesByEvent + 1;
}

var totalAttendedPerEvent = () => {
	 attendeesEntered = attendeesEntered + 1;
}


var eventSpotsLeft = () => {
	var dateSpotsLeft = totalAttendeesByEvent - attendeesEntered;
}





