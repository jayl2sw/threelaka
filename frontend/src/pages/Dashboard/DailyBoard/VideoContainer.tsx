import React, { useEffect } from 'react';
import DashboardVideos from './DashboardVideos';
import DashboardVideoCard from './DashboardVideoCard';
import { VideoBlock } from '../../../styles/DashBoard/DashBoardStyle';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useRef, useState } from 'react';
import { TopBtn } from '../../../styles/Common/CommonBtnStyle';
import { FlexTransparentDiv } from '../../../styles/Common/CommonDivStyle';
import { BackBlurBox, MainBox } from '../../../styles/Common/CommonDivStyle';
import { useHorizontalScroll } from '../../../utils/useSideScroll';
export interface IVideoContainerProps {
  setModalToggleVideoId: (nextVideoId: string) => void;
}
const VideoContainer = ({ setModalToggleVideoId }: IVideoContainerProps) => {
  const recentVideoBlock = useRef<HTMLDivElement>(null);
  const completedVideoBlock = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState(0);
  const AddHide = () => {
    console.log(recentVideoBlock.current);
    if (recentVideoBlock.current !== null) {
      console.log('얍얍');
      recentVideoBlock.current.classList.add('hide');
    }
  };

  const scrollRef = useHorizontalScroll([
    mode,
  ]) as React.MutableRefObject<HTMLDivElement>;
  return (
    <VideoBlock>
      <FlexTransparentDiv
        widthSize={'28vw'}
        heightSize={'4vh'}
        paddingSize={'0'}
        flexDirection={'row'}
        justifyContent={'start'}
        alignItems={'end'}
        IsBorder={'none'}
      >
        <TopBtn
          widthSize={'8vw'}
          heightSize={'4.5vh'}
          paddingSize={'0'}
          fontColor={'white'}
          fontSize={'2vmin'}
          backgroundColor={'blue'}
          style={{ marginLeft: '1vw', wordBreak: 'keep-all' }}
          onClick={() => setMode(0)}
          className={mode ? 'pale' : ''}
        >
          공부 중인 영상
        </TopBtn>
        <TopBtn
          widthSize={'8vw'}
          heightSize={'4.5vh'}
          paddingSize={'0'}
          fontColor={'white'}
          fontSize={'2vmin'}
          backgroundColor={'blue'}
          style={{ marginRight: '1vw', marginLeft: '0.25vw' }}
          onClick={() => {
            setMode(1);
          }}
          className={mode ? '' : 'pale'}
        >
          공부 완료한 영상
        </TopBtn>
      </FlexTransparentDiv>
      <MainBox
        widthSize={'41vw'}
        heightSize={'33.5vh'}
        paddingSize={'2vh 1vw'}
        fontColor={'black'}
        fontSize={'1vmin'}
        // style={{ overflowY: 'hidden', overflowX: 'scroll', boxShadow: 'none' }}
        // ref={scrollRef}
      >
        <FlexTransparentDiv
          widthSize={'40vw'}
          heightSize={'30vh'}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'none'}
          style={{
            overflowY: 'hidden',
            overflowX: 'scroll',
            boxShadow: 'none',
          }}
          ref={scrollRef}
        >
          <DashboardVideos
            mode={mode}
            recentVideoBlock={recentVideoBlock}
            setModalToggleVideoId={setModalToggleVideoId}
          ></DashboardVideos>
        </FlexTransparentDiv>
      </MainBox>
    </VideoBlock>
  );
};

export default VideoContainer;
