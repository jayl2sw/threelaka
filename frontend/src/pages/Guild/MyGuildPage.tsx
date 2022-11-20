import React, { useEffect, useState } from 'react';
import EozPage from './EOZ/EozPage';
// import EnglishOnlyZone from './EOZ/EnglishOnlyZone';
import {
  FlexTransparentDiv,
  MainBox,
} from '../../styles/Common/CommonDivStyle';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { guildActions } from '../../features/guild/guild-slice';
import { LearnTimeProgressbar } from '../../styles/Guild/MyGuildStyle';
import { AiFillFire, AiFillBell } from 'react-icons/ai';
import { GoFlame } from 'react-icons/go';
import { VscTriangleLeft, VscTriangleRight } from 'react-icons/vsc';
import { TopBtn } from '../../styles/Common/CommonBtnStyle';
import { useHorizontalScroll } from '../../utils/useSideScroll';
import VideoModal from '../../utils/VideoModal';

const MyGuild = () => {
  const userGuildId = useAppSelector(
    (state) => state.auth.currentUser?.guildId
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(guildActions.getSearchGuildStart());
    dispatch(guildActions.getGuildLearnTimeStart());
  }, [userGuildId]);
  useEffect(() => {
    dispatch(guildActions.getProgressTask());
  }, [userGuildId]);
  const myGuildInfo = useAppSelector((state) => state.guild.myGuildInfo);
  const progressTaskLst = useAppSelector(
    (state) => state.guild.progressTaskList
  );
  const myguildLearnTime = useAppSelector(
    (state) => state.guild.myguildLearnTime
  );

  const learnTimePageNum = Math.ceil(myguildLearnTime.length / 6);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [roomNubmer, setRoomNumber] = useState<number>(0);
  const [modalToggleVideoId, setModalToggleVideoId] = useState<string>('none');

  // EOZ에 필요한 데이터 (props해줄 것임)
  const guildId = myGuildInfo.guildId;
  let nickname = useAppSelector((state) => state.auth.currentUser?.nickname);
  nickname = nickname ? nickname : '';

  // 수평 스크롤
  const scrollRef = useHorizontalScroll(
    []
  ) as React.MutableRefObject<HTMLDivElement>;
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
          style={{ fontSize: '4vmin', fontFamily: 'pretendardBold' }}
        >
          WELCOME TO {myGuildInfo.guildName}
        </FlexTransparentDiv>
        <FlexTransparentDiv
          widthSize={'65vw'}
          heightSize={'70vh'}
          paddingSize={'0'}
          flexDirection={'row'}
          justifyContent={'start'}
          alignItems={'start'}
          IsBorder={'none'}
        >
          <FlexTransparentDiv
            widthSize={'33vw'}
            heightSize={'70vh'}
            paddingSize={'0'}
            flexDirection={'column'}
            justifyContent={'start'}
            alignItems={'start'}
            IsBorder={'none'}
            style={{ marginRight: '2vw' }}
          >
            <FlexTransparentDiv
              widthSize={'33vw'}
              heightSize={'40vh'}
              paddingSize={'0'}
              flexDirection={'column'}
              justifyContent={'start'}
              alignItems={'start'}
              IsBorder={'none'}
            >
              <FlexTransparentDiv
                widthSize={'33vw'}
                heightSize={'20vh'}
                paddingSize={'0'}
                flexDirection={'column'}
                justifyContent={'start'}
                alignItems={'start'}
                IsBorder={'none'}
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
                    <GoFlame
                      size={30}
                      color="red"
                      style={{ height: '4vh' }}
                    ></GoFlame>
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
                          fontSize: '2vmin',
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
                    paddingSize={'0 0 0 4vw'}
                    flexDirection={'column'}
                    justifyContent={'start'}
                    alignItems={'start'}
                    IsBorder={'none'}
                    style={{ fontSize: '2.5vmin' }}
                  >
                    {myguildLearnTime[0] &&
                      `${myguildLearnTime[0].nickname}님이 ${Math.floor(
                        myguildLearnTime[0].time / 3600
                      )}시간 ${Math.floor(
                        myguildLearnTime[0].time % 60
                      )}분 공부했어요!`}
                  </FlexTransparentDiv>
                </FlexTransparentDiv>
                <FlexTransparentDiv
                  widthSize={'33vw'}
                  heightSize={'10vh'}
                  paddingSize={'0'}
                  flexDirection={'column'}
                  justifyContent={'start'}
                  alignItems={'start'}
                  IsBorder={'none'}
                ></FlexTransparentDiv>
              </FlexTransparentDiv>
              <FlexTransparentDiv
                widthSize={'33vw'}
                heightSize={'20vh'}
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
                  <AiFillBell
                    size={30}
                    color="#ffb94c"
                    style={{ height: '5vh' }}
                  ></AiFillBell>
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
                        fontSize: '2vmin',
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
                  paddingSize={'1vh 0 0 4vw'}
                  flexDirection={'row'}
                  justifyContent={'start'}
                  alignItems={'start'}
                  IsBorder={'none'}
                  style={{ fontSize: '2.5vmin' }}
                >
                  {myGuildInfo.notice}
                </FlexTransparentDiv>
              </FlexTransparentDiv>
            </FlexTransparentDiv>
            <FlexTransparentDiv
              widthSize={'33vw'}
              heightSize={'30vh'}
              paddingSize={'0'}
              flexDirection={'column'}
              justifyContent={'start'}
              alignItems={'start'}
              IsBorder={'none'}
            >
              <MainBox
                widthSize={'33vw'}
                heightSize={'30vh'}
                paddingSize={'0'}
                fontSize={'2vmin'}
                fontColor={'black'}
                style={{
                  display: 'flex',
                  justifyContent: 'start',
                  flexDirection: 'column',
                  boxShadow: 'none',
                }}
              >
                <FlexTransparentDiv
                  widthSize={'33vw'}
                  heightSize={'5vh'}
                  paddingSize={'0 0 0 1vw'}
                  flexDirection={'column'}
                  justifyContent={'center'}
                  alignItems={'start'}
                  IsBorder={'none'}
                  style={{
                    fontSize: '2.5vmin',
                    fontWeight: 'bold',
                  }}
                >
                  이번 주의 영상
                </FlexTransparentDiv>
                <div
                  style={{
                    width: '32vw',
                    height: '23vh',
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'start',
                    // border: 'solid red 1px',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    marginTop: '1vh',
                  }}
                  ref={scrollRef}
                >
                  {/* 진행중인 정보들이 옵니다 */}
                  {progressTaskLst.map((task, idx) => {
                    return (
                      <FlexTransparentDiv
                        key={`video-progree-${idx}`}
                        widthSize={'15vw'}
                        heightSize={'20vh'}
                        paddingSize={'0'}
                        flexDirection={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        IsBorder={'none'}
                        onClick={() => setModalToggleVideoId(task.videoId)}
                        style={{
                          cursor: 'pointer',
                          borderTop: '10px solid black',
                          borderBottom: '10px solid black',
                          borderRadius: '10px',
                          background: 'black',
                          margin: '0.5vw',
                          position: 'relative',
                        }}
                      >
                        <img
                          style={{
                            width: '15vw',
                            height: '18vh',
                            objectFit: 'cover',
                          }}
                          src={`https://img.youtube.com/vi/${task.videoId}/0.jpg`}
                        ></img>
                        <div
                          style={{
                            position: 'absolute',
                            width: '10vw',
                            top: '0.5vh',
                            left: '1vw',
                            color: 'white',
                            fontSize: '2.5vmin',
                          }}
                        >
                          ~{task.startDate}
                        </div>
                      </FlexTransparentDiv>
                    );
                    // return <p key={`task-${idx}`}>{task.videoId}</p>;
                  })}
                </div>
              </MainBox>
            </FlexTransparentDiv>
          </FlexTransparentDiv>
          <FlexTransparentDiv
            widthSize={'30vw'}
            heightSize={'70vh'}
            paddingSize={'0'}
            flexDirection={'column'}
            justifyContent={'start'}
            alignItems={'start'}
            IsBorder={'none'}
            style={{ position: 'relative' }}
          >
            <FlexTransparentDiv
              widthSize={'30vw'}
              heightSize={'40vh'}
              paddingSize={'1vh 1vw'}
              flexDirection={'column'}
              justifyContent={'space-between'}
              alignItems={'start'}
              IsBorder={'none'}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'start',
                }}
              >
                {myguildLearnTime
                  .slice(6 * (currentPage - 1), 6 * currentPage)
                  .map((learnRecord, idx) => {
                    const timePercent =
                      (learnRecord.time / myguildLearnTime[0].time) * 100;
                    return (
                      <FlexTransparentDiv
                        widthSize={'28vw'}
                        heightSize={'5vh'}
                        paddingSize={'0'}
                        flexDirection={'row'}
                        justifyContent={'start'}
                        alignItems={'center'}
                        IsBorder={'none'}
                      >
                        <FlexTransparentDiv
                          widthSize={'5vw'}
                          heightSize={'5vh'}
                          paddingSize={'0'}
                          flexDirection={'row'}
                          justifyContent={'start'}
                          alignItems={'center'}
                          IsBorder={'none'}
                        >
                          {learnRecord.nickname}
                        </FlexTransparentDiv>
                        <LearnTimeProgressbar
                          widthSize={'23vw'}
                          heightSize={'2vh'}
                          progressPercent={timePercent}
                          style={{ marginBottom: '1vh' }}
                        />
                      </FlexTransparentDiv>
                    );
                  })}
              </div>
              <FlexTransparentDiv
                widthSize={'28vw'}
                heightSize={'5vh'}
                paddingSize={'1vh 1vw'}
                flexDirection={'row'}
                justifyContent={'end'}
                alignItems={'center'}
                IsBorder={'none'}
              >
                {currentPage === 1 ? (
                  ''
                ) : (
                  <VscTriangleLeft
                    size={30}
                    onClick={() =>
                      setCurrentPage((currentPage) => currentPage - 1)
                    }
                  ></VscTriangleLeft>
                )}
                {currentPage}&nbsp;/&nbsp;{learnTimePageNum}
                {currentPage === learnTimePageNum ? (
                  ''
                ) : (
                  <VscTriangleRight
                    onClick={() =>
                      setCurrentPage((currentPage) => currentPage + 1)
                    }
                    size={30}
                  ></VscTriangleRight>
                )}
              </FlexTransparentDiv>
            </FlexTransparentDiv>

            <FlexTransparentDiv
              widthSize={'30vw'}
              heightSize={'30vh'}
              paddingSize={'0'}
              flexDirection={'column'}
              justifyContent={'start'}
              alignItems={'start'}
              IsBorder={'is'}
            >
              <EozPage guildId={guildId} nickname={nickname} />
            </FlexTransparentDiv>
          </FlexTransparentDiv>
        </FlexTransparentDiv>
      </FlexTransparentDiv>
    </>
  );
};

export default MyGuild;
