import {
  FlexTransparentDiv,
  MainBox,
} from '../../../../styles/Common/CommonDivStyle';
import { useState, useEffect, useRef } from 'react';
import { TedScript } from '../../../../models';
import {
  ScriptTimeStamp,
  ScriptWordSpan,
  AutoScrollBtn,
} from '../../../../styles/Read/ReadStyle';

interface IScriptCompProps {
  tedScriptList: TedScript[]; // 영상 자막
  nowPlayedIdx: number; // 현재 진행중인 자막 인덱스
  moveToTimeStamp: (idx: number) => void;
  selectedSentenceIdx: number | null; // 선택된 문장 인덱스
  setSelectedSentenceIdx: (idx: number) => void;
  dictInputValue: string;
  setDictInputvalue: (newInputValue: string) => void;
  isAutoScroll: boolean;
  setIsAutoScroll: (nextIsAutoScroll: boolean) => void;
  layoutMode: number;
}

const ScriptComp = ({
  tedScriptList,
  nowPlayedIdx,
  moveToTimeStamp,
  selectedSentenceIdx,
  setSelectedSentenceIdx,
  dictInputValue,
  setDictInputvalue,
  isAutoScroll,
  setIsAutoScroll,
  layoutMode,
}: // selectedWordIdxArr,
// setSelectedWordIdxArr,
IScriptCompProps) => {
  // STATE
  const [selectedWordIdxArr, setSelectedWordIdxArr] = useState<number[]>([]);
  // USEEFFECT
  useEffect(() => {
    if (null !== scriptContainerRef.current) {
      if (isAutoScroll === true) {
        if (undefined !== scriptContainerRef.current[nowPlayedIdx]) {
          // layout === 0
          if (layoutMode === 0) {
            if (nowPlayedIdx < 2) {
              scriptContainerRef.current[0].scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest',
              });
            } else if (nowPlayedIdx + 3 > tedScriptList.length) {
              scriptContainerRef.current[
                tedScriptList.length - 1
              ].scrollIntoView({
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
          } else if (layoutMode === 1) {
            // layout === 1
            if (nowPlayedIdx < 1) {
              scriptContainerRef.current[0].scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest',
              });
            } else if (nowPlayedIdx + 2 > tedScriptList.length) {
              scriptContainerRef.current[
                tedScriptList.length - 1
              ].scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest',
              });
            } else {
              scriptContainerRef.current[nowPlayedIdx + 1].scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest',
              });
            }
          } else {
            // layout === 2
            if (nowPlayedIdx < 1) {
              scriptContainerRef.current[0].scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest',
              });
            } else if (nowPlayedIdx + 1 > tedScriptList.length) {
              scriptContainerRef.current[tedScriptList.length].scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest',
              });
            } else {
              scriptContainerRef.current[nowPlayedIdx].scrollIntoView({
                behavior: 'smooth',
                block: 'end',
                inline: 'nearest',
              });
            }
          }
        }
      }
    }
  }, [nowPlayedIdx]);
  // USEREF
  const scriptContainerRef = useRef<HTMLDivElement[]>([]);
  // FUNC
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
    const spanText = (e.target as HTMLSpanElement).innerText;
    if (selectedSentenceIdx === idx) {
      // 같은 문장 안에 있을 때
      if (selectedWordIdxArr.indexOf(wordIdx) !== -1) {
        // 이미 눌렀던 단어일 때
        nextInputValue = dictInputValue
          .split(' ')
          .filter((word) => word !== spanText)
          .join(' ');
        nextInputValue = nextInputValue.replace('  ', ' ').trimEnd();
        // 빼 줌
        const nextSelectedWordIdxArr = selectedWordIdxArr.filter(
          (idx) => idx !== wordIdx
        );
        setSelectedWordIdxArr(nextSelectedWordIdxArr);
      } else {
        nextInputValue = dictInputValue + ' ' + spanText;
        nextInputValue = nextInputValue.trimStart();
        setSelectedWordIdxArr([...selectedWordIdxArr, wordIdx]);
      }
    } else {
      nextInputValue = spanText;
      // nextInputValue = nextInputValue.trimStart();
      setSelectedSentenceIdx(idx);
      setSelectedWordIdxArr([wordIdx]);
    }
    setDictInputvalue(nextInputValue);
  };

  return (
    <>
      <MainBox
        widthSize={layoutMode === 0 ? '43vw' : '82vw'}
        heightSize={
          layoutMode === 0 ? '80vh' : layoutMode === 1 ? '40vh' : '20vh'
        }
        paddingSize={'0'}
        fontColor={'black'}
        fontSize={'2vmin'}
        style={
          layoutMode === 0
            ? {
                paddingTop: '1vh',
                paddingBottom: '1vh',
                transition: 'height 1s ease-in-out',
              }
            : {
                paddingTop: '1vh',
                paddingBottom: '1vh',
                marginTop: '2vh',
                transition: 'height 1s ease-in-out',
              }
        }
      >
        <div
          style={{
            width: layoutMode === 0 ? '42.5vw' : '81vw',
            height:
              layoutMode === 0 ? '78vh' : layoutMode === 1 ? '38vh' : '18vh',
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
          onWheel={checkHumanWheel}
        >
          {tedScriptList.length !== 0
            ? tedScriptList.map((script: TedScript, idx: number) => (
                <FlexTransparentDiv
                  widthSize={layoutMode === 0 ? '45vw' : '81vw'}
                  heightSize={layoutMode === 0 ? '19.5vh' : '18vh'}
                  alignItems={'center'}
                  justifyContent={'start'}
                  paddingSize={'0'}
                  flexDirection={'row'}
                  IsBorder={'none'}
                  style={
                    layoutMode === 0
                      ? { fontSize: '2vmin' }
                      : { fontSize: '2.5vmin' }
                  }
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
                  <FlexTransparentDiv
                    widthSize={layoutMode === 0 ? '33vw' : '72vw'}
                    heightSize={layoutMode === 2 ? '18vh' : '19.5vh'}
                    alignItems={'center'}
                    justifyContent={'start'}
                    paddingSize={'0vh 2vw'}
                    flexDirection={'row'}
                    IsBorder={'none'}
                    style={
                      layoutMode === 0
                        ? { fontSize: '2vmin' }
                        : { fontSize: '2.5vmin' }
                    }
                  >
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
                  </FlexTransparentDiv>
                </FlexTransparentDiv>
              ))
            : ''}
        </div>
      </MainBox>
      <FlexTransparentDiv
        widthSize={'12vw'}
        heightSize={'5vw'}
        alignItems={'center'}
        justifyContent={'start'}
        paddingSize={'0'}
        flexDirection={'row'}
        IsBorder={'none'}
        style={
          layoutMode === 0
            ? {
                position: 'absolute',
                top: '16vh',
                right: '10vw',
                justifyContent: 'space-between',
                transition: 'all 0.5s ease-in-out',
              }
            : layoutMode === 1
            ? {
                position: 'absolute',
                top: '57vh',
                right: '13vw',
                justifyContent: 'space-between',
                transition: 'all 0.5s ease-in-out',
              }
            : {
                position: 'absolute',
                top: '77vh',
                right: '13vw',
                justifyContent: 'space-between',
                transition: 'all 0.5s ease-in-out',
              }
        }
      >
        {/* <div
          style={{
            width: '8vw',
            height: '5vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3vmin',
          }}
        >
          <p>{isAutoScroll ? 'AUTO' : 'MANUAL'}</p>
        </div> */}
        <AutoScrollBtn
          onClick={() => setIsAutoScroll(!isAutoScroll)}
          className={isAutoScroll ? 'auto-scroll' : 'manual-scroll'}
          style={{ marginLeft: '6vw' }}
        >
          <FlexTransparentDiv
            widthSize={'2vw'}
            heightSize={'3vh'}
            alignItems={'center'}
            justifyContent={'center'}
            paddingSize={'0'}
            flexDirection={'row'}
            IsBorder={'none'}
            style={{
              position: 'absolute',
              fontSize: '2vmin',
              marginLeft: '1.9vw',
              color: 'white',
            }}
          >
            {isAutoScroll ? 'ON' : 'OFF'}
          </FlexTransparentDiv>
        </AutoScrollBtn>
      </FlexTransparentDiv>
    </>
  );
};

export default ScriptComp;
