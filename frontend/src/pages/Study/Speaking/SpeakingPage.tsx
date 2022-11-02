import React, { useState } from 'react';
import PickSpeakingMode from './components/ModeBtnContainer';
import EssayScript from './components/EssayScript';
import { SpeakingPageBlock } from '../../../styles/Speaking/SpeakingStyle';
import { useLocation } from 'react-router-dom';
import SpeakingScreen from './components/SpeakingScreen';

const SpeakingPage = () => {
  // 발음 테스트 클릭
  const onClickProTest = () => {};

  const modeCode = useLocation().search.replace('?mode=', '');

  // 실전녹화 선택

  return (
    <SpeakingPageBlock>
      <SpeakingScreen />
      <EssayScript />
    </SpeakingPageBlock>
  );
};

export default SpeakingPage;
