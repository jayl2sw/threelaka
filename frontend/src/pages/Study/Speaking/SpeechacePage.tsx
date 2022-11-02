import React from 'react';
import VoiceRecorder from './components/VoiceRecorder';
import EssayScript from './components/EssayScript';
const SpeechacePage = () => {
  return (
    <div>
      <h3>발음체크를 해봅시다</h3>
      <VoiceRecorder></VoiceRecorder>
      <EssayScript></EssayScript>
    </div>
  );
};

export default SpeechacePage;
