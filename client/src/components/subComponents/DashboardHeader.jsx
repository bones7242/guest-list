import React, { PropTypes, Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router';
import SearchBar from './SearchBar.jsx';
  
class DashboardHeader extends Component {
    render(){
        // if this.props.book is null, return early
        if (!this.props.activeEvent) {
          return <div> Select an event to get started.</div>;
        }
        // otherwise...
        Date.prototype.getFormattedTime = function () {
            var hours = this.getHours() == 0 ? "12" : this.getHours() > 12 ? this.getHours() - 12 : this.getHours();
            var minutes = (this.getMinutes() < 10 ? "0" : "") + this.getMinutes();
            var ampm = this.getHours() < 12 ? "AM" : "PM";
            var formattedTime = hours + ":" + minutes + " " + ampm;
            return formattedTime;
        }
        var newEventDate = new Date(this.props.activeEvent.date);
        var eventDate = newEventDate.toDateString();
        var eventTime = newEventDate.getFormattedTime();
       
        return (
            <div className="row grey darken-3" style={{borderTopStyle:"solid", borderColor: "#4527a0", borderWidth: "1px"}}> 
                <div className="containerHeader">
                    <div className="row">
                        <div className="col s4 m4 l4 headlinerHeader">
                            { this.props.activeEvent.headliner && <h2 className="headlinerText">{this.props.activeEvent.headliner}</h2> }
                            
                            { this.props.activeEvent.date && <p>{eventDate}</p> }
                            
                            { this.props.activeEvent.date && <p>{eventTime}</p> }
                        </div>
                        <div className="col s4 m4 l3 supportHeader">
                            { this.props.activeEvent.supportOne && <p>{this.props.activeEvent.supportOne} </p> }
                            { this.props.activeEvent.supportTwo && <p>{this.props.activeEvent.supportTwo}</p> }
                            { this.props.activeEvent.supportThree && <p>{this.props.activeEvent.supportThree}</p> }
                        </div>
                        <div className="col s3 m3 l3 supportHeader">
                            <p>Total guests:</p>
                            {this.props.activeEvent.totalGuest && <p>{this.props.activeEvent.totalGuest}</p>}
                            <p>Total checked in:</p>
                            {this.props.activeEvent.totalChecked && <p>{this.props.activeEvent.totalChecked}</p>}
                        </div>
                        <div className="col s1 m1 l1">
                            <Link className=" right-align btn-floating btn-small waves-effect waves-light blue-grey lighten-2 hoverable" to="/dash/edit-event"><i className="material-icons">shuffle</i></Link>
                        </div>
                        <div>
                          <SearchBar onChangeSearchTerm={this.props.onChangeSearchTerm} />
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