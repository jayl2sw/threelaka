import React, { useEffect } from 'react';
import { guildActions } from '../../features/guild/guild-slice';
import { MainBox } from '../../styles/Common/CommonDivStyle';
import { GreetingText } from '../../styles/Guild/GuildStyle';
import {
  GuildSettingLeftBox,
  GuildSettingRightBox,
} from '../../styles/Guild/MasterSetting';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
const MasterSetting = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  // 길드의 공지 가져오기
  const guildNotice = useAppSelector((state) => state.guild.guildNotice);
  // 길드의 진행중인 과제 정보 가져오기
  const inProgressTask = useAppSelector(
    (state) => state.guild.progressTaskList
  );
  // 길드의 예정된 과제 장보 가져오기
  const upcomingTask = useAppSelector((state) => state.guild.upcomingTaskList);

  //
  const dispatch = useAppDispatch();
  const guildId = currentUser?.guildId;

  // masterSetting 페이지가 마운트 될 때 길드의 공지 조회
  useEffect(() => {
    if (guildId !== undefined) {
      dispatch(guildActions.getGuildNotice(guildId));
    }
  }, [guildId]);

  useEffect(() => {
    dispatch(guildActions.getProgressTask('0'));
    dispatch(guildActions.getProgressTask('1'));
  }, []);
  return (
    <div>
      {/* {currentUser?.guildId} */}

      <GreetingText>
        {currentUser?.nickname} 마스터님, 길드를 관리하세요{' '}
      </GreetingText>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <GuildSettingLeftBox>
          <MainBox
            widthSize={'32vw'}
            heightSize={'20vh'}
            paddingSize={'2vw 1vw'}
            fontColor={'black'}
            fontSize={'3vmin'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '2vh',
              // border: 'solid black 1px',
            }}
          >
            <div style={{ height: '100%', margin: '0 auto' }}>
              <div> NOTICE</div>
              <div>{guildNotice.notice}</div>
            </div>
            {/* <RightBtn
      widthSize={'6vw'}
        heightSize={'5vh'}
        paddingSize={'2'}
        fontSize={'1rem'}
        fontColor={'white'}
        backgroundColor={'blue'}
        style={{ marginTop: '1rem' }}
        onClick={}> 생성
      </RightBtn>

      <RightBtn
      widthSize={'6vw'}
        heightSize={'5vh'}
        paddingSize={'2'}
        fontSize={'1rem'}
        fontColor={'white'}
        backgroundColor={'blue'}
        style={{ marginTop: '1rem' }}
        onClick={}> 수정
      </RightBtn>

      <RightBtn
      widthSize={'6vw'}
        heightSize={'5vh'}
        paddingSize={'2'}
        fontSize={'1rem'}
        fontColor={'white'}
        backgroundColor={'blue'}
        style={{ marginTop: '1rem' }}
        onClick={}> 삭제
      </RightBtn> */}
          </MainBox>

          <MainBox
            widthSize={'32vw'}
            heightSize={'50vh'}
            paddingSize={'2vw 1vw'}
            fontColor={'black'}
            fontSize={'3vmin'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div> VIDEOS</div>

            <div>
              진행중인, 예정된 영상 정보들이 옵니다
              {inProgressTask.map((task, idx) => {
                return (
                  <img
                    src={`https://img.youtube.com/vi/${task.videoId}/0.jpg`}
                  ></img>
                );
                // return <p key={`task-${idx}`}>{task.videoId}</p>;
              })}
            </div>
          </MainBox>
        </GuildSettingLeftBox>
        <GuildSettingRightBox>
          <MainBox
            widthSize={'22vw'}
            heightSize={'72vh'}
            paddingSize={'2vw 1vw'}
            fontColor={'black'}
            fontSize={'3vmin'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <p> MEMBERS</p>
            <p>멤버들 정보가 옵니다</p>
          </MainBox>
        </GuildSettingRightBox>
      </div>
    </div>
  );
};

export default MasterSetting;
