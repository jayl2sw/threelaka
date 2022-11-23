import React, { useEffect, useState } from 'react';
// import EozPage from './EOZ/EozPage';
// import EnglishOnlyZone from './EOZ/EnglishOnlyZone';
import {
  FlexTransparentDiv,
  MainBox,
  FlexFadeInOutDiv,
  MainPaleBox,
  BackBlurBox,
} from '../../styles/Common/CommonDivStyle';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { guildActions } from '../../features/guild/guild-slice';
import {
  LearnTimeProgressbar,
  AssignmentDiv,
} from '../../styles/Guild/MyGuildStyle';
import { BsCaretLeftFill, BsCaretRightFill } from 'react-icons/bs';
import { TopBtn } from '../../styles/Common/CommonBtnStyle';
import { useHorizontalScroll } from '../../utils/useSideScroll';
import VideoModal from '../../utils/VideoModal';
import GuildCompletedVideoInfo from './components/GuildCompletedVideoInfo';

const MyGuild = () => {
  const userGuildId = useAppSelector(
    (state) => state.auth.currentUser?.guildId
  );
  const dispatch = useAppDispatch();

  const myGuildInfo = useAppSelector((state) => state.guild.myGuildInfo);
  const progressTaskLst = useAppSelector(
    (state) => state.guild.progressTaskList
  );
  const upcomingTaskLst = useAppSelector(
    (state) => state.guild.upcomingTaskList
  );
  const completeTaskLst = useAppSelector(
    (state) => state.guild.completedTaskList
  );
  const myguildLearnTime = useAppSelector(
    (state) => state.guild.myguildLearnTime
  );

  const learnTimePageNum = Math.ceil(myguildLearnTime.length / 7);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [animateToggle, setAnimateToggle] = useState<boolean>(false);
  const [modalToggleVideoId, setModalToggleVideoId] = useState<string>('none');

  const [mode, setMode] = useState<number>(0);

  // useEffect
  useEffect(() => {
    if (mode === 2) {
      setTimeout(() => {
        setMode(3); // display none
      }, 1100);
    }
  }, [mode]);
  useEffect(() => {
    dispatch(guildActions.getSearchGuildStart());
    dispatch(guildActions.getGuildLearnTimeStart());
  }, [userGuildId]);
  useEffect(() => {
    dispatch(guildActions.getProgressTask());
  }, [userGuildId]);

  useEffect(() => {
    if (myguildLearnTime.length === 0) {
      return;
    }
    setTimeout(() => {
      setAnimateToggle(true);
    }, 200);
  }, [myguildLearnTime, currentPage]);

  // 수평 스크롤
  const scrollRef = useHorizontalScroll([
    mode,
  ]) as React.MutableRefObject<HTMLDivElement>;
  return (
    <>
      <VideoModal
        modalStyleNum={1}
        modalToggleVideoId={modalToggleVideoId}
        setModalToggleVideoId={setModalToggleVideoId}
      ></VideoModal>
      <FlexTransparentDiv
        widthSize={'65vw'}
        heightSize={'80vh'}
        paddingSize={'0'}
        flexDirection={'column'}
        justifyContent={'start'}
        alignItems={'start'}
        IsBorder={'none'}
      >
        <FlexTransparentDiv
          widthSize={'65vw'}
          heightSize={'10vh'}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'start'}
          IsBorder={'none'}
          style={{
            fontSize: '4vmin',
            fontFamily: 'pretendardBold',
            display: mode === 3 ? 'none' : '',
          }}
        >
          WELCOME TO {myGuildInfo.guildName}
        </FlexTransparentDiv>
        <FlexTransparentDiv
          widthSize={'65vw'}
          heightSize={mode === 3 ? '80vh' : '70vh'}
          paddingSize={'0'}
          flexDirection={'row'}
          justifyContent={'start'}
          alignItems={'start'}
          IsBorder={'none'}
        >
          <FlexTransparentDiv
            widthSize={'33vw'}
            heightSize={mode === 3 ? '80vh' : '70vh'}
            paddingSize={'0'}
            flexDirection={'column'}
            justifyContent={'start'}
            alignItems={'start'}
            IsBorder={'none'}
            style={{ marginRight: '2vw' }}
          >
            <FlexFadeInOutDiv
              widthSize={'33vw'}
              heightSize={'40vh'}
              paddingSize={'0'}
              flexDirection={'column'}
              justifyContent={'start'}
              alignItems={'start'}
              IsBorder={'none'}
              className={
                mode === 3 ? 'hidden' : mode === 2 ? 'disappear' : 'appear'
              }
            >
              <BackBlurBox
                widthSize={'33vw'}
                heightSize={'15vh'}
                paddingSize={'2vh 1vw'}
                fontSize={'2vmin'}
                fontColor={'black'}
                style={{ marginBottom: '2vh' }}
              >
                <FlexTransparentDiv
                  widthSize={'33vw'}
                  heightSize={'10vh'}
                  paddingSize={'0'}
                  flexDirection={'column'}
                  justifyContent={'start'}
                  alignItems={'start'}
                  IsBorder={'none'}
                >
                  <FlexTransparentDiv
                    widthSize={'33vw'}
                    heightSize={'5vh'}
                    paddingSize={'0 1vw'}
                    flexDirection={'row'}
                    justifyContent={'start'}
                    alignItems={'start'}
                    IsBorder={'none'}
                  >
                    <FlexTransparentDiv
                      widthSize={'30vw'}
                      heightSize={'5vh'}
                      paddingSize={'0 1vw'}
                      flexDirection={'row'}
                      justifyContent={'start'}
                      alignItems={'center'}
                      IsBorder={'none'}
                      style={{ fontSize: '3vmin' }}
                    >
                      <p
                        style={{
                          fontSize: '2.5vmin',
                          fontWeight: 'bold',
                          color: '#4A9FFF',
                          verticalAlign: 'middle',
                        }}
                      >
                        BEST MEMBER
                      </p>
                    </FlexTransparentDiv>
                  </FlexTransparentDiv>
                  <FlexTransparentDiv
                    widthSize={'33vw'}
                    heightSize={'5vh'}
                    paddingSize={'0 0 0 3vw'}
                    flexDirection={'column'}
                    justifyContent={'start'}
                    alignItems={'start'}
                    IsBorder={'none'}
                    style={{ fontSize: '2.5vmin', fontWeight: 'bold' }}
                  >
                    {myguildLearnTime[0] &&
                      `${myguildLearnTime[0].nickname}님이 ${Math.floor(
                        myguildLearnTime[0].time / 3600
                      )}시간 ${Math.floor(
                        (myguildLearnTime[0].time % 3600) / 60
                      )}분 공부했어요!`}
                  </FlexTransparentDiv>
                </FlexTransparentDiv>
              </BackBlurBox>
              <BackBlurBox
                widthSize={'33vw'}
                heightSize={'20vh'}
                paddingSize={'2vh 1vw'}
                fontSize={'2vmin'}
                fontColor={'black'}
                style={{ marginBottom: '2vh' }}
              >
                <FlexTransparentDiv
                  widthSize={'33vw'}
                  heightSize={'5vh'}
                  paddingSize={'0 1vw'}
                  flexDirection={'row'}
                  justifyContent={'start'}
                  alignItems={'start'}
                  IsBorder={'none'}
                >
                  <FlexTransparentDiv
                    widthSize={'30vw'}
                    heightSize={'5vh'}
                    paddingSize={'0 1vw'}
                    flexDirection={'row'}
                    justifyContent={'start'}
                    alignItems={'center'}
                    IsBorder={'none'}
                    style={{ fontSize: '3vmin' }}
                  >
                    <p
                      style={{
                        fontSize: '2.5vmin',
                        fontWeight: 'bold',
                        color: '#4A9FFF',
                      }}
                    >
                      NOTICE
                    </p>
                  </FlexTransparentDiv>
                </FlexTransparentDiv>
                <FlexTransparentDiv
                  widthSize={'30vw'}
                  heightSize={'15vh'}
                  paddingSize={'0 0 0 3vw'}
                  flexDirection={'row'}
                  justifyContent={'start'}
                  alignItems={'start'}
                  IsBorder={'none'}
                  style={{ fontSize: '2.5vmin' }}
                >
                  {myGuildInfo.notice}
                </FlexTransparentDiv>
              </BackBlurBox>
            </FlexFadeInOutDiv>

            <FlexFadeInOutDiv
              widthSize={'28vw'}
              heightSize={'4vh'}
              paddingSize={'0'}
              flexDirection={'row'}
              justifyContent={'start'}
              alignItems={'end'}
              IsBorder={'none'}
              className={
                mode === 3 ? 'hidden' : mode === 2 ? 'disappear' : 'appear'
              }
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
                className={mode === 0 ? '' : 'pale'}
              >
                진행중인 과제
              </TopBtn>
              <TopBtn
                widthSize={'8vw'}
                heightSize={'4.5vh'}
                paddingSize={'0'}
                fontColor={'white'}
                fontSize={'2vmin'}
                backgroundColor={'blue'}
                style={{ marginLeft: '1vw' }}
                onClick={() => {
                  setMode(1);
                }}
                className={mode === 1 ? '' : 'pale'}
              >
                예정된 과제
              </TopBtn>
              <TopBtn
                widthSize={'8vw'}
                heightSize={'4.5vh'}
                paddingSize={'0'}
                fontColor={'white'}
                fontSize={'2vmin'}
                backgroundColor={'blue'}
                style={{ marginLeft: '1vw' }}
                onClick={() => {
                  setMode(2);
                }}
                className={mode === 2 ? '' : 'pale'}
              >
                완료한 과제
              </TopBtn>
            </FlexFadeInOutDiv>
            <FlexFadeInOutDiv
              widthSize={'65vw'}
              heightSize={'80vh'}
              paddingSize={'0'}
              flexDirection={'column'}
              justifyContent={'start'}
              alignItems={'start'}
              IsBorder={'none'}
              className={
                mode === 3 ? 'hidden' : mode === 2 ? 'disappear' : 'appear'
              }
            >
              <MainBox
                widthSize={'33vw'}
                heightSize={'25vh'}
                paddingSize={'2vh 1vw'}
                fontColor={'black'}
                fontSize={'1vmin'}
                style={{
                  overflowY: 'hidden',
                  overflowX: 'scroll',
                  boxShadow: 'none',
                  display: 'flex',
                  transition: 'all 1s ease-in-out',
                }}
                ref={scrollRef}
              >
                {mode === 0 ? (
                  <>
                    {progressTaskLst.map((task, idx) => {
                      return (
                        <AssignmentDiv
                          key={`video-progree-${idx}`}
                          dueDate={task.startDate}
                          onClick={() => setModalToggleVideoId(task.videoId)}
                          style={{
                            cursor: 'pointer',
                            margin: '0.5vw',
                            position: 'relative',
                          }}
                        >
                          <img
                            style={{
                              width: '15vw',
                              height: '18vh',
                              objectFit: 'cover',
                              borderRadius: '10px',
                            }}
                            src={`https://img.youtube.com/vi/${task.videoId}/0.jpg`}
                          ></img>
                        </AssignmentDiv>
                      );
                      // return <p key={`task-${idx}`}>{task.videoId}</p>;
                    })}
                  </>
                ) : mode === 1 ? (
                  <>
                    {upcomingTaskLst.map((task, idx) => {
                      return (
                        <AssignmentDiv
                          key={`video-upcome-${idx}`}
                          dueDate={task.startDate}
                          onClick={() => setModalToggleVideoId(task.videoId)}
                          style={{
                            cursor: 'pointer',
                            margin: '0.5vw',
                            position: 'relative',
                          }}
                        >
                          <img
                            style={{
                              width: '15vw',
                              height: '18vh',
                              objectFit: 'cover',
                              borderRadius: '10px',
                            }}
                            src={`https://img.youtube.com/vi/${task.videoId}/0.jpg`}
                          ></img>
                        </AssignmentDiv>
                      );
                      // return <p key={`task-${idx}`}>{task.videoId}</p>;
                    })}
                  </>
                ) : (
                  ''
                )}
              </MainBox>
            </FlexFadeInOutDiv>
            <FlexFadeInOutDiv
              widthSize={'65vw'}
              heightSize={'80vh'}
              paddingSize={'0'}
              flexDirection={'column'}
              justifyContent={'start'}
              alignItems={'start'}
              IsBorder={'none'}
              className={
                mode === 3 ? 'appear' : mode === 2 ? 'disappear' : 'hidden'
              }
            >
              <MainBox
                widthSize={'65vw'}
                heightSize={'80vh'}
                paddingSize={'2vh 1vw'}
                fontColor={'black'}
                fontSize={'1vmin'}
                style={{
                  overflowY: 'hidden',
                  overflowX: 'hidden',
                  boxShadow: 'none',
                  display: 'flex',
                }}
              >
                {mode === 3 ? (
                  <GuildCompletedVideoInfo
                    completeTaskLst={completeTaskLst}
                    setMode={setMode}
                  ></GuildCompletedVideoInfo>
                ) : (
                  ''
                )}
              </MainBox>
            </FlexFadeInOutDiv>
          </FlexTransparentDiv>
          {/* 길드원 주간 학습량 프로그래스바 */}
          <FlexFadeInOutDiv
            widthSize={'30vw'}
            heightSize={'70vh'}
            paddingSize={'0'}
            flexDirection={'column'}
            justifyContent={'start'}
            alignItems={'start'}
            IsBorder={'none'}
            style={{
              position: 'relative',
            }}
            className={
              mode === 3 ? 'hidden' : mode === 2 ? 'disappear' : 'appear'
            }
          >
            <FlexTransparentDiv
              widthSize={'30vw'}
              heightSize={'70vh'}
              paddingSize={'1vh 1vw'}
              flexDirection={'column'}
              justifyContent={'start'}
              alignItems={'start'}
              IsBorder={'none'}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'start',
                  minHeight: '56vh',
                }}
              >
                {myguildLearnTime
                  .slice(7 * (currentPage - 1), 7 * currentPage)
                  .map((learnRecord, idx) => {
                    const timePercent =
                      (learnRecord.time / myguildLearnTime[0].time) * 100;
                    return (
                      <FlexTransparentDiv
                        key={`progress-${idx}`}
                        widthSize={'28vw'}
                        heightSize={'8vh'}
                        paddingSize={'0'}
                        flexDirection={'column'}
                        justifyContent={'start'}
                        alignItems={'center'}
                        IsBorder={'none'}
                      >
                        <FlexTransparentDiv
                          widthSize={'28vw'}
                          heightSize={'4vh'}
                          paddingSize={'0'}
                          flexDirection={'row'}
                          justifyContent={'start'}
                          alignItems={'center'}
                          IsBorder={'none'}
                          style={{ fontSize: '2.5vmin', fontWeight: 'bold' }}
                        >
                          {learnRecord.nickname}
                        </FlexTransparentDiv>
                        <FlexTransparentDiv
                          widthSize={'28vw'}
                          heightSize={'4vh'}
                          paddingSize={'0'}
                          flexDirection={'row'}
                          justifyContent={'start'}
                          alignItems={'center'}
                          IsBorder={'none'}
                        >
                          <LearnTimeProgressbar
                            widthSize={'20vw'}
                            heightSize={'2vh'}
                            progressPercent={timePercent}
                            animeIdx={idx}
                            profileNum={learnRecord.profile}
                            className={animateToggle ? 'on' : 'off'}
                            style={{ marginBottom: '1vh' }}
                          />
                          <FlexTransparentDiv
                            widthSize={'8vw'}
                            heightSize={'4vh'}
                            paddingSize={'0'}
                            flexDirection={'row'}
                            justifyContent={'end'}
                            alignItems={'center'}
                            IsBorder={'none'}
                            style={{
                              paddingBottom: '1.5vh',
                              fontSize: '2.5vmin',
                              fontWeight: 'bold',
                              color: '#4A9FFF',
                            }}
                          >
                            {Math.floor(learnRecord.time / 3600)}시간&nbsp;
                            {Math.floor((learnRecord.time % 3600) / 60)}분
                          </FlexTransparentDiv>
                        </FlexTransparentDiv>
                      </FlexTransparentDiv>
                    );
                  })}
              </div>
              <FlexTransparentDiv
                widthSize={'29vw'}
                heightSize={'5vh'}
                paddingSize={'1vh 1vw'}
                flexDirection={'row'}
                justifyContent={'end'}
                alignItems={'center'}
                IsBorder={'none'}
              >
                {currentPage === 1 ? (
                  <div style={{ width: '20px', height: '20px' }}></div>
                ) : (
                  <BsCaretLeftFill
                    size={20}
                    onClick={() => {
                      setAnimateToggle(false);
                      setCurrentPage((currentPage) => currentPage - 1);
                    }}
                    style={{ cursor: 'pointer' }}
                  ></BsCaretLeftFill>
                )}
                {currentPage}&nbsp;/&nbsp;{learnTimePageNum}
                {currentPage === learnTimePageNum ? (
                  <div style={{ width: '20px', height: '20px' }}></div>
                ) : (
                  <BsCaretRightFill
                    onClick={() => {
                      setAnimateToggle(false);
                      setCurrentPage((currentPage) => currentPage + 1);
                    }}
                    size={20}
                    style={{ cursor: 'pointer' }}
                  ></BsCaretRightFill>
                )}
              </FlexTransparentDiv>
            </FlexTransparentDiv>
          </FlexFadeInOutDiv>
        </FlexTransparentDiv>
      </FlexTransparentDiv>
    </>
  );
};

export default MyGuild;
