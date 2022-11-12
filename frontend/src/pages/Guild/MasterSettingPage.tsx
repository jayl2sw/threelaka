import React, { useEffect } from 'react';
import { PassThrough } from 'stream';
import { guildActions } from '../../features/guild/guild-slice';
import {
  MainBox,
  FlexTransparentDiv,
} from '../../styles/Common/CommonDivStyle';
import { GreetingText } from '../../styles/Guild/GuildStyle';
import {
  GuildSettingLeftBox,
  GuildSettingRightBox,
} from '../../styles/Guild/MasterSetting';
import { RightBtn } from '../../styles/Common/CommonBtnStyle';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import useModal from '../../utils/useModal';
import GuildNoticeModal from '../Main/components/GuildNoticeModal';

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

  // 길드 멤버 정보 가져오기
  const guildMemberList = useAppSelector(
    (state) => state.guild.gulidMemberList
  );
  // 모달 사용하기
  const { isOpenModal, onClickModal } = useModal();

  const dispatch = useAppDispatch();
  const guildId = currentUser?.guildId;

  // masterSetting 페이지가 마운트 될 때 길드의 공지 조회
  useEffect(() => {
    if (guildId !== undefined) {
      dispatch(guildActions.getGuildNotice(guildId));
      dispatch(guildActions.getGuildMember(guildId));
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
            <RightBtn
              widthSize={'6vw'}
              heightSize={'5vh'}
              paddingSize={'2'}
              fontSize={'1rem'}
              fontColor={'white'}
              backgroundColor={'blue'}
              style={{ marginTop: '1rem' }}
              onClick={() => {
                onClickModal();
              }}
            >
              생성
            </RightBtn>
            {isOpenModal && (
              <GuildNoticeModal
                isOpenModal={isOpenModal}
                toggle={onClickModal}
                notice={guildNotice.notice}
              ></GuildNoticeModal>
            )}
            <button>수정</button>
            <button>삭제</button>

            {/* <RightBtn
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
            이미지 호버하면 남은 시간과 영상 제목 보이게
            <button>검색</button>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                border: 'solid red 1px',
              }}
            >
              {/* 진행중인 정보들이 옵니다 */}
              {inProgressTask.map((task, idx) => {
                return (
                  <FlexTransparentDiv
                    widthSize={'15vw'}
                    heightSize={'22vh'}
                    paddingSize={'0'}
                    flexDirection={'row'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    IsBorder={'none'}
                    style={{
                      borderTop: '10px solid black',
                      borderBottom: '10px solid black',
                      borderRadius: '10px',
                      background: 'black',
                      margin: '0.5vw',
                    }}
                  >
                    <img
                      style={{
                        width: '14.5vw',
                        height: '21.8vh',
                      }}
                      src={`https://img.youtube.com/vi/${task.videoId}/0.jpg`}
                    ></img>
                    <button>삭제</button>
                  </FlexTransparentDiv>
                );
                // return <p key={`task-${idx}`}>{task.videoId}</p>;
              })}

              {/* 예정된 정보들이 옵니다 */}
              {upcomingTask.map((task, idx) => {
                return (
                  <FlexTransparentDiv
                    widthSize={'15vw'}
                    heightSize={'22vh'}
                    paddingSize={'0'}
                    flexDirection={'row'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    IsBorder={'none'}
                    style={{
                      borderTop: '10px solid black',
                      borderBottom: '10px solid black',
                      borderRadius: '10px',
                      background: 'black',
                      margin: '0.5vw',
                    }}
                  >
                    <img
                      style={{
                        width: '14.5vw',
                        height: '21.8vh',
                      }}
                      src={`https://img.youtube.com/vi/${task.videoId}/0.jpg`}
                    ></img>
                    <button>삭제</button>
                  </FlexTransparentDiv>
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
            <button>길마 넘기기</button>
            {guildMemberList.members.map((member, idx) => {
              if (member.nickname !== currentUser?.nickname) {
                return (
                  <MainBox
                    widthSize={'20vw'}
                    heightSize={'8vh'}
                    paddingSize={'2vw 1vw'}
                    fontColor={'black'}
                    fontSize={'2.5vmin'}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'start',
                      justifyContent: 'center',
                      margin: '0.5vh',
                      background: '#A2D0FC',
                    }}
                  >
                    <div key={idx}>
                      {member.nickname}
                      <div
                        style={{
                          justifyContent: 'center',
                          margin: '0.5vh',
                          background: '#A2D0FC',
                          display: 'inline',
                          fontSize: '1.8vmin',
                          color: 'grey',
                          width: '4vw',
                        }}
                      >
                        {member.lastLearningDay}일 전
                      </div>
                      <button>길마 (길마 넘기기버튼 누르면 보여야 함)</button>
                      <button>강퇴</button>
                    </div>
                  </MainBox>
                );
              }
            })}
          </MainBox>
        </GuildSettingRightBox>
      </div>
    </div>
  );
};

export default MasterSetting;
