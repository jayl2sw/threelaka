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
import styled from 'styled-components';
interface IHistoryCounterProps {
  mode: string;
  setIsOpenWordList: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenWordList: boolean;
}

const HistoryCounterBlueBox = styled.div`
  width: 7.3vw;
  height: 18vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    120.62deg,
    #83bdff 8.18%,
    rgba(136, 192, 255, 0.80051) 49.26%,
    #8dc2ff 49.16%
  );
  border-radius: 1rem;
  margin-top: 2vh;
`;

const HistoryCounterBlueBoxWords = styled.div`
  width: 7.3vw;
  height: 18vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(
    120.62deg,
    #83bdff 8.18%,
    rgba(136, 192, 255, 0.80051) 49.26%,
    #8dc2ff 49.16%
  );
  border-radius: 1rem;
  margin-top: 2vh;
  cursor: pointer;
  &:hover {
    &:after {
      position: absolute;
      font-family: 'PretendardBold';
      width: 7.3vw;
      height: 13vh;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 1rem;
      background: rgba(0, 0, 0, 0.8);
      content: 'GO!';
      z-index: 2;
      color: white;
      font-size: 5vmin;
    }
    background-color: black;
  }
`;

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
          <span
            className="word"
            // onClick={openModalWordList}
            // style={{ cursor: 'pointer' }}
          >
            <RiStickyNoteFill
              size={25}
              color="#ffb94c"
              style={{ verticalAlign: 'middle' }}
            />
            <span className="historyTitle">&nbsp;단어</span>
          </span>
        )}
      </HistoryCounterContainer>
      {mode === 'words' ? (
        <HistoryCounterBlueBoxWords onClick={openModalWordList}>
          <Count>
            <div className="word">
              <CountUp end={studyHistory.words} duration={1} />
            </div>
          </Count>
        </HistoryCounterBlueBoxWords>
      ) : (
        <HistoryCounterBlueBox>
          <Count>
            {mode === 'videos' ? (
              <CountUp end={studyHistory.videos} duration={1} />
            ) : mode === 'essays' ? (
              <CountUp end={studyHistory.essays} duration={1} />
            ) : (
              ''
            )}
          </Count>
        </HistoryCounterBlueBox>
      )}
    </FlexTransparentDiv>
  );
};

export default HistoryCounter;
