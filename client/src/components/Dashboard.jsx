/*  This component will be rendered inside the dashboard page.  It will render left-hand navbar and the main content component. */

import React, { PropTypes } from 'react';
import NavBar from '../containers/NavBar';
import Content from './Content';

const Dashboard = ({ children }) => {
  return (
    <div className="row dashboard">
      <div className="col s3 m3 l3 grey darken-3" style={{ padding: '0px' }}>
        {/* the NavBar will show the logo and all the upcoming events */}
        <NavBar />
      </div>
      <div className="col s9 m9 l9" style={{ padding: '0px' }}>
        {/* Content will show the main page content */ }
        <Content> {children.children} </Content>
      </div>
    </div>
  );
}

Dashboard.propTypes = {
  children: PropTypes.func.isRequired,
};

export default Dashboard;
