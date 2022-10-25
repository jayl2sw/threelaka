import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const StudyLayout = () => {
  return (
    <>
      <Header></Header>

      <Outlet />
    </>
  );
};

export default StudyLayout;
