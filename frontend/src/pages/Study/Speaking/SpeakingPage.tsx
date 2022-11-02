import React, { useState } from 'react';
import PickSpeakingMode from './components/ModeBtnContainer';
import EssayScript from './components/EssayScript';
import { SpeakingPageBlock } from '../../../styles/Speaking/SpeakingStyle';
import { useLocation } from 'react-router-dom';
import SpeakingScreen from './components/SpeakingScreen';
import { useRef, useEffect } from 'react';
import { useAppDispatch } from '../../../utils/hooks';
import { studyActions } from '../../../features/study/study-slice';
const SpeakingPage = () => {
  // 발음 테스트 클릭
  const onClickProTest = () => {};

  const modeCode = useLocation().search.replace('?mode=', '');

  const studyDuration = useRef<number>(0);
  const dispatch = useAppDispatch();

  //get current time and video status in real time
  useEffect(() => {
    const interval = setInterval(async () => {
      studyDuration.current = studyDuration.current + 1;
    }, 1000);

    return () => {
      clearInterval(interval);
      dispatch(studyActions.putStopStudyStart(studyDuration.current));
      console.warn(studyDuration);
    };
  }, []);
  // 실전녹화 선택

  return (
    <SpeakingPageBlock>
      <SpeakingScreen />
      {/* <EssayScript /> */}
    </SpeakingPageBlock>
  );
};

export default SpeakingPage;
