import { useState, useEffect, useRef, useCallback } from 'react';
import YouTube, { YouTubePlayer } from 'react-youtube';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { useNavigate, useParams, useOutletContext } from 'react-router-dom';
import { readActions } from '../../../features/Read/read-slice';
import { studyActions } from '../../../features/study/study-slice';
import { FlexTransparentDiv } from '../../../styles/Common/CommonDivStyle';
import { MoveToNextRightBtn } from '../../../styles/Common/CommonBtnStyle';
import { StudyPageParams } from '../../../models';
import { IheaderProps } from '../../../layout/Header';
import { AiOutlineRight } from 'react-icons/ai';
import { HiBars2 } from 'react-icons/hi2';
import { HiBarsArrowDown } from 'react-icons/hi2';
import { MdUnfoldLess } from 'react-icons/md';
import DictionaryComp from './components/DictionaryComp';
import ScriptComp from './components/ScriptComp';
import VideoComp from './components/VideoComp';
import CircularNavComp from './components/CircularNavComp';

let videoElement: YouTubePlayer = null;

const ReadPage = () => {
  const { customMoveToNext } = useOutletContext<IheaderProps>();
  const moveToNext = customMoveToNext;
  const pageParams: StudyPageParams = useParams() as any;
  const dispatch = useAppDispatch();
  // STATE
  const [nowPlayedIdx, setNowPlayedIdx] = useState<number>(10);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isAutoScroll, setIsAutoScroll] = useState<boolean>(true);
  const tedScriptList = useAppSelector((state) => state.read.TedScriptList);
  const [dictInputValue, setDictInputvalue] = useState<string>('');
  const [selectedSentenceIdx, setSelectedSentenceIdx] = useState<number | null>(
    null
  );
  const [layoutMode, setLayoutMode] = useState<number>(0);
  // USEREF
  const studyDuration = useRef<number>(0);

  // FUNC
  const _onReady = (event: YouTubePlayer) => {
    videoElement = event;
  };

  const moveToTimeStamp = useCallback(
    (idx: number) => {
      console.log('들어왔어요', idx);
      const targetTime = tedScriptList[idx].start;
      videoElement.target.seekTo(targetTime, 1);
    },
    [videoElement]
  );
  //USEEFFECT
  // 비디오 엘리먼트 들어오면 현재 시각 세팅
  useEffect(() => {
    if (videoElement) {
      // get current time
      // console.log(videoElement.target);
      const elapsed_seconds = videoElement.target.getCurrentTime();
      setCurrentTime(elapsed_seconds);
    }
  }, [videoElement]);

  // 처음에 단어장 가져옴
  useEffect(() => {
    dispatch(studyActions.getWordBookStart(pageParams.learningRecordId));
  }, []);

  // 1초 단위로 계속 현재 시간 업데이트 하는 SetInterval
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
    };
  }, []);

  // 스크립트 가져오기
  useEffect(() => {
    if (pageParams.videoId !== '') {
      dispatch(readActions.getScripts(pageParams.videoId));
    }
  }, [pageParams.videoId]);

  // 현재 시간에 따라 어떤 스크립트 부분이 실행되고 있는지 업데이트
  useEffect(() => {
    if (tedScriptList.length === 0) {
      return;
    }
    let tempCurrentIdx = nowPlayedIdx;

    // console.log("얍얍얍",tedScriptList[tempCurrentIdx].start)
    if (currentTime > tedScriptList[tempCurrentIdx].start) {
      while (currentTime > tedScriptList[tempCurrentIdx].start) {
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
        tempCurrentIdx--;
      }
    }
    setNowPlayedIdx(tempCurrentIdx);
  }, [currentTime]);

  return (
    <>
      {layoutMode === 1 ? (
        <FlexTransparentDiv
          widthSize={'5vmin'}
          heightSize={'5vmin'}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'none'}
          onClick={() => setLayoutMode(2)}
          style={{
            position: 'absolute',
            top: '59vh',
            right: '50vw',
            cursor: 'pointer',
          }}
        >
          <HiBarsArrowDown size={20}></HiBarsArrowDown>
        </FlexTransparentDiv>
      ) : (
        ''
      )}

      <FlexTransparentDiv
        widthSize={'100vw'}
        heightSize={'85vh'}
        paddingSize={'0vh 5vw 0vh 5vw'}
        flexDirection={layoutMode ? 'column' : 'row'}
        justifyContent={'center'}
        alignItems={'center'}
        IsBorder={'none'}
        style={{ fontFamily: 'PretendardRegular' }}
      >
        {/* 라이팅으로 가기 */}
        {layoutMode === 0 ? (
          <>
            <FlexTransparentDiv
              widthSize={'40vw'}
              heightSize={'80vh'}
              paddingSize={'0'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              IsBorder={'none'}
              style={{ transition: 'all 0.5s ease-in-out' }}
            >
              <VideoComp
                pageParams={pageParams}
                onReady={_onReady}
                layoutMode={layoutMode}
              ></VideoComp>

              <DictionaryComp
                selectedSentenceProp={
                  selectedSentenceIdx === null
                    ? ''
                    : tedScriptList[selectedSentenceIdx].text
                }
                pageParams={pageParams}
                dictInputValue={dictInputValue}
                setDictInputvalue={setDictInputvalue}
                layoutMode={layoutMode}
              ></DictionaryComp>
            </FlexTransparentDiv>

            <FlexTransparentDiv
              widthSize={'2vw'}
              heightSize={'80vh'}
              paddingSize={'0'}
              flexDirection={'column'}
              justifyContent={'start'}
              alignItems={'center'}
              IsBorder={'none'}
              style={{ transition: 'all 0.5s ease-in-out' }}
            ></FlexTransparentDiv>

            <ScriptComp
              tedScriptList={tedScriptList}
              nowPlayedIdx={nowPlayedIdx}
              moveToTimeStamp={moveToTimeStamp}
              selectedSentenceIdx={selectedSentenceIdx}
              setSelectedSentenceIdx={setSelectedSentenceIdx}
              dictInputValue={dictInputValue}
              setDictInputvalue={setDictInputvalue}
              isAutoScroll={isAutoScroll}
              setIsAutoScroll={setIsAutoScroll}
              layoutMode={layoutMode}
            ></ScriptComp>
          </>
        ) : (
          <>
            <FlexTransparentDiv
              widthSize={'85vw'}
              heightSize={layoutMode === 1 ? '40vh' : '60vh'}
              paddingSize={'0'}
              flexDirection={'row'}
              justifyContent={'center'}
              alignItems={'center'}
              IsBorder={'none'}
              style={{ transition: 'all 0.8s ease-in-out' }}
            >
              <VideoComp
                pageParams={pageParams}
                onReady={_onReady}
                layoutMode={layoutMode}
              ></VideoComp>
              {/* spacer */}
              <FlexTransparentDiv
                widthSize={'2vw'}
                heightSize={layoutMode === 1 ? '40vh' : '60vh'}
                paddingSize={'0'}
                flexDirection={'column'}
                justifyContent={'start'}
                alignItems={'center'}
                IsBorder={'none'}
              ></FlexTransparentDiv>
              <DictionaryComp
                selectedSentenceProp={
                  selectedSentenceIdx === null
                    ? ''
                    : tedScriptList[selectedSentenceIdx].text
                }
                pageParams={pageParams}
                dictInputValue={dictInputValue}
                setDictInputvalue={setDictInputvalue}
                layoutMode={layoutMode}
              ></DictionaryComp>
            </FlexTransparentDiv>
            {/* 
            <FlexTransparentDiv
              widthSize={'2vw'}
              heightSize={'80vh'}
              paddingSize={'0'}
              flexDirection={'column'}
              justifyContent={'start'}
              alignItems={'center'}
              IsBorder={'none'}
            ></FlexTransparentDiv> */}

            <ScriptComp
              tedScriptList={tedScriptList}
              nowPlayedIdx={nowPlayedIdx}
              moveToTimeStamp={moveToTimeStamp}
              selectedSentenceIdx={selectedSentenceIdx}
              setSelectedSentenceIdx={setSelectedSentenceIdx}
              dictInputValue={dictInputValue}
              setDictInputvalue={setDictInputvalue}
              isAutoScroll={isAutoScroll}
              setIsAutoScroll={setIsAutoScroll}
              layoutMode={layoutMode}
            ></ScriptComp>
          </>
        )}
        <MoveToNextRightBtn
          onClick={(e) => moveToNext(e, 'WRITING', pageParams)}
        >
          <AiOutlineRight size={30} />
          <p>writing</p>
        </MoveToNextRightBtn>
      </FlexTransparentDiv>
      <CircularNavComp
        layoutMode={layoutMode}
        setLayoutMode={setLayoutMode}
      ></CircularNavComp>
    </>
  );
};

export default ReadPage;
