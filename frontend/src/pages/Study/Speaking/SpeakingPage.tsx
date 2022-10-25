import React from 'react';
import {
  SpeakingPageBlock,
  VideoAudioButtonContainer,
  VideoAudioContainer,
  ModePickContainer,
  EssayContainer,
} from '../../../styles/Speaking/SpeakingStyle';

const SpeakingPage = () => {
  return (
    <SpeakingPageBlock>
      <VideoAudioButtonContainer>영상/음성 선택 버튼</VideoAudioButtonContainer>
      <VideoAudioContainer>영상 또는 음성 화면</VideoAudioContainer>
      <ModePickContainer>연습모드/실전모드 버튼</ModePickContainer>
      <EssayContainer>에세이 나오는 부분</EssayContainer>
    </SpeakingPageBlock>
  );
};

export default SpeakingPage;
