import React, { useState } from 'react';
import WebCam from './components/WebCam';
import PickSpeakingMode from './components/PickSpeakingMode';
import EssayScript from './components/EssayScript';
import SpeechTest from './components/SpeechTest';
import {
  SpeakingPageBlock,
  VideoAudioButtonContainer,
} from '../../../styles/Speaking/SpeakingStyle';
import VoiceRecorder from './components/VoiceRecorder';
import PickedMode from './components/speakingMode';

const SpeakingPage = () => {
  // 발음 테스트 클릭
  const onClickProTest = () => {};

  // 실전녹화 선택

  return (
    <SpeakingPageBlock>
      <PickSpeakingMode />
      <SpeechTest />
      {/* <WebCam /> */}
      {/* <VoiceRecorder /> */}
      <PickedMode />
      {/* <EssayScript /> */}
    </SpeakingPageBlock>
  );
};

export default SpeakingPage;
