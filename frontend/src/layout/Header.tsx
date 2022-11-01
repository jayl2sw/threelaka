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
import { Link } from 'react-router-dom';

const Header = () => {
  const [stageNum, setStageNum] = useState<number>(0);
  const onClickChangeStage = (nextStage: number) => {
    setStageNum(nextStage);
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
          <button>로그아웃</button>
        </LinkWrapper>
      </HeaderMenuRegion>
      <StudyProgressRegion>
        <ProgressBarContainer>
          <ProgressBarItem
            onClick={() => {
              onClickChangeStage(0);
            }}
          >
            R/L
          </ProgressBarItem>
          <ProgressBarItem
            onClick={() => {
              onClickChangeStage(1);
            }}
          >
            Speaking
          </ProgressBarItem>
          <ProgressBarItem
            onClick={() => {
              onClickChangeStage(2);
            }}
          >
            Writing
          </ProgressBarItem>
          <ProgressBarIndicator
            className={'indicator-' + stageNum}
          ></ProgressBarIndicator>
        </ProgressBarContainer>
      </StudyProgressRegion>
    </HeaderBlock>
  );
};

export default Header;
