import React from 'react';
import {
  FlexTransparentDiv,
  MainBox,
} from '../../../../styles/Common/CommonDivStyle';
import { StudyPageParams, TedScript, WordMeaning } from '../../../../models';
import YouTube, { YouTubePlayer } from 'react-youtube';

// 필요한 props interface
interface IVideoCompProps {
  pageParams: StudyPageParams;
  onReady: (e: YouTubePlayer) => void;
  layoutMode: number;
}

const VideosComp = ({ pageParams, onReady, layoutMode }: IVideoCompProps) => {
  // youtube 비디오 설정
  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  // 화면 크기
  let FRAME_WIDTH: number = 40;
  let FRAME_HEIGHT: number = 40;
  if (layoutMode === 2) {
    FRAME_WIDTH = 50; //vw
    FRAME_HEIGHT = 60; //vh
  } else {
    FRAME_WIDTH = 40; //vw
    FRAME_HEIGHT = 40; //vh
  }

  return (
    <>
      {' '}
      {pageParams.videoId !== '' ? (
        <FlexTransparentDiv
          widthSize={`${FRAME_WIDTH}vw`}
          heightSize={`${FRAME_HEIGHT}vh`}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'none'}
          style={{
            borderTop: '10px solid black',
            borderBottom: '10px solid black',
            borderRadius: '10px',
            background: 'black',
            transition: 'all 0.8s ease-in-out',
          }}
        >
          <YouTube
            style={{
              width: `${FRAME_WIDTH}vw`,
              height: `${FRAME_HEIGHT}vh`,
            }}
            videoId={pageParams.videoId}
            opts={opts}
            onReady={onReady}
          />
        </FlexTransparentDiv>
      ) : (
        ''
      )}
    </>
  );
};

export default VideosComp;
