import React from 'react';
import { useLocation } from 'react-router-dom';
import WebCam from '../components/WebCam';
import VoiceRecorder from '../components/VoiceRecorder';
import SpeechTest from '../components/SpeechTest';

const ModeScreen = () => {
  const modeCode = useLocation().search.replace('?mode=', '');

  if (modeCode == 'test') {
    return (
      <div>
        <SpeechTest />
      </div>
    );
  } else if (modeCode == 'video') {
    return (
      <div>
        <WebCam />
      </div>
    );
  } else if (modeCode === 'audio') {
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
