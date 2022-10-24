import { useState, useEffect } from 'react';
import YouTube, { YouTubePlayer } from 'react-youtube';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { readActions } from '../../../features/Read/read-slice';
import {
  ReadPageBlock,
  YoutubeAndDictContainer,
  DictRegion,
  ScriptAndSpeakContainer,
  ScriptItemBox,
  SentenceSpeakingRegion,
  ButtonRegion,
  ScriptTimeStamp,
  ScriptText
} from '../../../styles/Read/ReadStyle';
import { TedScript } from '../../../models';

let videoElement: YouTubePlayer = null;

const ReadPage = () => {
  const [isPaused, setIsPaused] = useState(false)
  const [nowPlayedIdx, setNowPlayedIdx] = useState(30);
  const [currentTime, setCurrentTime] = useState(0);
  const dispatch = useAppDispatch();
  const tedScriptList = useAppSelector((state) => state.read.TedScriptList);
  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const onClickgetScript = (videoId: string) => {
    dispatch(readActions.getScripts(videoId));
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
      setCurrentTime(elapsed_seconds);
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
    dispatch(readActions.getScripts('KQ9FfzMKBNc'));

    const interval = setInterval(async () => {
      if (videoElement && videoElement.target.getCurrentTime() > 0) {
        const elapsed_seconds = videoElement.target.getCurrentTime();
        setCurrentTime(elapsed_seconds);
        //calculations
        // const elapsed_milliseconds = Math.floor(elapsed_seconds * 1000);
        // const ms = elapsed_milliseconds % 1000;
        // const min = Math.floor(elapsed_milliseconds / 60000);
        // const seconds = Math.floor((elapsed_milliseconds - min * 60000) / 1000);

        // const formattedCurrentTime =
        //   min.toString().padStart(2, '0') +
        //   ':' +
        //   seconds.toString().padStart(2, '0') +
        //   ':' +
        //   ms.toString().padStart(3, '0');

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

  useEffect(() => {
    console.log(tedScriptList)
    if (tedScriptList === undefined || tedScriptList.length===0) {
      return;
    }
    let tempCurrentIdx = nowPlayedIdx;
  
    if (currentTime > tedScriptList[tempCurrentIdx].start){
      while (currentTime > tedScriptList[tempCurrentIdx].start){  
        console.warn("증가중")          
        tempCurrentIdx++;
      }
    } else {
      while (currentTime < tedScriptList[tempCurrentIdx-1].start){         
        console.log(tedScriptList[tempCurrentIdx-1].start, currentTime)   
        console.warn("감소중")   
        tempCurrentIdx--;       
      }
    }
    setNowPlayedIdx(tempCurrentIdx);
  }, [currentTime]);

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
          <button onClick={() => onClickgetScript('KQ9FfzMKBNc')}></button>
          {/* <button onClick={togglePause}>Pause</button> */}
          <DictRegion>{currentTime}, {!!tedScriptList[nowPlayedIdx]? tedScriptList[nowPlayedIdx-1].text: ''}</DictRegion>
        </YoutubeAndDictContainer>
        <SentenceSpeakingRegion></SentenceSpeakingRegion>
        <ScriptAndSpeakContainer>
          {tedScriptList.map((script, idx) => (
            <ScriptItemBox key={`script-${idx}`}>
              <ScriptTimeStamp>{`${Math.floor(script.start/60)}: ${String(Math.floor(script.start%60)).padStart(2, "0")}`}</ScriptTimeStamp>
              <ScriptText>
                {script.text}
              </ScriptText>              
            </ScriptItemBox>
          ))}
        </ScriptAndSpeakContainer>
      <ButtonRegion></ButtonRegion>
      </ReadPageBlock>
    </>
  );
};

export default ReadPage;
