import React from 'react';
import MainHeader from './MainHeader';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <>
     <MainHeader></MainHeader> 

     <Outlet />
    </>
  );
};

export default MainLayout;