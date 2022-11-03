import React, { useState } from 'react';
import {
  TitleRegion,
} from '../styles/Layout/HeaderStyle';
import {
  MainHeaderMenuRegion,
  MainLinkWrapper
} from '../styles/Layout/MainHeaderStyle';
import { Link } from 'react-router-dom';
import { LogoutIcon } from '../styles/Layout/HeaderStyle';
import { useAppDispatch } from '../utils/hooks';
import { authActions } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
const MainHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    console.log('이거디나');
    dispatch(authActions.logout());
    navigate('/auth/login');
  };
  return (
    <MainHeaderMenuRegion>
      <MainLinkWrapper bgColor="transparent" widthSize="10vw" style={{ color: "black"}}>
        <Link to="/">Home</Link>
      </MainLinkWrapper>
      <MainLinkWrapper bgColor="transparent" widthSize="10vw">
        <Link to="/videos">Videos</Link>
      </MainLinkWrapper>
      {/* <TitleRegion>THREELAKA</TitleRegion> */}
      <MainLinkWrapper bgColor="transparent" widthSize="10vw">
        <Link to="/auth/dashboard/1">dashboard</Link>
      </MainLinkWrapper>
      <MainLinkWrapper bgColor="transparent" widthSize="10vw">
        <LogoutIcon onClick={handleLogout}></LogoutIcon>
      </MainLinkWrapper>
    </MainHeaderMenuRegion>
  );
};

export default MainHeader;
