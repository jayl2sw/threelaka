import React, { useState } from 'react';
import WebCam from './components/WebCam';
import VideoOrAudio from './components/VideoOrAudio';
import EssayScript from './components/EssayScript';

import {
  SpeakingPageBlock,
  VideoAudioButtonContainer,
} from '../../../styles/Speaking/SpeakingStyle';
import VoiceRecorder from './components/VoiceRecorder';

const SpeakingPage = () => {
  const [proTestOn, setProTestOn] = useState<boolean>(true);
  const [webcamOn, setWebcamOn] = useState<boolean>(false);
  const [voiceOn, setVoiceOn] = useState<boolean>(false);

  // 발음 테스트 클릭
  const onClickProTest = () => {
    setProTestOn(true);
    setWebcamOn(false);
    setVoiceOn(false);
  };

  // 실전녹화 선택
  const onClickWebCam = () => {
    setProTestOn(false);
    setWebcamOn(true);
    setVoiceOn(false);
  };

  // 실전녹음 선택
  const onClickVoice = () => {
    setProTestOn(false);
    setWebcamOn(false);
    setVoiceOn(true);
  };

  return (
    <SpeakingPageBlock>
      <VideoOrAudio />
      <WebCam />
      <VoiceRecorder />
      <EssayScript />
    </SpeakingPageBlock>
  );
};

export default SpeakingPage;
