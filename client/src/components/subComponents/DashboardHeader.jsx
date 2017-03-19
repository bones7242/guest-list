import React, { PropTypes, Component } from 'react';


const DashboardHeader = ({currentEvent}) => {
  console.log("current event", currentEvent)
    return (
        <div className="row grey darken-3"> 
            {/*only display the rest of the info if CurrentEvent is not null*/}
            {currentEvent && 
                <div className="containerHeader">
                    <div className="col s12 m3 l3 headlinerHeader">
                      { currentEvent.headliner && <h2>{currentEvent.headliner}</h2> }
                    </div>

                    <div className="col s3 m3 l3 supportHeader">
                      { currentEvent.supportOne && <p className="supportHeader">{currentEvent.supportOne} </p> }
                      <p className="supportHeader">Date</p>
                    </div>

                    <div className="col s3 m3 l3 supportHeader">
                      { currentEvent.supportTwo && <p className="supportHeader">{currentEvent.supportTwo}</p> }
                      
                      <p className="supportHeader">Time</p>
                    </div>

                    <div className="col s3 m3 l3 supportHeader">
                    { currentEvent.supportThree && <p className="supportHeader">{currentEvent.supportThree}</p> }
                      <p className="supportHeader">Total: XX</p>
                      
                    </div>

                    <div className="row checkInHeader">
                      <div className="col s12 m12 l12 center-align checkInHeader">
                        <p className="center-align checkInHeader">XX Checked In</p>
                      </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default DashboardHeader;