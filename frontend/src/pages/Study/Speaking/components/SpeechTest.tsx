import React from 'react';
import EssayScript from './EssayScript';
import VoiceRecorderForTest from './VoiceRecorderForTest';
import { useState } from 'react';
import { StudyPageParams } from '../../../../models';
import { useParams } from 'react-router-dom';
import { TextBox } from '../../../../styles/Speaking/SpeakingStyle';
const SpeechTest = () => {
  const pageParams: StudyPageParams = useParams() as any;
  const [selectedText, setSelectedText] = useState<string>('');
  // const [selectedText, setSelectedText] = useState<HTMLDivElement>(null);
  const [splittedText, setSplittedText] = useState<HTMLDivElement | null>(null);

  return (
    <div>
      {selectedText ? (
        <TextBox style={{ color: '#111111' }}>{selectedText}</TextBox>
      ) : (
        <TextBox>테스트하고 싶은 문장을 클릭해보세요</TextBox>
      )}
      {/* null일때 */}
      {/* <p>테스트하고 싶은 문장을 클릭해보세요!</p> */}
      <VoiceRecorderForTest selectedText={selectedText}></VoiceRecorderForTest>
      <EssayScript
        setSelectedText={setSelectedText}
        setSplittedText={setSplittedText}
        pageParams={pageParams}
      ></EssayScript>
    </div>
  );
};

export default SpeechTest;
