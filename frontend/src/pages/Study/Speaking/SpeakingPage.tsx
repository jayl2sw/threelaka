import React from 'react';
import VoiceRecoding from './components/VoiceRecoding';
import WebCam from './components/WebCam';
import EssayScript from './components/EssayScript';
import {
  SpeakingPageBlock,
  VideoAudioButtonContainer,
  VideoAudioContainer,
  ModePickContainer,
} from '../../../styles/Speaking/SpeakingStyle';

const SpeakingPage = () => {
  return (
    <SpeakingPageBlock>
      <VideoAudioButtonContainer>영상/음성 선택 버튼</VideoAudioButtonContainer>
      <WebCam></WebCam>
      {/* <VideoAudioContainer>영상 또는 음성 화면</VideoAudioContainer> */}
      <ModePickContainer>연습모드/실전모드 버튼</ModePickContainer>
      <EssayScript />
    </SpeakingPageBlock>
  );
};

export default SpeakingPage;
