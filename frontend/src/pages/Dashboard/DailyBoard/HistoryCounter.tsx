import React from 'react';

import { FlexTransparentDiv } from '../../../styles/Common/CommonDivStyle';
import {
  Count,
  HistoryCounterContainer,
} from '../../../styles/DashBoard/DashBoardStyle';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import CountUp from 'react-countup';
import { FaYoutube } from 'react-icons/fa';
import { BsFileEarmarkTextFill } from 'react-icons/bs';
import { RiStickyNoteFill } from 'react-icons/ri';
interface IHistoryCounterProps {
  mode: string;
  setIsOpenWordList: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenWordList: boolean;
}

const HistoryCounter = ({
  mode,
  isOpenWordList,
  setIsOpenWordList,
}: IHistoryCounterProps) => {
  const studyHistory = useAppSelector((state) => state.dashboard.studyHistory);
  const openModalWordList = () => {
    setIsOpenWordList(!isOpenWordList);
  };
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
      <HistoryCounterContainer>
        {mode === 'videos' ? (
          <span>
            <FaYoutube
              size={25}
              color="red"
              style={{ verticalAlign: 'middle' }}
            />
            &nbsp;영상
          </span>
        ) : mode === 'essays' ? (
          <span>
            <BsFileEarmarkTextFill
              size={25}
              color="#457b9d"
              style={{ verticalAlign: 'middle' }}
            />
            &nbsp;에세이
          </span>
        ) : (
          <span onClick={openModalWordList} style={{ cursor: 'pointer' }}>
            <RiStickyNoteFill
              size={25}
              color="#ffb94c"
              style={{ verticalAlign: 'middle' }}
            />
            <span className="historyTitle">&nbsp;단어</span>
          </span>
        )}
      </HistoryCounterContainer>
      <FlexTransparentDiv
        widthSize={'7.3vw'}
        heightSize={'18vh'}
        paddingSize={'0'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        IsBorder={'none'}
        style={{
          background: `linear-gradient(120.62deg, #83BDFF 8.18%, rgba(136, 192, 255, 0.80051) 49.26%, #8DC2FF 49.16%)`,
          borderRadius: '1rem',
          marginTop: '2vh',
        }}
      >
        <Count>
          {mode === 'videos' ? (
            <CountUp end={studyHistory.videos} duration={1} />
          ) : mode === 'essays' ? (
            <CountUp end={studyHistory.essays} duration={1} />
          ) : (
            <div onClick={openModalWordList} style={{ cursor: 'pointer' }}>
              <CountUp end={studyHistory.words} duration={1} />
            </div>
          )}
        </Count>
      </FlexTransparentDiv>
    </FlexTransparentDiv>
  );
};

export default HistoryCounter;
