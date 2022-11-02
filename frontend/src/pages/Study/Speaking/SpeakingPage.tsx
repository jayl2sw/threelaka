import React, { useState } from 'react';
import PickSpeakingMode from './components/ModeBtnContainer';
import EssayScript from './components/EssayScript';
import {
  SpeakingPageBlock,
  VideoAudioButtonContainer,
} from '../../../styles/Speaking/SpeakingStyle';
import { useLocation } from 'react-router-dom';
import SpeakingScreen from './components/SpeakingScreen';

const SpeakingPage = () => {
  // 발음 테스트 클릭
  const onClickProTest = () => {};

  const modeCode = useLocation().search.replace('?mode=', '');

  // 실전녹화 선택

  return (
    <SpeakingPageBlock>
      <p>-------------스크린--------------</p>
      <SpeakingScreen />
      <p>-----------스피치테스트-----------</p>
      {/* <EssayScript /> */}
    </SpeakingPageBlock>
  );
};

export default SpeakingPage;
