import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const StudyLayout = () => {
  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        background:
          'linear-gradient(106.56deg, rgba(132, 176, 226, 0.5) 7.3%, rgba(88, 172, 240, 0.430729) 77.68%, rgba(174, 243, 147, 0.5) 99.32%)',
      }}
    >
      <Header></Header>
      <Outlet />
    </div>
  );
};

export default StudyLayout;
