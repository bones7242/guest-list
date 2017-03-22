import React, { PropTypes, Component } from 'react';
import { connect } from "react-redux";
  


class DashboardHeader extends Component {

    render(){
        // if this.props.book is null, return early
        if (!this.props.activeEvent) {
          return <div> Select an event to get started.</div>;
        }
        // otherwise...
        const activeEvent = this.props.activeEvent;
     
            
            Date.prototype.getFormattedTime = function () {
              var hours = this.getHours() == 0 ? "12" : this.getHours() > 12 ? this.getHours() - 12 : this.getHours();
              var minutes = (this.getMinutes() < 10 ? "0" : "") + this.getMinutes();
              var ampm = this.getHours() < 12 ? "AM" : "PM";
              var formattedTime = hours + ":" + minutes + " " + ampm;
              return formattedTime;
            }

            var newEventDate = new Date(activeEvent.date);
            var eventDate = newEventDate.toDateString();
            var eventTime = newEventDate.getFormattedTime();


       
        return (
            <div className="row grey darken-3"> 
          
                <div className="containerHeader">
                    <div className="col s12 m3 l3 headlinerHeader">
                      { activeEvent.headliner && <h2 className="headlinerText">{activeEvent.headliner}</h2> }
                    </div>

                    <div className="col s3 m3 l3 supportHeader">
                      { activeEvent.supportOne && <p className="supportHeader">{activeEvent.supportOne} </p> }
                      { activeEvent.date && <p className="supportHeader">{eventDate}</p> }
                    </div>

                    <div className="col s3 m3 l3 supportHeader">
                      { activeEvent.supportTwo && <p className="supportHeader">{activeEvent.supportTwo}</p> }
                      
                      { activeEvent.date && <p className="supportHeader">{eventTime}</p> }
                    </div>

                    <div className="col s3 m3 l3 supportHeader">
                    { activeEvent.supportThree && <p className="supportHeader">{activeEvent.supportThree}</p> }
                      <p className="supportHeader">Total: XX</p>
                      
                    </div>

                    <div className="row checkInHeader">
                      <div className="col s12 m12 l12 center-align checkInHeader">
                        <p className="center-align checkInHeader">XX Checked In</p>
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