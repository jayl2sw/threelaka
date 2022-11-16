import React, { useState } from 'react';
// import { TitleRegion } from '../styles/Layout/HeaderStyle';
import {
  MainHeaderMenuRegion,
  MainLinkWrapper,
} from '../styles/Layout/MainHeaderStyle';
import { Link } from 'react-router-dom';
// import { LogoutIcon } from '../styles/Layout/HeaderStyle';
import { useAppDispatch } from '../utils/hooks';
import { authActions } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
const MainHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate('/auth/login');
  };

  return (
    <MainHeaderMenuRegion>
      <MainLinkWrapper bgColor="transparent" widthSize="10vw"></MainLinkWrapper>
      <MainLinkWrapper bgColor="transparent" widthSize="10vw">
        <Link to="/videos" style={{ fontSize: '1.2vw' }}>
          VIDEOS
        </Link>
      </MainLinkWrapper>
      <MainLinkWrapper bgColor="transparent" widthSize="10vw">
        <Link to="/auth/dashboard/1" style={{ fontSize: '1.2vw' }}>
          DASHBOARD
        </Link>
      </MainLinkWrapper>
      <MainLinkWrapper bgColor="transparent" widthSize="10vw">
        <Link to="/auth/guild/1" style={{ fontSize: '1.2vw' }}>
          GUILD
        </Link>
      </MainLinkWrapper>
      <MainLinkWrapper bgColor="transparent" widthSize="10vw">
        <Link
          to="/auth/login"
          onClick={handleLogout}
          style={{ fontSize: '1.2vw' }}
        >
          LOGOUT
        </Link>
        {/* <LogoutIcon
          onClick={handleLogout}
          style={{ width: '15vw' }}
        ></LogoutIcon> */}
      </MainLinkWrapper>
    </MainHeaderMenuRegion>
  );
};

export default MainHeader;
