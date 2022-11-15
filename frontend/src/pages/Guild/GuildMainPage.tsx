import React, { useEffect } from 'react';
import { TopBtn } from '../../styles/Common/CommonBtnStyle';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { FlexTransparentDiv } from '../../styles/Common/CommonDivStyle';
import {
  GuildBlueArcodian,
  GuildBlueArcodianItem,
} from '../../styles/Guild/GuildMainStyle';
import { guildActions } from '../../features/guild/guild-slice';
import {
  BackBlurBox,
  MainBox,
  GradientCircleDiv,
} from '../../styles/Common/CommonDivStyle';

const GuildMain = () => {
  const dispatch = useAppDispatch();
  // useSelector
  const topThreeGuild = useAppSelector(
    (state) => state.guild.topThreeGuildList
  );
  const sortedGuild = useAppSelector((state) => state.guild.guildSortedList);
  const myGuildInfo = useAppSelector((state) => state.guild.myGuildInfo);
  // useEffect
  useEffect(() => {
    dispatch(guildActions.getTopThreeGuildStart());
    dispatch(guildActions.getSortedGuildStart('activity'));
    dispatch(guildActions.getSearchGuildStart());
  }, []);
  // onClickHandler
  const onClickGuildSortedList = (basis: string) => {
    dispatch(guildActions.getSortedGuildStart(basis));
  };

  return (
    <div>
      <FlexTransparentDiv
        widthSize={'65vw'}
        heightSize={'5vh'}
        paddingSize={'0'}
        flexDirection={'row'}
        justifyContent={'start'}
        alignItems={'center'}
        IsBorder={'is'}
        style={{ fontSize: '3vmin' }}
      >
        이번주 우수 길드
      </FlexTransparentDiv>
      <FlexTransparentDiv
        widthSize={'65vw'}
        heightSize={'75vh'}
        paddingSize={'0'}
        flexDirection={'row'}
        justifyContent={'start'}
        alignItems={'start'}
        IsBorder={'is'}
      >
        <FlexTransparentDiv
          widthSize={'35vw'}
          heightSize={'75vh'}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'is'}
        >
          <MainBox
            widthSize={'32vw'}
            heightSize={'30vh'}
            paddingSize={'2vw 1vw'}
            fontColor={'black'}
            fontSize={'3vmin'}
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'end',
              marginBottom: '2vh',
              // border: 'solid black 1px',
            }}
          >
            {topThreeGuild.length !== 0 ? (
              <>
                <GradientCircleDiv
                  widthSize={'20vmin'}
                  heightSize={'20vmin'}
                  paddingSize={'0'}
                  fontColor={'black'}
                  fontSize={'2vmin'}
                  backgroundUrl={topThreeGuild[0].profile}
                  style={{ position: 'relative', marginRight: '1vw' }}
                >
                  <div
                    style={{
                      width: '20vmin',
                      height: '5vmin',
                      fontSize: '2vmin',
                      position: 'absolute',
                      top: '19vmin',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontWeight: 'bold',
                    }}
                  >
                    {topThreeGuild[0].guildName.substring(6, 0)}
                  </div>
                </GradientCircleDiv>
                <GradientCircleDiv
                  widthSize={'15vmin'}
                  heightSize={'15vmin'}
                  paddingSize={'0'}
                  fontColor={'black'}
                  fontSize={'1vmin'}
                  backgroundUrl={topThreeGuild[1].profile}
                  style={{ position: 'relative', marginRight: '1vw' }}
                >
                  <div
                    style={{
                      width: '15vmin',
                      height: '5vmin',
                      fontSize: '2vmin',
                      position: 'absolute',
                      top: '14vmin',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontWeight: 'bold',
                    }}
                  >
                    {topThreeGuild[1].guildName.substring(6, 0)}
                  </div>
                </GradientCircleDiv>
                <GradientCircleDiv
                  widthSize={'10vmin'}
                  heightSize={'10vmin'}
                  paddingSize={'0'}
                  fontColor={'black'}
                  fontSize={'2vmin'}
                  backgroundUrl={topThreeGuild[2].profile}
                  style={{ position: 'relative', marginRight: '1vw' }}
                >
                  <div
                    style={{
                      width: '10vmin',
                      height: '5vmin',
                      fontSize: '2vmin',
                      position: 'absolute',
                      top: '9vmin',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontWeight: 'bold',
                    }}
                  >
                    {topThreeGuild[2].guildName.substring(6, 0)}
                  </div>
                </GradientCircleDiv>
              </>
            ) : (
              ''
            )}
          </MainBox>
          <MainBox
            widthSize={'32vw'}
            heightSize={'40vh'}
            paddingSize={'2vh 1vw'}
            fontColor={'black'}
            fontSize={'3vmin'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {myGuildInfo.guildId === 0 ? (
              <div>길드가 없어요, 생성?</div>
            ) : (
              <>
                <FlexTransparentDiv
                  widthSize={'32vw'}
                  heightSize={'15vh'}
                  paddingSize={'0'}
                  flexDirection={'row'}
                  justifyContent={'start'}
                  alignItems={'center'}
                  IsBorder={'is'}
                >
                  <FlexTransparentDiv
                    widthSize={'10vw'}
                    heightSize={'15vh'}
                    paddingSize={'0'}
                    flexDirection={'row'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    IsBorder={'is'}
                  >
                    <GradientCircleDiv
                      widthSize={'15vmin'}
                      heightSize={'15vmin'}
                      paddingSize={'0'}
                      fontColor={'black'}
                      fontSize={'2vmin'}
                      backgroundUrl={topThreeGuild[2].profile}
                      style={{ position: 'relative', marginRight: '1vw' }}
                    ></GradientCircleDiv>
                  </FlexTransparentDiv>
                  <FlexTransparentDiv
                    widthSize={'22vw'}
                    heightSize={'15vh'}
                    paddingSize={'0'}
                    flexDirection={'column'}
                    justifyContent={'start'}
                    alignItems={'center'}
                    IsBorder={'is'}
                  >
                    <FlexTransparentDiv
                      widthSize={'22vw'}
                      heightSize={'7vh'}
                      paddingSize={'0'}
                      flexDirection={'row'}
                      justifyContent={'start'}
                      alignItems={'center'}
                      IsBorder={'is'}
                    >
                      <FlexTransparentDiv
                        widthSize={'15vw'}
                        heightSize={'7vh'}
                        paddingSize={'0'}
                        flexDirection={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        IsBorder={'is'}
                      >
                        {myGuildInfo.guildName}
                      </FlexTransparentDiv>
                      <FlexTransparentDiv
                        widthSize={'7vw'}
                        heightSize={'7vh'}
                        paddingSize={'0'}
                        flexDirection={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        IsBorder={'is'}
                      >
                        버튼위치
                      </FlexTransparentDiv>
                    </FlexTransparentDiv>
                    <FlexTransparentDiv
                      widthSize={'22vw'}
                      heightSize={'8vh'}
                      paddingSize={'0'}
                      flexDirection={'column'}
                      justifyContent={'start'}
                      alignItems={'center'}
                      IsBorder={'is'}
                    >
                      <FlexTransparentDiv
                        widthSize={'22vw'}
                        heightSize={'4vh'}
                        paddingSize={'0'}
                        flexDirection={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        IsBorder={'is'}
                      >
                        {myGuildInfo.masterNickname}
                      </FlexTransparentDiv>
                      <FlexTransparentDiv
                        widthSize={'22vw'}
                        heightSize={'4vh'}
                        paddingSize={'0'}
                        flexDirection={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        IsBorder={'is'}
                      >
                        {myGuildInfo.description}
                      </FlexTransparentDiv>
                    </FlexTransparentDiv>
                  </FlexTransparentDiv>
                </FlexTransparentDiv>
                <FlexTransparentDiv
                  widthSize={'32vw'}
                  heightSize={'21vh'}
                  paddingSize={'0'}
                  flexDirection={'column'}
                  justifyContent={'start'}
                  alignItems={'start'}
                  IsBorder={'is'}
                >
                  <FlexTransparentDiv
                    widthSize={'32vw'}
                    heightSize={'4vh'}
                    paddingSize={'0'}
                    flexDirection={'row'}
                    justifyContent={'start'}
                    alignItems={'center'}
                    IsBorder={'is'}
                  >
                    이번주의 영상
                  </FlexTransparentDiv>
                  <FlexTransparentDiv
                    widthSize={'32vw'}
                    heightSize={'17vh'}
                    paddingSize={'0'}
                    flexDirection={'row'}
                    justifyContent={'start'}
                    alignItems={'center'}
                    IsBorder={'is'}
                  >
                    동영상 위치
                  </FlexTransparentDiv>
                </FlexTransparentDiv>
              </>
            )}
          </MainBox>
        </FlexTransparentDiv>
        <FlexTransparentDiv
          widthSize={'30vw'}
          heightSize={'75vh'}
          paddingSize={'0'}
          flexDirection={'row'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'is'}
        >
          <MainBox
            widthSize={'30vw'}
            heightSize={'72vh'}
            paddingSize={'1.5vh 1vw'}
            fontColor={'black'}
            fontSize={'3vmin'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
              // overflowY: 'scroll',
              // overflowX: 'hidden',
            }}
          >
            <TopBtn
              widthSize="5vw"
              heightSize="5vh"
              paddingSize="0"
              fontSize="2vmin"
              fontColor="white"
              backgroundColor="blue"
              style={{ position: 'absolute', top: '-5vh', left: '1vw' }}
              onClick={() => onClickGuildSortedList('activity')}
            >
              활동순
            </TopBtn>
            <TopBtn
              widthSize="5vw"
              heightSize="5vh"
              paddingSize="0"
              fontSize="2vmin"
              fontColor="white"
              backgroundColor="blue"
              style={{ position: 'absolute', top: '-5vh', left: '6vw' }}
              onClick={() => onClickGuildSortedList('size')}
            >
              인원순
            </TopBtn>
            <TopBtn
              widthSize="5vw"
              heightSize="5vh"
              paddingSize="0"
              fontSize="2vmin"
              fontColor="white"
              backgroundColor="blue"
              style={{ position: 'absolute', top: '-5vh', left: '11vw' }}
              onClick={() => onClickGuildSortedList('name')}
            >
              가나다순
            </TopBtn>
            {/* <button>길드 검색 (누르면 모달 뜨기)</button> */}
            <FlexTransparentDiv
              widthSize={'28vw'}
              heightSize={'69vh'}
              paddingSize={'0'}
              flexDirection={'column'}
              justifyContent={'start'}
              alignItems={'start'}
              IsBorder={'none'}
              style={{ overflowY: 'scroll', overflowX: 'hidden' }}
            >
              {sortedGuild.map((guild, idx) => {
                return (
                  <GuildBlueArcodian key={`guild-${idx}`}>
                    <div>{guild.guildName}</div>
                    <GuildBlueArcodianItem className="arcodian-item">
                      <div>{guild.guildName}</div>``
                      <div>{guild.memberSize}</div>
                      <div>{guild.description}</div>
                    </GuildBlueArcodianItem>
                  </GuildBlueArcodian>
                );
              })}
            </FlexTransparentDiv>
          </MainBox>
        </FlexTransparentDiv>
      </FlexTransparentDiv>
    </div>
  );
};

export default GuildMain;
