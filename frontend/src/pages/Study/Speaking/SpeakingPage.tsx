import React, { useState } from 'react';
import PickSpeakingMode from './components/ModeButtons';
import EssayScript from './components/EssayForTest';
import { SpeakingPageBlock } from '../../../styles/Speaking/SpeakingStyle';
import { useLocation } from 'react-router-dom';
import SpeakingScreen from './components/SpeakingScreen';
import { useRef, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { studyActions } from '../../../features/study/study-slice';
import {
  MoveToNextLeftBtn,
  MoveToNextRightBtn,
} from '../../../styles/Common/CommonBtnStyle';
import { AiOutlineLeft } from 'react-icons/ai';
import { RiBearSmileLine } from 'react-icons/ri';

import { IheaderProps } from '../../../layout/Header';
import { StudyPageParams } from '../../../models';

import { useParams, useOutletContext } from 'react-router-dom';
const SpeakingPage = () => {
  const { customMoveToNext } = useOutletContext<IheaderProps>();
  const moveToNext = customMoveToNext;
  // 발음 테스트 클릭
  const pageParams: StudyPageParams = useParams() as any;

  const studyDuration = useRef<number>(0);
  const dispatch = useAppDispatch();
  const resetToggle = useAppSelector((state) => state.study.resetToggle);
  //get current time and video status in real time
  useEffect(() => {
    const interval = setInterval(async () => {
      studyDuration.current = studyDuration.current + 1;
    }, 1000);

    return () => {
      clearInterval(interval);
      dispatch(studyActions.putStopStudyStart(studyDuration.current));
    };
  }, []);


  const { isOpenModal, onClickModal } = useModal();
  // 실전녹화 선택

  const onClickComplete = (e: React.MouseEvent<HTMLDivElement>) => {
    dispatch(studyActions.resetStudystate());

    moveToNext(e, 'COMPLETE', pageParams);
  };
>>>>>>> d1783c22e752e1e5dc621def4393d2f84bbc782b

  return (
    <SpeakingPageBlock>
      <MoveToNextLeftBtn
        onClick={(e) => {
          moveToNext(e, 'WRITING', pageParams);
        }}
      >
        <AiOutlineLeft size={30} />
        <p>writing</p>
      </MoveToNextLeftBtn>
      <SpeakingScreen />

      <MoveToNextRightBtn
        onClick={(e) => {
          onClickComplete(e);
        }}
      >
        <RiBearSmileLine size={30} />
        <p>complete!</p>
      </MoveToNextRightBtn>
    </SpeakingPageBlock>
  );
};

export default SpeakingPage;
