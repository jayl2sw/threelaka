import React from 'react';
import VoiceRecoding from './components/VoiceRecoding';
import WebCam from './components/WebCam';
import VideoOrAudio from './components/VideoOrAudio';
import EssayScript from './components/EssayScript';
import {
  SpeakingPageBlock,
  VideoAudioButtonContainer,
} from '../../../styles/Speaking/SpeakingStyle';

const SpeakingPage = () => {
  return (
    <SpeakingPageBlock>
      <VideoOrAudio />
      <WebCam />
      <EssayScript />
    </SpeakingPageBlock>
  );
};

export default SpeakingPage;
