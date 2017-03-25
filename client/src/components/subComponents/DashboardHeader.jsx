import React, { PropTypes, Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router';
import moment from 'moment';

import DefaultSplash from "./DefaultSplash.jsx";
  
class DashboardHeader extends Component {
    render(){
        // if this.props.book is null, return early
        if (!this.props.activeEvent) {
          return <DefaultSplash message="Select an event to get started" />;
        }
        
        // otherwise...
        // Date.prototype.getFormattedTime = function () {
        //     var hours = this.getHours() == 0 ? "12" : this.getHours() > 12 ? this.getHours() - 12 : this.getHours();
        //     var minutes = (this.getMinutes() < 10 ? "0" : "") + this.getMinutes();
        //     var ampm = this.getHours() < 12 ? "AM" : "PM";
        //     var formattedTime = hours + ":" + minutes + " " + ampm;
        //     return formattedTime;
        // }
        var newEventDate = new Date(this.props.activeEvent.date);
        var eventDate = newEventDate.toDateString();
        // var eventTime = newEventDate.getFormattedTime();
        //var eventDate = moment(newEventDate).format("dddd MMM Do YY");
        var eventTime = moment(newEventDate).format("h:mm a");
       
        return (
            <div className="row" style={{}}> 
                <div className="containerHeader">
                    <div className="row">
                        <div className="col s4 m4 l4 headlinerHeader" style={{padding:"0px"}}>
                            { this.props.activeEvent.headliner && <h2 className="headlinerText" style={{marginTop: "0"}}>{this.props.activeEvent.headliner}</h2> }
                            
                            { this.props.activeEvent.date && <p>{eventDate}</p> }
                            
                            { this.props.activeEvent.date && <p>{eventTime}</p> }

                        </div>
                        <div className="col s4 m4 l3 supportHeader">

                            { this.props.activeEvent.supportOne && <h5 style={{color:"#888", marginTop: "0"}} >{this.props.activeEvent.supportOne} </h5> }
                            { this.props.activeEvent.supportTwo && <h5 style={{color:"#888"}}>{this.props.activeEvent.supportTwo}</h5> }
                            { this.props.activeEvent.supportThree && <h5 style={{color:"#888"}}>{this.props.activeEvent.supportThree}</h5> }

                        </div>
                        <div className="col s3 m3 l3 supportHeader">

                            <p style={{marginTop: "0"}}>Total guests:</p>
                            {this.props.activeEvent.totalGuest && <p >{this.props.activeEvent.totalGuest}</p>}

                            <p>Total checked in:</p>
                            {this.props.activeEvent.totalChecked && <p>{this.props.activeEvent.totalChecked}</p>}

                        </div>

                        <div className="col s2 m2 l2">

                            <Link className="btn-floating btn-small waves-effect waves-light blue-grey lighten-2 hoverable" style={{margin: "3px"}}>del</Link>

                            <Link className="btn-floating btn-small waves-effect waves-light blue-grey lighten-2 hoverable" style={{margin: "3px"}} to="/dash/edit-event">add</Link>

                        </div>
                        
                    </div>
                   
                </div>
                
            </div>
        );
    }
}



function mapStateToProps(state) {

	// whatever is returned will be mapped to the props of this component
	return {
		activeEvent: state.activeEvent
	};
}

export default connect(mapStateToProps)(DashboardHeader);