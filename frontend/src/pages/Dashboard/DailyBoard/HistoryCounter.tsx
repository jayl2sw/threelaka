import React from 'react';

import { FlexTransparentDiv } from '../../../styles/Common/CommonDivStyle';
import { Count } from '../../../styles/DashBoard/DashBoardStyle';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import CountUp from 'react-countup';
interface IHistoryCounterProps {
  mode: string;
}

const HistoryCounter = ({ mode }: IHistoryCounterProps) => {
  const studyHistory = useAppSelector((state) => state.dashboard.studyHistory);
  return (
    <FlexTransparentDiv
      widthSize={'7.5vw'}
      heightSize={'18vh'}
      paddingSize={'0'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      IsBorder={'none'}
      style={{ fontSize: '2.5vmin' }}
    >
      <div>{mode}</div>
      <FlexTransparentDiv
        widthSize={'7.3vw'}
        heightSize={'18vh'}
        paddingSize={'0'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        IsBorder={'none'}
        style={{
          background: `linear-gradient(120.62deg, #83BDFF 8.18%, rgba(136, 192, 255, 0.90051) 49.26%, #8DC2FF 69.16%)`,
          borderRadius: '1rem',
        }}
      >
        <Count>
          {mode === 'videos' ? (
            <CountUp end={studyHistory.videos} duration={1} />
          ) : mode === 'essays' ? (
            <CountUp end={studyHistory.essays} duration={1} />
          ) : (
            <CountUp end={studyHistory.words} duration={1} />
          )}
        </Count>
      </FlexTransparentDiv>
    </FlexTransparentDiv>
  );
};

export default HistoryCounter;
