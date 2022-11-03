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
import { useParams, useNavigate } from 'react-router-dom';
import { StudyPageParams } from '../models';
import { Link } from 'react-router-dom';

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
          <button>로그아웃</button>
        </LinkWrapper>
      </HeaderMenuRegion>
      <StudyProgressRegion>
        <ProgressBarContainer>
          <ProgressBarItem
            onClick={(e) => {
              moveToNext(e, 'READING', pageParams);
            }}
          >
            Reading&Listening
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
