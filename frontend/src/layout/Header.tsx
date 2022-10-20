import React from 'react';
import {
  HeaderBlock,
  HeaderMenuRegion,
  StudyProgressRegion,
  LinkWrapper,
} from '../styles/Layout/HeaderStyle';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <HeaderBlock>
      <HeaderMenuRegion>
        <LinkWrapper bgColor="green" widthSize="15vw">
          <Link to="/">홈</Link>
        </LinkWrapper>
        <LinkWrapper bgColor="#adff45" widthSize="15vw">
          <Link to="/videos">비디오스</Link>
        </LinkWrapper>
        <LinkWrapper bgColor="yellow" widthSize="15vw">
          <Link to="/dashboard/profile">프로필</Link>
        </LinkWrapper>
      </HeaderMenuRegion>
      <StudyProgressRegion></StudyProgressRegion>
    </HeaderBlock>
  );
};

export default Header;
