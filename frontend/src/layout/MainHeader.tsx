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
          비디오스
        </Link>
      </MainLinkWrapper>
      <MainLinkWrapper bgColor="transparent" widthSize="10vw">
        <Link to="/auth/dashboard/1" style={{ fontSize: '1.2vw' }}>
          대시보드
        </Link>
      </MainLinkWrapper>
      <MainLinkWrapper bgColor="transparent" widthSize="10vw">
        <Link to="/auth/guild/1" style={{ fontSize: '1.2vw' }}>
          길드
        </Link>
      </MainLinkWrapper>
      <MainLinkWrapper bgColor="transparent" widthSize="10vw">
        <Link
          to="/auth/login"
          onClick={handleLogout}
          style={{ fontSize: '1.2vw' }}
        >
          로그아웃
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
