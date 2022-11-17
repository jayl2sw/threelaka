import React, { useEffect, useState } from 'react';
import EozPage from './EOZ/EozPage';
import {
  FlexTransparentDiv,
  MainBox,
} from '../../styles/Common/CommonDivStyle';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { guildActions } from '../../features/guild/guild-slice';
import { LearnTimeProgressbar } from '../../styles/Guild/MyGuildStyle';
import { AiFillFire, AiFillBell } from 'react-icons/ai';
import { VscTriangleLeft, VscTriangleRight } from 'react-icons/vsc';
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

  const guildId = myGuildInfo.guildId;
  let nickname = useAppSelector((state) => state.auth.currentUser?.nickname);
  nickname = nickname ? nickname : '';
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
        WELCOM TO {myGuildInfo.guildName}
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
                  <AiFillFire size={30}></AiFillFire>
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
                    best Member
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
                  style={{ fontSize: '3vmin' }}
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
                <AiFillBell size={30}></AiFillBell>
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
                  NOTICE
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
                style={{ fontSize: '3vmin' }}
              >
                {myGuildInfo.notice}
                {'hdhdhdh'}
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
                style={{ fontSize: '3vmin' }}
              >
                이번주의 영상
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
        >
          <FlexTransparentDiv
            widthSize={'30vw'}
            heightSize={'40vh'}
            paddingSize={'1vh 1vw'}
            flexDirection={'column'}
            justifyContent={'start'}
            alignItems={'start'}
            IsBorder={'is'}
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
  );
};

export default MyGuild;
