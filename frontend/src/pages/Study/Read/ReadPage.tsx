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
  ScriptWordSpan,
  DictInput,
  AutoScrollBtn,
  AutoScrollText,
} from '../../../styles/Read/ReadStyle';
import { TedScript } from '../../../models';
import { BlobOptions } from 'buffer';

let videoElement: YouTubePlayer = null;

const ReadPage = () => {
  const [nowPlayedIdx, setNowPlayedIdx] = useState<number>(30);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const dispatch = useAppDispatch();
  const tedScriptList = useAppSelector((state) => state.read.TedScriptList);
  const scriptContainerRef = useRef<HTMLDivElement[]>([]);
  const [dictInputValue, setDictInputvalue] = useState<string>('');
  const [selectedWordIdxArr, setSelectedWordIdxArr] = useState<number[]>([]);
  const [selectedSentenceIdx, setSelectedSentenceIdx] = useState<number | null>(
    null
  );
  const [isAutoScroll, setIsAutoScroll] = useState<boolean>(true);

  const moveToTimeStamp = (idx: number) => {
    const targetTime = tedScriptList[idx].start;
    videoElement.target.seekTo(targetTime, 1);
  };

  const dictInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDictInputvalue(e.target.value);
  };
  
  const checkHumanWheel = () => {
    if (isAutoScroll === true) {
      setIsAutoScroll(false);
    }
  }

  const wordClickHandler = (
    e: React.MouseEvent<HTMLSpanElement>,
    idx: number,
    wordIdx: number
  ) => {
    let nextInputValue: string = '';
    if (selectedSentenceIdx === idx) {
      nextInputValue =
        dictInputValue + (e.target as HTMLSpanElement).innerText + ' ';
      setSelectedWordIdxArr([...selectedWordIdxArr, wordIdx]);
    } else {
      nextInputValue = (e.target as HTMLSpanElement).innerText + ' ';
      setSelectedSentenceIdx(idx);
      setSelectedWordIdxArr([wordIdx]);
    }
    setDictInputvalue(nextInputValue);
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
      console.log(videoElement.target);
      const elapsed_seconds = videoElement.target.getCurrentTime();
      setCurrentTime(elapsed_seconds);
    }
  }, [videoElement]);

  //get current time and video status in real time
  useEffect(() => {
    dispatch(readActions.getScripts('KQ9FfzMKBNc'));

    const interval = setInterval(async () => {
      if (videoElement && videoElement.target.getCurrentTime() > 0) {
        const elapsed_seconds = videoElement.target.getCurrentTime();
        setCurrentTime(elapsed_seconds);
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
        if (tempCurrentIdx > tedScriptList.length - 2) {
          break;
        }
        tempCurrentIdx++;
      }
    }
    if (currentTime < tedScriptList[tempCurrentIdx].start) {
      while (currentTime < tedScriptList[tempCurrentIdx].start) {
        tempCurrentIdx--;
      }
    }
    setNowPlayedIdx(tempCurrentIdx);
  }, [currentTime]);

  useEffect(() => {
    if (null !== scriptContainerRef.current) {
      if (isAutoScroll === true) {
        if (undefined !== scriptContainerRef.current[nowPlayedIdx]) {
          if (nowPlayedIdx < 2) {
            scriptContainerRef.current[0].scrollIntoView({
              behavior: 'smooth',
              block: 'end',
              inline: 'nearest',
            });
          } else if (nowPlayedIdx + 3 > tedScriptList.length) {
            scriptContainerRef.current[tedScriptList.length - 1].scrollIntoView({
              behavior: 'smooth',
              block: 'end',
              inline: 'nearest',
            });
          } else {
            scriptContainerRef.current[nowPlayedIdx + 2].scrollIntoView({
              behavior: 'smooth',
              block: 'end',
              inline: 'nearest',
            });
          }
        }
      }
    }
  }, [nowPlayedIdx]);

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
          <DictRegion>
            <DictInput value={dictInputValue} onChange={dictInputChange} />
            {currentTime}, , {nowPlayedIdx}
          </DictRegion>
        </YoutubeAndDictContainer>
        <ScriptContainer onWheel={checkHumanWheel}>
          {tedScriptList.map((script: TedScript, idx: number) => (
            <ScriptItemBox
              key={`script-${idx}`}
              ref={(el) => {
                if (null != el) {
                  scriptContainerRef.current[idx] = el;
                }
              }}
            >
              <ScriptTimeStamp
                className={idx === nowPlayedIdx ? 'now-played' : ''}
                onClick={() => moveToTimeStamp(idx)}
              >
                {`${Math.floor(script.start / 60)}: ${String(
                  Math.floor(script.start % 60)
                ).padStart(2, '0')}`}
              </ScriptTimeStamp>
              <ScriptText>
                <p style={{wordBreak: `break-all`}}>
                  {script.text
                    .split(/\r?\n| /)
                    .map((word: string, wordIdx: number) => {
                      if (idx === selectedSentenceIdx) {
                        return (
                          <ScriptWordSpan
                            key={`script-${idx}-word-${wordIdx}`}
                            onClick={(e) => wordClickHandler(e, idx, wordIdx)}
                            className={`${
                              selectedWordIdxArr.includes(wordIdx)
                                ? 'word-selected'
                                : ''
                            }`}
                          >
                            {word}
                          </ScriptWordSpan>
                        );
                      } else {
                        return (
                          <ScriptWordSpan
                            key={`script-${idx}-word-${wordIdx}`}
                            onClick={(e) => wordClickHandler(e, idx, wordIdx)}
                          >
                            {word}
                          </ScriptWordSpan>
                        );
                      }
                    })}
                </p>
              </ScriptText>
            </ScriptItemBox>
          ))}
        </ScriptContainer>
        <AutoScrollText>
          <p>{isAutoScroll? '자동 스크롤': '수동 스크롤'}</p>
        </AutoScrollText>
        <AutoScrollBtn onClick={() => setIsAutoScroll(!isAutoScroll)} className={isAutoScroll? 'auto-scroll': 'manual-scroll'}></AutoScrollBtn>
      </ReadPageBlock>
    </>
  );
};

export default ReadPage;
