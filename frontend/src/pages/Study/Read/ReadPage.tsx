import { useState, useEffect, useRef } from 'react';
import YouTube, { YouTubePlayer } from 'react-youtube';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { readActions } from '../../../features/Read/read-slice';
import {
  ReadPageBlock,
  YoutubeAndDictContainer,
  DictRegion,
  ScriptContainer,
  ScriptItemBox,
  ButtonRegion,
  ScriptTimeStamp,
  ScriptText,
} from '../../../styles/Read/ReadStyle';
import { TedScript } from '../../../models';

let videoElement: YouTubePlayer = null;

const ReadPage = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [nowPlayedIdx, setNowPlayedIdx] = useState(30);
  const [currentTime, setCurrentTime] = useState(0);
  const dispatch = useAppDispatch();
  const tedScriptList = useAppSelector((state) => state.read.TedScriptList);
  const scriptContainerRef = useRef<HTMLDivElement[]>([]);
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
        console.log('인터벌들어옴');
        const elapsed_seconds = videoElement.target.getCurrentTime();
        setCurrentTime(elapsed_seconds);

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
    if (tedScriptList.length === 0) {
      return;
    }
    let tempCurrentIdx = nowPlayedIdx;

    if (currentTime > tedScriptList[tempCurrentIdx].start) {
      while (currentTime > tedScriptList[tempCurrentIdx].start) {
        console.warn('증가중');
        tempCurrentIdx++;
      }
    }
    if (currentTime < tedScriptList[tempCurrentIdx].start) {
      while (currentTime < tedScriptList[tempCurrentIdx].start) {
        console.warn('감소중');
        tempCurrentIdx--;
      }
    }
    setNowPlayedIdx(tempCurrentIdx);
  }, [currentTime]);

  useEffect(() => {
    
    if (null !== scriptContainerRef.current){
      // const { scrollHeight, clientHeight } = scriptContainerRef.current;
      // const nextScrollPos = (nowPlayedIdx/tedScriptList.length)*(scrollHeight - clientHeight);
      // console.warn(nextScrollPos, scrollHeight - clientHeight);
      // scriptContainerRef.current.scrollTop = nextScrollPos;
      if (undefined !== scriptContainerRef.current[nowPlayedIdx]){
        scriptContainerRef.current[nowPlayedIdx].scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"})
      }
    }
  }, [nowPlayedIdx])

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
          {/* <button onClick={() => scrollToBottom()}></button>           */}
          {/* {!!tedScriptList[nowPlayedIdx]? tedScriptList[nowPlayedIdx-1].text: ''} */}
          <DictRegion>
            {currentTime}, , {nowPlayedIdx}
          </DictRegion>
        </YoutubeAndDictContainer>
        <ScriptContainer>
          {tedScriptList.map((script: TedScript, idx: number) => (
            <ScriptItemBox key={`script-${idx}`} ref={(el) => {
              if (null != el) {
                scriptContainerRef.current[idx] = el
              }}
            }>
              <ScriptTimeStamp
                className={idx === nowPlayedIdx ? 'now-played' : ''}
              >{`${Math.floor(script.start / 60)}: ${String(
                Math.floor(script.start % 60)
              ).padStart(2, '0')}`}</ScriptTimeStamp>
              <ScriptText>{script.text}</ScriptText>
              
            </ScriptItemBox>
          ))}
          {/* <ScriptItemBox ref={scriptContainerRef}>
            <ScriptTimeStamp>0:23</ScriptTimeStamp>
            <ScriptText>안안녕테스트</ScriptText>
          </ScriptItemBox>           */}
        </ScriptContainer>
        {/* <ButtonRegion></ButtonRegion> */}
      </ReadPageBlock>
    </>
  );
};

export default ReadPage;
