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
import { useParams, useNavigate, redirect } from 'react-router-dom';
import { StudyPageParams } from '../models';
import { Link } from 'react-router-dom';
import { studyActions } from '../features/study/study-slice';
import { useAppDispatch } from '../utils/hooks';
import { LogoutIcon } from '../styles/Layout/HeaderStyle';
import { authActions } from '../features/auth/authSlice';

export interface IheaderProps {
  customMoveToNext: (
    e: React.MouseEvent<HTMLSpanElement>,
    nextStep: string,
    pageParams: StudyPageParams
  ) => void;
}

const Header = ({ customMoveToNext }: IheaderProps) => {
  const pageParams: StudyPageParams = useParams() as any;
  const moveToNext = customMoveToNext;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate('/auth/login');
  };

  // const moveToNext = (
  //   e: React.MouseEvent<HTMLSpanElement>,
  //   nextStep: string
  // ) => {
  //   // 1. 스테이지 업데이트 액션 dispatch

  //   const stageInfo = {
  //     learningRecordId: pageParams.learningRecordId,
  //     stage: nextStep,
  //   };
  //   dispatch(studyActions.UpdateStudyStageStart(stageInfo));
  //   // 2. 라이팅 페이지로 이동
  //   navigate(
  //     `/study/${nextStep.toLocaleLowerCase()}/${
  //       pageParams.learningRecordId
  //     }/${nextStep}/${pageParams.videoId}`
  //   );
  // };
  const goToHome = () => {
    dispatch(studyActions.resetStudystate());
    navigate('/');
  };

  return (
    <HeaderBlock>
      <HeaderMenuRegion>
        <LinkWrapper bgColor="black" widthSize="10vw">
          {/* <Link to="/">home</Link> */}
        </LinkWrapper>
        <LinkWrapper bgColor="black" widthSize="10vw">
          {/* <Link to="/videos">videos</Link> */}
        </LinkWrapper>

        <TitleRegion onClick={goToHome}>
          <img
            src="https://threelaka.s3.ap-northeast-2.amazonaws.com/mainlogo.png"
            alt="스리라까 로고"
          />
        </TitleRegion>
        {/* <LinkWrapper bgColor="black" widthSize="10vw">
          <Link to="/auth/dashboard/1">dashboard</Link>
        </LinkWrapper>
        <LinkWrapper bgColor="black" widthSize="10vw">
          <Link to="/auth/guild/1">guild</Link>
        </LinkWrapper> */}
        <LinkWrapper bgColor="black" widthSize="10vw">
          <LogoutIcon onClick={handleLogout}></LogoutIcon>
        </LinkWrapper>
      </HeaderMenuRegion>
      <StudyProgressRegion>
        <ProgressBarContainer>
          <ProgressBarItem
            onClick={(e) => {
              moveToNext(e, 'READING', pageParams);
            }}
          >
            Reading & Listening
          </ProgressBarItem>
          <ProgressBarItem
            onClick={(e) => {
              moveToNext(e, 'WRITING', pageParams);
            }}
          >
            Writing
          </ProgressBarItem>
          <ProgressBarItem
            onClick={(e) => {
              moveToNext(e, 'SPEAKING', pageParams);
            }}
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
