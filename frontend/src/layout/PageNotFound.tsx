import React from 'react';
import pagenotfoundimg from '../media/images/404image.gif';

const PageNotFound = () => {
  return (
    <div style={{width: '100vw', height:'100vh', display:'flex', alignItems:'center', justifyContent:'center', backgroundColor:"#f1f5f9"}}>
      <img src={pagenotfoundimg} alt="404..." />
    </div>
  );
};

export default PageNotFound;
