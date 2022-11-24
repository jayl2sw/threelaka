import React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { dashboardActions } from '../../../features/dashboard/dashboard-slice';
import {
  BackBlurBox,
  MainBox,
  FlexTransparentDiv,
} from '../../../styles/Common/CommonDivStyle';
import { RiBearSmileLine } from 'react-icons/ri';
import HistoryCounter from './HistoryCounter';
import WordTest from '../WordTest/WordTest';
import { useState } from 'react';
import WordList from '../WordTest/WordList';
const StudyHistoryContainer = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(dashboardActions.getStudyHistory());
  }, []);
  const studyHistory = useAppSelector((state) => state.dashboard.studyHistory);

  const [isOpenWordList, setIsOpenWordList] = useState(false);
  const [isOpenTest, setIsOpenTest] = useState(false);

  useEffect(() => {
    dispatch(dashboardActions.getUserWordInfo());
  }, []);

  return (
    <FlexTransparentDiv
      widthSize={'30vw'}
      heightSize={'35vh'}
      paddingSize={'0'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'start'}
      IsBorder={'none'}
      style={{ marginTop: '9.5vh', marginLeft: '3.7vw' }}
    >
      <MainBox
        widthSize={'26vw'}
        heightSize={'29.5vh'}
        paddingSize={'5vh 1.5vw'}
        fontColor={'black'}
        fontSize={'1vmin'}
        style={{
          marginTop: '3vh',
          display: 'flex',
          justifyContent: 'space-between',
          boxShadow: 'none',
        }}
      >
        {isOpenWordList ? (
          <WordList
            isOpenWordList={isOpenWordList}
            setIsOpenWordList={setIsOpenWordList}
            isOpenTest={isOpenTest}
            setIsOpenTest={setIsOpenTest}
          ></WordList>
        ) : null}
        {isOpenTest ? (
          <WordTest
            isOpenWordList={isOpenWordList}
            setIsOpenWordList={setIsOpenWordList}
            isOpenTest={isOpenTest}
            setIsOpenTest={setIsOpenTest}
          ></WordTest>
        ) : null}
        <HistoryCounter
          mode={'videos'}
          isOpenWordList={isOpenWordList}
          setIsOpenWordList={setIsOpenWordList}
        ></HistoryCounter>
        <HistoryCounter
          mode={'essays'}
          isOpenWordList={isOpenWordList}
          setIsOpenWordList={setIsOpenWordList}
        ></HistoryCounter>
        <HistoryCounter
          mode={'words'}
          isOpenWordList={isOpenWordList}
          setIsOpenWordList={setIsOpenWordList}
        ></HistoryCounter>
      </MainBox>
    </FlexTransparentDiv>
  );
};

export default StudyHistoryContainer;
