import React, { useState } from 'react';
import {
  HeaderMenuRegion,
  LinkWrapper,
  TitleRegion,
} from '../styles/Layout/HeaderStyle';
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
    <HeaderMenuRegion>
      <LinkWrapper bgColor="black" widthSize="10vw">
        <Link to="/">Home</Link>
      </LinkWrapper>
      <LinkWrapper bgColor="black" widthSize="10vw">
        <Link to="/videos">Videos</Link>
      </LinkWrapper>
      <TitleRegion>THREELAKA</TitleRegion>
      <LinkWrapper bgColor="black" widthSize="10vw">
        <Link to="/auth/dashboard/1">대시보드</Link>
      </LinkWrapper>
      <LinkWrapper bgColor="black" widthSize="10vw">
        <LogoutIcon onClick={handleLogout}></LogoutIcon>
      </LinkWrapper>
    </HeaderMenuRegion>
  );
};

export default MainHeader;
