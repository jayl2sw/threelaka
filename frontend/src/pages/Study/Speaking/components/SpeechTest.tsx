import React from 'react';
import EssayScript from './EssayScript';
import VoiceRecorderForTest from './VoiceRecorderForTest';
import { useState } from 'react';
const SpeechTest = () => {
  const [selectedText, setSelectedText] = useState<string>('');
  return (
    <div>
      {/* null일때 */}
      {/* <p>테스트하고 싶은 문장을 클릭해보세요!</p> */}
      <VoiceRecorderForTest></VoiceRecorderForTest>
      <EssayScript setSelectedText={setSelectedText}></EssayScript>
    </div>
  );
};

export default SpeechTest;
