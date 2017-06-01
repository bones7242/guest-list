/* This component will display the main content to the right of the nav */

import React from 'react';

const Content = (children) => {
  return (
    <div className="content" >
      <div className="row">
        <div className="col s12 m12 l12">
          {children.children}
        </div>
      </div>
    </div>
  );
};

export default Content;
