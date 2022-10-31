import React, { useState } from 'react';
import {
  HeaderMenuRegion,
  LinkWrapper,
  TitleRegion,
} from '../styles/Layout/HeaderStyle';
import { Link } from 'react-router-dom';

const MainHeader = () => {
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
    </HeaderMenuRegion>
  );
};

export default MainHeader;
