import React, { useState } from 'react';
import {
  HeaderBlock,
  HeaderMenuRegion,
  StudyProgressRegion,
  LinkWrapper,
  TitleRegion,
  ProgressBarContainer,
  ProgressBarIndicator,
  ProgressBarItem,
} from '../styles/Layout/HeaderStyle';
import { useParams } from 'react-router-dom';
import { StudyPageParams } from '../models';
import { Link } from 'react-router-dom';
import { LogoutIcon } from '../styles/Layout/HeaderStyle';
import { useAppDispatch } from '../utils/hooks';
import { useNavigate } from 'react-router-dom';
import { authActions } from '../features/auth/authSlice';
const Header = () => {
  const pageParams: StudyPageParams = useParams() as any;
  const [stageNum, setStageNum] = useState<number>(0);
  const onClickChangeStage = (nextStage: number) => {
    setStageNum(nextStage);
  };
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate('/auth/login');
  };
  return (
    <HeaderBlock>
      <HeaderMenuRegion>
        <LinkWrapper bgColor="black" widthSize="10vw">
          <Link to="/">홈</Link>
        </LinkWrapper>
        <LinkWrapper bgColor="black" widthSize="10vw">
          <Link to="/videos">비디오스</Link>
        </LinkWrapper>
        <TitleRegion>THREELAKA</TitleRegion>
        <LinkWrapper bgColor="black" widthSize="10vw">
          <Link to="/auth/dashboard/1">대시보드</Link>
        </LinkWrapper>
        <LinkWrapper bgColor="black" widthSize="10vw">
          <LogoutIcon onClick={handleLogout}></LogoutIcon>
        </LinkWrapper>
      </HeaderMenuRegion>
      <StudyProgressRegion>
        <ProgressBarContainer>
          <ProgressBarItem
          // onClick={() => {
          //   onClickChangeStage(0);
          // }}
          >
            Reading&Listening
          </ProgressBarItem>
          <ProgressBarItem
            onClick={() => {
              onClickChangeStage(1);
            }}
          >
            Writing
          </ProgressBarItem>
          <ProgressBarItem
            onClick={() => {
              onClickChangeStage(2);
            }}

            // onClick={() => {
            //   onClickChangeStage(1);
            // }}

            // onClick={() => {
            //   onClickChangeStage(1);
            // }}
          >
            Writing
          </ProgressBarItem>
          <ProgressBarItem
          // onClick={() => {
          //   onClickChangeStage(2);
          // }}
          >
            Speaking
          </ProgressBarItem>
          <ProgressBarIndicator
            className={'indicator-' + pageParams.stage}
          ></ProgressBarIndicator>
        </ProgressBarContainer>
      </StudyProgressRegion>
    </HeaderBlock>
  );
};

export default Header;
