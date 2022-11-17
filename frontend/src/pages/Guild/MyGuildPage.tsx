import React, { useEffect, useState } from 'react';
import EnglishOnlyZone from './EOZ/EnglishOnlyZone';
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

const MyGuild = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(guildActions.getSearchGuildStart());
    dispatch(guildActions.getGuildLearnTimeStart());
  }, []);
  const myGuildInfo = useAppSelector((state) => state.guild.myGuildInfo);
  const myguildLearnTime = useAppSelector(
    (state) => state.guild.myguildLearnTime
  );
  const learnTimePageNum = Math.ceil(myguildLearnTime.length / 6);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [roomNubmer, setRoomNumber] = useState<number>(0);
  return (
    <FlexTransparentDiv
      widthSize={'65vw'}
      heightSize={'80vh'}
      paddingSize={'0'}
      flexDirection={'column'}
      justifyContent={'start'}
      alignItems={'start'}
      IsBorder={'is'}
    >
      <FlexTransparentDiv
        widthSize={'65vw'}
        heightSize={'10vh'}
        paddingSize={'0'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'start'}
        IsBorder={'is'}
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
        IsBorder={'is'}
      >
        <FlexTransparentDiv
          widthSize={'33vw'}
          heightSize={'70vh'}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'start'}
          alignItems={'start'}
          IsBorder={'is'}
          style={{ marginRight: '2vw' }}
        >
          <FlexTransparentDiv
            widthSize={'33vw'}
            heightSize={'40vh'}
            paddingSize={'0'}
            flexDirection={'column'}
            justifyContent={'start'}
            alignItems={'start'}
            IsBorder={'is'}
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
                    )}분 공부했어요`}
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
                widthSize={'33vw'}
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
            IsBorder={'is'}
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
                IsBorder={'is'}
                style={{
                  fontSize: '2.5vmin',
                  fontWeight: 'bold',
                }}
              >
                이번 주의 영상
              </FlexTransparentDiv>
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
          IsBorder={'is'}
          style={{ position: 'relative' }}
        >
          <FlexTransparentDiv
            widthSize={'30vw'}
            heightSize={'40vh'}
            paddingSize={'1vh 1vw'}
            flexDirection={'column'}
            justifyContent={'space-between'}
            alignItems={'start'}
            IsBorder={'is'}
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
          <TopBtn
            widthSize="5vw"
            heightSize="5vh"
            paddingSize="0"
            fontSize="2vmin"
            fontColor="white"
            backgroundColor="blue"
            style={{ position: 'absolute', bottom: '30vh', left: '1vw' }}
            onClick={() => {
              setRoomNumber(1);
            }}
          >
            방1
          </TopBtn>
          <TopBtn
            widthSize="5vw"
            heightSize="5vh"
            paddingSize="0"
            fontSize="2vmin"
            fontColor="white"
            backgroundColor="blue"
            style={{ position: 'absolute', bottom: '30vh', left: '6.25vw' }}
            onClick={() => {
              setRoomNumber(2);
            }}
          >
            방2
          </TopBtn>
          <TopBtn
            widthSize="5vw"
            heightSize="5vh"
            paddingSize="0"
            fontSize="2vmin"
            fontColor="white"
            backgroundColor="blue"
            style={{ position: 'absolute', bottom: '30vh', left: '11.5vw' }}
            onClick={() => {
              setRoomNumber(3);
            }}
          >
            방3
          </TopBtn>
          <FlexTransparentDiv
            widthSize={'30vw'}
            heightSize={'30vh'}
            paddingSize={'0'}
            flexDirection={'column'}
            justifyContent={'start'}
            alignItems={'start'}
            IsBorder={'is'}
          >
            <EnglishOnlyZone />
          </FlexTransparentDiv>
        </FlexTransparentDiv>
      </FlexTransparentDiv>
    </FlexTransparentDiv>
  );
};

export default MyGuild;
