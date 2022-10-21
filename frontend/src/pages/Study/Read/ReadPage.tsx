import { useState, useEffect } from 'react';
import YouTube, { YouTubePlayer } from 'react-youtube';
import {
  ReadPageBlock,
  YoutubeAndDictContainer,
  DictRegion,
  ScriptAndSpeakContainer
} from '../../../styles/Read/ReadStyle';

let videoElement: YouTubePlayer = null;

const ReadPage = () => {
  const [isPaused, setIsPaused] = useState(false);

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  useEffect(() => {
    if (videoElement) {
      // get current time
      const elapsed_seconds = videoElement.target.getCurrentTime();

      // calculations
      const elapsed_milliseconds = Math.floor(elapsed_seconds * 1000);
      const ms = elapsed_milliseconds % 1000;
      const min = Math.floor(elapsed_milliseconds / 60000);
      const seconds = Math.floor((elapsed_milliseconds - min * 60000) / 1000);

      const formattedCurrentTime =
        min.toString().padStart(2, '0') +
        ':' +
        seconds.toString().padStart(2, '0') +
        ':' +
        ms.toString().padStart(3, '0');

      console.log(formattedCurrentTime);

      // Pause and Play video
      if (isPaused) {
        videoElement.target.pauseVideo();
      } else {
        videoElement.target.playVideo();
      }
    }
  }, [isPaused, videoElement]);

  //get current time and video status in real time
  useEffect(() => {
    const interval = setInterval(async () => {
      if (videoElement && videoElement.target.getCurrentTime() > 0) {
        const elapsed_seconds = videoElement.target.getCurrentTime();

        // calculations
        const elapsed_milliseconds = Math.floor(elapsed_seconds * 1000);
        const ms = elapsed_milliseconds % 1000;
        const min = Math.floor(elapsed_milliseconds / 60000);
        const seconds = Math.floor((elapsed_milliseconds - min * 60000) / 1000);

        const formattedCurrentTime =
          min.toString().padStart(2, '0') +
          ':' +
          seconds.toString().padStart(2, '0') +
          ':' +
          ms.toString().padStart(3, '0');

        console.log(formattedCurrentTime);

        // verify video status
        if (videoElement.target.playerInfo.playerState === 1) {
          console.log('the video is running');
        } else if (videoElement.target.playerInfo.playerState === 2) {
          console.log('the video is paused');
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const _onReady = (event: YouTubePlayer) => {
    videoElement = event;
  };

  // frame 가로길이
  // 세로는 16:9의 비율을 유지하도록 세팅됩니다.
  const FRAME_WIDTH: number = 40; //vw
  // const FRAME_HEIGHT: number = FRAME_WIDTH * 0.5625; //vw
  const FRAME_HEIGHT: number = 40; //vh

  return (
    <>
      <ReadPageBlock>
        <YoutubeAndDictContainer>
          <YouTube
            style={{ width: `${FRAME_WIDTH}vw`, height: `${FRAME_HEIGHT}vh` }}
            videoId={'KQ9FfzMKBNc'}
            opts={opts}
            onReady={_onReady}
          />
          {/* <button onClick={togglePause}>Pause</button> */}
          <DictRegion>사전 영역입니다</DictRegion>
        </YoutubeAndDictContainer>
        <ScriptAndSpeakContainer>스크립트와 스피킹영역입니다</ScriptAndSpeakContainer>
      </ReadPageBlock>
    </>
  );
};

export default ReadPage;
