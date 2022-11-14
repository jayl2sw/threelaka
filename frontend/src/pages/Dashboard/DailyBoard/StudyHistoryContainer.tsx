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
const StudyHistoryContainer = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(dashboardActions.getStudyHistory());
  }, []);
  const studyHistory = useAppSelector((state) => state.dashboard.studyHistory);
  return (
    <FlexTransparentDiv
      widthSize={'30vw'}
      heightSize={'30vh'}
      paddingSize={'0'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'start'}
      IsBorder={'none'}
      style={{ marginTop: '13.2vh', marginLeft: '1.8vw' }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <RiBearSmileLine size={26} />
        <h3 style={{ margin: '0' }}>Study History Count</h3>
      </div>

      <MainBox
        widthSize={'28vw'}
        heightSize={'30vh'}
        paddingSize={'3vh 1.5vw'}
        fontColor={'black'}
        fontSize={'1vmin'}
        style={{
          marginTop: '1vh',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <HistoryCounter mode={'videos'}></HistoryCounter>
        <HistoryCounter mode={'essays'}></HistoryCounter>
        <HistoryCounter mode={'words'}></HistoryCounter>
      </MainBox>
    </FlexTransparentDiv>
  );
};

export default StudyHistoryContainer;
