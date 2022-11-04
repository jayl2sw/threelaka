import { useState, useEffect, useRef } from 'react';
import YouTube, { YouTubePlayer } from 'react-youtube';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import { readActions } from '../../../features/Read/read-slice';
import { studyActions } from '../../../features/study/study-slice';
import {
  ReadPageBlock,
  ScriptItemBox,
  ScriptTimeStamp,
  ScriptText,
  ScriptWordSpan,
  DictInput,
  WordBookAddReqBtn,
  DictResult,
  AutoScrollBtn,
  AutoScrollText,
} from '../../../styles/Read/ReadStyle';
import {
  FlexTransparentDiv,
  MainBox,
  BackBlurBox,
} from '../../../styles/Common/CommonDivStyle';
import {
  GradientRoundBtn,
  MoveToNextRightBtn,
} from '../../../styles/Common/CommonBtnStyle';
import { StudyPageParams, TedScript, WordMeaning } from '../../../models';
import { IheaderProps } from '../../../layout/Header';
import { AiOutlineRight, AiOutlineLeft } from 'react-icons/ai';
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti';
import { GoSearch } from 'react-icons/go';
import { LoadingSpinner } from '../../../styles/Common/LoadingSpinner';

let videoElement: YouTubePlayer = null;

const ReadPage = () => {
  const { customMoveToNext } = useOutletContext<IheaderProps>();
  const moveToNext = customMoveToNext;
  const pageParams: StudyPageParams = useParams() as any;
  const [nowPlayedIdx, setNowPlayedIdx] = useState<number>(10);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const studyDuration = useRef<number>(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const tedScriptList = useAppSelector((state) => state.read.TedScriptList);
  const wordLoading = useAppSelector((state) => state.study.loading);
  const wordAddLoading = useAppSelector((state) => state.read.loading);
  const scriptContainerRef = useRef<HTMLDivElement[]>([]);
  const [dictInputValue, setDictInputvalue] = useState<string>('');
  const [selectedWordIdxArr, setSelectedWordIdxArr] = useState<number[]>([]);
  const [selectedSentenceIdx, setSelectedSentenceIdx] = useState<number | null>(
    null
  );
  const [isAutoScroll, setIsAutoScroll] = useState<boolean>(true);

  const wordMeaning: WordMeaning = useAppSelector(
    (state) => state.study.wordMeaning
  );

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
  };

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

  const WordSearchHandler = (
    e: React.MouseEvent<HTMLSpanElement>,
    targetWord: string
  ) => {
    const trimmedWord = targetWord.replace(/\s/g, '').toLowerCase();

    dispatch(studyActions.SearchDictStart(trimmedWord));

    // const selectedSentence = tedScriptList[selectedSentenceIdx!].text;
    // console.log(trimmedWord, selectedSentence);
  };

  const AddWordToWordbook = (e: React.MouseEvent<HTMLSpanElement>) => {
    const selectedSentence = tedScriptList[selectedSentenceIdx!].text;
    const wordInfo = {
      definition: '',
      example: selectedSentence,
      lrId: pageParams.learningRecordId,
      word: wordMeaning.wordId,
    };
    dispatch(readActions.postAddWordToWordBookStart(wordInfo));
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
      // console.log(videoElement.target);
      const elapsed_seconds = videoElement.target.getCurrentTime();
      setCurrentTime(elapsed_seconds);
    }
  }, [videoElement]);

  //get current time and video status in real time
  useEffect(() => {
    const interval = setInterval(async () => {
      studyDuration.current = studyDuration.current + 1;
      // console.log(studyDuration)
      if (videoElement && videoElement.target.getCurrentTime() > 0) {
        const elapsed_seconds = videoElement.target.getCurrentTime();
        setCurrentTime(elapsed_seconds);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
      dispatch(studyActions.putStopStudyStart(studyDuration.current));
      console.warn(studyDuration);
    };
  }, []);

  useEffect(() => {
    if (pageParams.videoId !== '') {
      dispatch(readActions.getScripts(pageParams.videoId));
    }
  }, [pageParams.videoId]);

  useEffect(() => {
    if (tedScriptList.length === 0) {
      return;
    }
    let tempCurrentIdx = nowPlayedIdx;

    // console.log("얍얍얍",tedScriptList[tempCurrentIdx].start)
    if (currentTime > tedScriptList[tempCurrentIdx].start) {
      while (currentTime > tedScriptList[tempCurrentIdx].start) {
        console.log(tempCurrentIdx);
        if (tempCurrentIdx > tedScriptList.length - 2) {
          break;
        }
        tempCurrentIdx++;
      }
    }
    if (currentTime < tedScriptList[tempCurrentIdx].start) {
      while (
        currentTime < tedScriptList[tempCurrentIdx].start &&
        tempCurrentIdx > 0
      ) {
        console.log(tempCurrentIdx);
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
            scriptContainerRef.current[tedScriptList.length - 1].scrollIntoView(
              {
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest',
              }
            );
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
        <MoveToNextRightBtn
          onClick={(e) => moveToNext(e, 'WRITING', pageParams)}
        >
          <AiOutlineRight size={30} />
          <p>writing</p>
        </MoveToNextRightBtn>
        <FlexTransparentDiv
          widthSize={'40vw'}
          heightSize={'80vh'}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'none'}
        >
          {pageParams.videoId !== '' ? (
            <FlexTransparentDiv
              widthSize={'40vw'}
              heightSize={'40vh'}
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
              }}
            >
              <YouTube
                style={{
                  width: `${FRAME_WIDTH}vw`,
                  height: `${FRAME_HEIGHT}vh`,
                }}
                videoId={pageParams.videoId}
                opts={opts}
                onReady={_onReady}
              />
            </FlexTransparentDiv>
          ) : (
            ''
          )}
          {/* 사전 */}
          <MainBox
            widthSize={'40vw'}
            heightSize={'38vh'}
            paddingSize={'4vh 0 2vh 2vw'}
            fontColor={'black'}
            fontSize={'1.5vmin'}
            style={{ marginTop: '2vh' }}
          >
            <FlexTransparentDiv
              widthSize={'30vw'}
              heightSize={'5vh'}
              paddingSize={'0'}
              flexDirection={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}
              IsBorder={'none'}
              style={{
                // border: '2px solid pink',
                background: 'rgba(152, 151, 169, 0.5)',
                borderRadius: '5vmin',
                marginLeft: '5vw',
                // opacity: '0.7',
              }}
            >
              <GradientRoundBtn
                widthSize={'10vmin'}
                heightSize={'10vmin'}
                paddingSize={'0'}
                fontColor={'black'}
                fontSize={'2vmin'}
                backgroundColor={'gradient'}
                onClick={(e) => {
                  AddWordToWordbook(e);
                }}
                style={{
                  background: 'transparent',
                  position: 'absolute',
                  top: '58.5vh',
                  left: '9vw',
                }}
              >
                {wordAddLoading ? (
                  <TiStarFullOutline size={40} color={'#2e4a9e'} />
                ) : (
                  <TiStarOutline size={40} color={'#2e4a9e'} />
                )}
              </GradientRoundBtn>
              <DictInput value={dictInputValue} onChange={dictInputChange} />
              <GradientRoundBtn
                widthSize={'5vmin'}
                heightSize={'5vmin'}
                paddingSize={'0'}
                fontColor={'black'}
                fontSize={'2vmin'}
                backgroundColor={'gradient'}
                onClick={(e) => WordSearchHandler(e, dictInputValue)}
              >
                <GoSearch size={20} />
              </GradientRoundBtn>
            </FlexTransparentDiv>
            <FlexTransparentDiv
              widthSize={'37.5vw'}
              heightSize={'28vh'}
              paddingSize={'0'}
              flexDirection={'column'}
              justifyContent={'start'}
              alignItems={'center'}
              IsBorder={'none'}
              style={{
                overflowY: 'scroll',
                overflowX: 'hidden',
                paddingTop: '1vh',
              }}
            >
              {/* {wordLoading ? '로딩중' : '로딩완료'} */}
              {wordLoading ? (
                <LoadingSpinner
                  widthSize="20vmin"
                  heightSize="20vmin"
                  style={{ marginTop: '2vh' }}
                />
              ) : (
                wordMeaning.wordList.map((aWord) => {
                  return (
                    <DictResult>
                      <FlexTransparentDiv
                        widthSize={'37.5vw'}
                        heightSize={'14vh'}
                        paddingSize={'1vw'}
                        flexDirection={'row'}
                        justifyContent={'start'}
                        alignItems={'center'}
                        IsBorder={'none'}
                      >
                        <FlexTransparentDiv
                          widthSize={'80%'}
                          heightSize={'14vh'}
                          paddingSize={'1vw'}
                          flexDirection={'column'}
                          justifyContent={'center'}
                          alignItems={'start'}
                          IsBorder={'none'}
                        >
                          <div
                            style={{
                              color: '#4a9fff',
                              fontWeight: 'bold',
                            }}
                          >
                            definition
                          </div>
                          <div
                            style={{
                              paddingLeft: '0.5vw',
                              fontSize: '2.5vmin',
                            }}
                          >
                            {aWord.wordDefinition}
                          </div>
                          {/* <p style={{ width: '80%', padding: '0 1vw' }}>
                          definition: {aWord.wordDefinition}
                        </p> */}
                        </FlexTransparentDiv>
                        <div
                          style={{
                            width: '20%',
                            padding: '0 1vw',
                            color: 'red',
                            fontSize: '2.5vmin',
                            fontWeight: 'bold',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          {aWord.lexicalCategory}
                        </div>
                      </FlexTransparentDiv>
                      <FlexTransparentDiv
                        widthSize={'37.5vw'}
                        heightSize={'14vh'}
                        paddingSize={'1vw'}
                        flexDirection={'row'}
                        justifyContent={'start'}
                        alignItems={'center'}
                        IsBorder={'none'}
                      >
                        <FlexTransparentDiv
                          widthSize={'80%'}
                          heightSize={'14vh'}
                          paddingSize={'1vw'}
                          flexDirection={'column'}
                          justifyContent={'center'}
                          alignItems={'start'}
                          IsBorder={'none'}
                        >
                          <div
                            style={{
                              color: '#4a9fff',
                              fontWeight: 'bold',
                            }}
                          >
                            example
                          </div>
                          <div
                            style={{
                              paddingLeft: '0.5vw',
                              fontSize: '2.5vmin',
                            }}
                          >
                            {aWord.wordExample}
                          </div>
                          {/* <p style={{ width: '80%', padding: '0 1vw' }}>
                          definition: {aWord.wordDefinition}
                        </p> */}
                        </FlexTransparentDiv>
                      </FlexTransparentDiv>
                    </DictResult>
                  );
                })
              )}
            </FlexTransparentDiv>
          </MainBox>
        </FlexTransparentDiv>
        <FlexTransparentDiv
          widthSize={'2vw'}
          heightSize={'80vh'}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'start'}
          alignItems={'center'}
          IsBorder={'none'}
        ></FlexTransparentDiv>
        <MainBox
          widthSize={'43vw'}
          heightSize={'80vh'}
          paddingSize={'0'}
          fontColor={'black'}
          fontSize={'2vmin'}
          style={{ paddingTop: '1vh', paddingBottom: '1vh' }}
        >
          <div
            style={{
              width: '42.5vw',
              height: '78vh',
              overflowY: 'scroll',
              overflowX: 'hidden',
            }}
            onWheel={checkHumanWheel}
          >
            {tedScriptList.length !== 0
              ? tedScriptList.map((script: TedScript, idx: number) => (
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
                      <p style={{ wordBreak: `break-all` }}>
                        {script.text
                          .split(/\r?\n| /)
                          .map((word: string, wordIdx: number) => {
                            if (
                              word.includes(',') ||
                              word.includes('.') ||
                              word.includes('!') ||
                              word.includes('?')
                            ) {
                              if (idx === selectedSentenceIdx) {
                                return (
                                  <>
                                    <ScriptWordSpan
                                      key={`script-${idx}-word-${wordIdx}`}
                                      onClick={(e) => {
                                        wordClickHandler(e, idx, wordIdx);
                                      }}
                                      className={`${
                                        selectedWordIdxArr.includes(wordIdx)
                                          ? 'word-selected'
                                          : ''
                                      }`}
                                    >
                                      {word.slice(0, -1)}
                                    </ScriptWordSpan>
                                    <ScriptWordSpan
                                      key={`script-${idx}-word-${wordIdx}-dummy`}
                                      className={'dummy'}
                                    >
                                      {word.slice(-1)}
                                    </ScriptWordSpan>
                                    <span>&nbsp;</span>
                                  </>
                                );
                              } else {
                                return (
                                  <>
                                    <ScriptWordSpan
                                      key={`script-${idx}-word-${wordIdx}`}
                                      onClick={(e) => {
                                        wordClickHandler(e, idx, wordIdx);
                                      }}
                                    >
                                      {word.slice(0, -1)}
                                    </ScriptWordSpan>
                                    <ScriptWordSpan
                                      key={`script-${idx}-word-${wordIdx}-dummy`}
                                      className={'dummy'}
                                    >
                                      {word.slice(-1)}
                                    </ScriptWordSpan>
                                    <span>&nbsp;</span>
                                  </>
                                );
                              }
                            } else {
                              if (idx === selectedSentenceIdx) {
                                return (
                                  <>
                                    <ScriptWordSpan
                                      key={`script-${idx}-word-${wordIdx}`}
                                      onClick={(e) => {
                                        wordClickHandler(e, idx, wordIdx);
                                      }}
                                      className={`${
                                        selectedWordIdxArr.includes(wordIdx)
                                          ? 'word-selected'
                                          : ''
                                      }`}
                                    >
                                      {word}
                                    </ScriptWordSpan>
                                    <span>&nbsp;</span>
                                  </>
                                );
                              } else {
                                return (
                                  <>
                                    <ScriptWordSpan
                                      key={`script-${idx}-word-${wordIdx}`}
                                      onClick={(e) => {
                                        wordClickHandler(e, idx, wordIdx);
                                      }}
                                    >
                                      {word}
                                    </ScriptWordSpan>
                                    <span>&nbsp;</span>
                                  </>
                                );
                              }
                            }
                          })}
                      </p>
                    </ScriptText>
                  </ScriptItemBox>
                ))
              : ''}
          </div>
        </MainBox>

        <AutoScrollText>
          <p>{isAutoScroll ? 'AUTO' : 'MANUAL'}</p>
        </AutoScrollText>
        <AutoScrollBtn
          onClick={() => setIsAutoScroll(!isAutoScroll)}
          className={isAutoScroll ? 'auto-scroll' : 'manual-scroll'}
        ></AutoScrollBtn>
      </ReadPageBlock>
    </>
  );
};

export default ReadPage;