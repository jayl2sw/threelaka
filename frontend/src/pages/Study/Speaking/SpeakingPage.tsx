import React from 'react';
import VoiceRecoding from './components/VoiceRecoding';
import WebCam from './components/WebCam';
import EssayScript from './components/EssayScript';
import {
  SpeakingPageBlock,
  VideoAudioButtonContainer,
} from '../../../styles/Speaking/SpeakingStyle';

const SpeakingPage = () => {
  return (
    <SpeakingPageBlock>
      <VideoAudioButtonContainer>영상/음성 선택 버튼</VideoAudioButtonContainer>
      <WebCam></WebCam>
      <EssayScript />
    </SpeakingPageBlock>
  );
};

export default SpeakingPage;
