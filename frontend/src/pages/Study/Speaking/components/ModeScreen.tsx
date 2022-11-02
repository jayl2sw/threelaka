import React from 'react';
import { SpeakingMode } from '../../../../models';
import WebCam from '../components/WebCam';
import VoiceRecorder from '../components/VoiceRecorder';
import SpeechTest from '../components/SpeechTest';

const ModeScreen = (props: SpeakingMode) => {
  const modeType = props.mode;

  if (modeType == 'test') {
    return (
      <div>
        <SpeechTest />
      </div>
    );
  } else if (modeType == 'video') {
    return (
      <div>
        <WebCam />
      </div>
    );
  } else if (modeType === 'audio') {
    return (
      <div>
        <VoiceRecorder />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default ModeScreen;
