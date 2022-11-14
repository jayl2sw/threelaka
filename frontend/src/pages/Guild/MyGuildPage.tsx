import React, { useEffect } from 'react';
import EnglishOnlyZone from './EOZ/EnglishOnlyZone';
import { FlexTransparentDiv } from '../../styles/Common/CommonDivStyle';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { guildActions } from '../../features/guild/guild-slice';
import { LearnTimeProgressbar } from '../../styles/Guild/MyGuildStyle';
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
              IsBorder={'is'}
            >
              {`${myguildLearnTime[0].nickname}님이 ${myguildLearnTime[0].time}시간 공부했음`}
            </FlexTransparentDiv>
            <FlexTransparentDiv
              widthSize={'33vw'}
              heightSize={'20vh'}
              paddingSize={'0'}
              flexDirection={'column'}
              justifyContent={'start'}
              alignItems={'start'}
              IsBorder={'is'}
            >
              {myGuildInfo.notice}
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
          ></FlexTransparentDiv>
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
            {myguildLearnTime.map((learnRecord, idx) => {
              const timePercent = (learnRecord.time / 30000) * 100;
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
            <EnglishOnlyZone />
          </FlexTransparentDiv>
        </FlexTransparentDiv>
      </FlexTransparentDiv>
    </FlexTransparentDiv>
  );
};

export default MyGuild;
