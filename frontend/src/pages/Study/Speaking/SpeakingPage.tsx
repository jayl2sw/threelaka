import React, { useState } from 'react';
import PickSpeakingMode from './components/ModeBtnContainer';
import EssayScript from './components/EssayScript';
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
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import { RiBearSmileLine } from 'react-icons/ri';
import { useOutletContext } from 'react-router-dom';
import { IworlListAndWrtingProps } from '../Writing/components/WordListAndWritingContainer';
import { IheaderProps } from '../../../layout/Header';
import { StudyPageParams } from '../../../models';
import { useParams } from 'react-router-dom';
import useModal from '../../../utils/useModal';
import Survey from '../Survey';
import { useNavigate } from 'react-router-dom';
const SpeakingPage = () => {
  const { customMoveToNext } = useOutletContext<IheaderProps>();
  const moveToNext = customMoveToNext;
  // 발음 테스트 클릭
  const pageParams: StudyPageParams = useParams() as any;
  const onClickProTest = () => {};
  const navigate = useNavigate();

  const modeCode = useLocation().search.replace('?mode=', '');

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
      console.warn(studyDuration);
    };
  }, []);

  // useEffect(() => {
  //   console.warn('나나나나', resetToggle);
  //   if (resetToggle === true) {
  //     navigate('/');
  //   }
  // }, [resetToggle]);

  const { isOpenModal, onClickModal } = useModal();
  // 실전녹화 선택

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
      {isOpenModal && (
        <Survey isOpenModal={isOpenModal} toggle={onClickModal} />
      )}
      <MoveToNextRightBtn
        onClick={(e) => {
          onClickModal();
        }}
      >
        <RiBearSmileLine size={30} />
        <p>complete!</p>
      </MoveToNextRightBtn>
    </SpeakingPageBlock>
  );
};

export default SpeakingPage;
