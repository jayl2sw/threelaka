import React, { useEffect, useState } from 'react';
import { PassThrough } from 'stream';
import { guildActions } from '../../features/guild/guild-slice';
import {
  MainBox,
  FlexTransparentDiv,
  BackBlurPaleBox,
  BackBlurBox,
} from '../../styles/Common/CommonDivStyle';
import { useParams, useNavigate } from 'react-router-dom';
import { MainBtn } from '../../styles/Common/CommonBtnStyle';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import useModal from '../../utils/useModal';
import { TbBellRinging } from 'react-icons/tb';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { GrGroup } from 'react-icons/gr';
import { AiFillCrown } from 'react-icons/ai';
import { ImExit } from 'react-icons/im';
import { ImYoutube } from 'react-icons/im';
import { GuildSettingTextArea } from '../../styles/Guild/MasterSetting';
import { useHorizontalScroll } from '../../utils/useSideScroll';
import GradientInput from '../../utils/GradientInput';
import { GrUserAdd } from 'react-icons/gr';
import AddGuildVideoModal from './components/AddGuildVideoModal';

const MasterSetting = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // selector
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const guildNotice = useAppSelector((state) => state.guild.guildNotice);
  const inProgressTask = useAppSelector(
    (state) => state.guild.progressTaskList
  );
  const upcomingTask = useAppSelector((state) => state.guild.upcomingTaskList);
  const guildMemberList = useAppSelector(
    (state) => state.guild.gulidMemberList
  );
  const guildRequestLst = useAppSelector(
    (state) => state.guild.GuildRequestLst
  );

  // USESTATE
  // 모달 사용하기
  const [noticeToggle, setNoticeToggle] = useState<number>(0);
  // 길드 넘기기 활성화
  const [guildHandOver, setGuildHandOver] = useState<boolean>(false);
  const [acceptRequestMode, setAcceptRequestMode] = useState<boolean>(false);
  const [textareaValue, setTextareaValue] = useState<string>('');
  const [newTextareaValue, setNewTextareaValue] = useState<string>('');
  const [videoSearchToggle, setVideoSearchToggle] = useState<boolean>(false);

  const guildId = currentUser?.guildId;

  // 수평 스크롤
  const scrollRef = useHorizontalScroll(
    []
  ) as React.MutableRefObject<HTMLDivElement>;

  // onClickHandler
  const onClickGuildNoticeDelete = () => {
    console.log('안녕', guildId);
    if (guildId !== undefined) {
      dispatch(guildActions.deleteGuildNoticeStart(guildId));
    }
    setTimeout(() => {
      setNoticeToggle(0);
    }, 500);
  };
  const onClickGuildNoticeCreate = (noticeCotent: string) => {
    if (guildId !== undefined) {
      dispatch(guildActions.createGuildNoticeStart(noticeCotent));
    }
    setTimeout(() => {
      setNoticeToggle(0);
    }, 500);
  };
  const onClickGuildNoticePut = (noticeContent: string) => {
    if (guildId !== undefined) {
      dispatch(guildActions.putGuildNoticeStart(noticeContent));
    }
    setTimeout(() => {
      setNoticeToggle(0);
    }, 500);
  };
  const onClickHandOverPost = (nextGuildMaster: number) => {
    dispatch(guildActions.postGuildHandOverStart(nextGuildMaster));
    setTimeout(() => {
      navigate(`/auth/guild/myGuild`, { replace: false });
    }, 500);
  };
  const onClickDeleteMember = (tagetMemberId: number) => {
    dispatch(guildActions.deleteMemberStart(tagetMemberId));
  };
  const onClickRequestHandler = (requestId: number, typeInfo: string) => {
    console.warn(typeInfo);
    if (typeInfo === 'accept') {
      console.log('들어왔어요');
      dispatch(guildActions.putAcceptGuildRequestStart(requestId));
    } else {
      dispatch(guildActions.deleteRejectGuildRequestStart(requestId));
    }
  };

  const onClickDeleteAssignment = (assignId: number) => {
    dispatch(guildActions.delelteGuildAssignmentStart(assignId));
  };

  // textArea value change
  const handleTextValChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(e.target.value);
  };
  const handleNextTextValChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewTextareaValue(e.target.value);
  };
  // useEffect
  useEffect(() => {
    if (guildId !== undefined) {
      dispatch(guildActions.getGuildNotice(guildId));
      dispatch(guildActions.getGuildMember(guildId));
      dispatch(guildActions.getGuildRequestStart());
    }
  }, [guildId]);

  useEffect(() => {
    dispatch(guildActions.getProgressTask());
  }, []);
  return (
    <div>
      {videoSearchToggle ? (
        <AddGuildVideoModal
          modalToggle={videoSearchToggle}
          setModalToggle={setVideoSearchToggle}
        ></AddGuildVideoModal>
      ) : (
        ''
      )}

      <FlexTransparentDiv
        widthSize={'65vw'}
        heightSize={'5vh'}
        paddingSize={'0vh 1vw'}
        flexDirection={'row'}
        justifyContent={'start'}
        alignItems={'center'}
        IsBorder={'none'}
        style={{ fontSize: '2.5vmin' }}
      >
        {currentUser?.nickname} 마스터님, 길드를 관리하세요
      </FlexTransparentDiv>
      <FlexTransparentDiv
        widthSize={'65vw'}
        heightSize={'75vh'}
        paddingSize={'0'}
        flexDirection={'row'}
        justifyContent={'start'}
        alignItems={'center'}
        IsBorder={'none'}
      >
        <FlexTransparentDiv
          widthSize={'35vw'}
          heightSize={'75vh'}
          paddingSize={'1vh 1vw'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'none'}
        >
          <MainBox
            widthSize={'33vw'}
            heightSize={'20vh'}
            paddingSize={'2vh 1vw'}
            fontColor={'black'}
            fontSize={'3vmin'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              justifyContent: 'start',
              marginBottom: '2vh',
              // border: 'solid black 1px',
            }}
          >
            <FlexTransparentDiv
              widthSize={'31vw'}
              heightSize={'5vh'}
              paddingSize={'0'}
              flexDirection={'row'}
              justifyContent={'start'}
              alignItems={'center'}
              IsBorder={'none'}
              style={{ marginBottom: '1vh' }}
            >
              <FlexTransparentDiv
                widthSize={'15vw'}
                heightSize={'5vh'}
                paddingSize={'0'}
                flexDirection={'row'}
                justifyContent={'start'}
                alignItems={'center'}
                IsBorder={'none'}
              >
                <TbBellRinging size={30}></TbBellRinging>
                &nbsp;NOTICE
              </FlexTransparentDiv>
              <FlexTransparentDiv
                widthSize={'16.5vw'}
                heightSize={'5vh'}
                paddingSize={'0'}
                flexDirection={'row'}
                justifyContent={'end'}
                alignItems={'center'}
                IsBorder={'none'}
              >
                <MainBtn
                  widthSize={'5vw'}
                  heightSize={'4vh'}
                  paddingSize={'0'}
                  fontSize={'2vmin'}
                  fontColor={'white'}
                  backgroundColor={'black'}
                  style={{ marginRight: '0.5vw' }}
                  onClick={() => {
                    setNoticeToggle(1);
                  }}
                >
                  삭제
                </MainBtn>
                {guildNotice.notice === null ? (
                  ''
                ) : (
                  <MainBtn
                    widthSize={'5vw'}
                    heightSize={'4vh'}
                    paddingSize={'0'}
                    fontSize={'2vmin'}
                    fontColor={'white'}
                    backgroundColor={'black'}
                    onClick={() => {
                      setNoticeToggle(2);
                    }}
                    style={{ marginRight: '0.5vw' }}
                  >
                    수정
                  </MainBtn>
                )}
                <MainBtn
                  widthSize={'5vw'}
                  heightSize={'4vh'}
                  paddingSize={'0'}
                  fontSize={'2vmin'}
                  fontColor={'white'}
                  backgroundColor={'black'}
                  onClick={() => {
                    setNoticeToggle(3);
                  }}
                  style={{ marginRight: '0.5vw' }}
                >
                  생성
                </MainBtn>
              </FlexTransparentDiv>
            </FlexTransparentDiv>

            <FlexTransparentDiv
              widthSize={'31vw'}
              heightSize={'15vh'}
              paddingSize={'0.5vh 0.5vw'}
              flexDirection={'row'}
              justifyContent={'start'}
              alignItems={'start'}
              IsBorder={'none'}
              style={
                guildNotice.notice === null
                  ? { fontSize: '3vmin', position: 'relative' }
                  : guildNotice.notice.length > 50
                  ? { fontSize: '2vmin', position: 'relative' }
                  : { fontSize: '3vmin', position: 'relative' }
              }
            >
              {guildNotice.notice}
              <BackBlurBox
                widthSize={'30vw'}
                heightSize={'11vh'}
                paddingSize={'0.5vh 0.5vw'}
                fontSize={'2vmin'}
                fontColor={'white'}
                style={
                  noticeToggle !== 0
                    ? {
                        position: 'absolute',
                        backgroundColor: '#4a9fff',
                        visibility: 'visible',
                        opacity: '1',
                        transition: 'all 1s ease',
                        top: '0',
                      }
                    : {
                        position: 'absolute',
                        backgroundColor: '#4a9fff',
                        visibility: 'hidden',
                        opacity: '0',
                        transition: 'all 1s ease',
                        top: '0',
                      }
                }
              >
                <FlexTransparentDiv
                  widthSize={'29vw'}
                  heightSize={'11vh'}
                  paddingSize={'0'}
                  flexDirection={'column'}
                  justifyContent={'center'}
                  alignItems={'center'}
                  IsBorder={'none'}
                  style={{ position: 'relative' }}
                >
                  {noticeToggle === 1 ? (
                    <>
                      <div>삭제하시겠습니까?</div>
                      <FlexTransparentDiv
                        widthSize={'29vw'}
                        heightSize={'5vh'}
                        paddingSize={'0'}
                        flexDirection={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        IsBorder={'none'}
                      >
                        <MainBtn
                          widthSize={'5vw'}
                          heightSize={'3vh'}
                          paddingSize={'0'}
                          fontSize={'2vmin'}
                          fontColor={'black'}
                          backgroundColor={'gradient'}
                          style={{ marginRight: '1vw' }}
                          onClick={() => {
                            onClickGuildNoticeDelete();
                          }}
                        >
                          네
                        </MainBtn>
                        <MainBtn
                          widthSize={'5vw'}
                          heightSize={'3vh'}
                          paddingSize={'0'}
                          fontSize={'2vmin'}
                          fontColor={'white'}
                          backgroundColor={'black'}
                        >
                          아니요
                        </MainBtn>
                      </FlexTransparentDiv>
                    </>
                  ) : noticeToggle === 2 ? (
                    <>
                      <GuildSettingTextArea
                        maxLength={100}
                        onChange={handleNextTextValChange}
                      >
                        {guildNotice.notice}
                      </GuildSettingTextArea>
                      <FlexTransparentDiv
                        widthSize={'29vw'}
                        heightSize={'5vh'}
                        paddingSize={'0'}
                        flexDirection={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        IsBorder={'none'}
                      >
                        <MainBtn
                          widthSize={'5vw'}
                          heightSize={'3vh'}
                          paddingSize={'0'}
                          fontSize={'2vmin'}
                          fontColor={'black'}
                          backgroundColor={'gradient'}
                          style={{ marginRight: '1vw' }}
                          onClick={() => {
                            onClickGuildNoticePut(newTextareaValue);
                          }}
                        >
                          수정
                        </MainBtn>
                        <MainBtn
                          widthSize={'5vw'}
                          heightSize={'3vh'}
                          paddingSize={'0'}
                          fontSize={'2vmin'}
                          fontColor={'white'}
                          backgroundColor={'black'}
                        >
                          취소
                        </MainBtn>
                      </FlexTransparentDiv>
                    </>
                  ) : noticeToggle === 3 ? (
                    <>
                      <GuildSettingTextArea
                        maxLength={100}
                        onChange={handleTextValChange}
                      ></GuildSettingTextArea>
                      <FlexTransparentDiv
                        widthSize={'29vw'}
                        heightSize={'5vh'}
                        paddingSize={'0'}
                        flexDirection={'row'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        IsBorder={'none'}
                      >
                        <MainBtn
                          widthSize={'5vw'}
                          heightSize={'3vh'}
                          paddingSize={'0'}
                          fontSize={'2vmin'}
                          fontColor={'black'}
                          backgroundColor={'gradient'}
                          style={{ marginRight: '1vw' }}
                          onClick={() => {
                            onClickGuildNoticeCreate(textareaValue);
                          }}
                        >
                          생성
                        </MainBtn>
                        <MainBtn
                          widthSize={'5vw'}
                          heightSize={'3vh'}
                          paddingSize={'0'}
                          fontSize={'2vmin'}
                          fontColor={'white'}
                          backgroundColor={'black'}
                        >
                          취소
                        </MainBtn>
                      </FlexTransparentDiv>
                    </>
                  ) : (
                    ''
                  )}
                  <div
                    style={{
                      width: '3vmin',
                      position: 'absolute',
                      height: '3vmin',
                      top: '-0vw',
                      right: '0vw',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      setNoticeToggle(0);
                    }}
                  >
                    <AiOutlineCloseCircle size={30} />
                  </div>
                </FlexTransparentDiv>
              </BackBlurBox>
            </FlexTransparentDiv>
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
            <FlexTransparentDiv
              widthSize={'32vw'}
              heightSize={'5vh'}
              paddingSize={'0 1vw'}
              flexDirection={'row'}
              justifyContent={'center'}
              alignItems={'center'}
              IsBorder={'none'}
            >
              <div style={{ width: '2vw' }}>
                <ImYoutube size={30}></ImYoutube>
              </div>
              <div style={{ width: '5vw', marginRight: '2vw' }}>
                &nbsp;VIDEOS
              </div>
              {/* 이미지 호버하면 남은 시간과 영상 제목 보이게 */}
              <div style={{ width: '25vw' }}>
                <MainBtn
                  widthSize={'6vw'}
                  heightSize={'5vh'}
                  paddingSize={'0'}
                  fontSize={'2vmin'}
                  fontColor={'white'}
                  backgroundColor={'gradient'}
                  style={{ borderRadius: '10px', marginLeft: '15vw' }}
                  onClick={() => setVideoSearchToggle(true)}
                >
                  학습추가하기
                </MainBtn>
                {/* <GradientInput
                  widthSize={18}
                  onClickHandler={() => 'hi'}
                  placeHolderText="youtube url"
                  inputName="youtube-url"
                  inputValue={inputValue}
                  setInputValue={setInputValue}
                ></GradientInput> */}
              </div>
            </FlexTransparentDiv>

            <div
              style={{
                width: '32vw',
                height: '50vh',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'start',
                // border: 'solid red 1px',
                overflow: 'auto',
              }}
              ref={scrollRef}
            >
              {/* 진행중인 정보들이 옵니다 */}
              {inProgressTask.map((task, idx) => {
                return (
                  <FlexTransparentDiv
                    key={`video-progree-${idx}`}
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
                      position: 'relative',
                    }}
                  >
                    <img
                      style={{
                        width: '15vw',
                        height: '20vh',
                        objectFit: 'cover',
                      }}
                      src={`https://img.youtube.com/vi/${task.videoId}/0.jpg`}
                    ></img>
                    <div
                      style={{
                        position: 'absolute',
                        top: '0',
                        right: '1vw',
                        cursor: 'pointer',
                      }}
                      onClick={() => onClickDeleteAssignment(task.assignmentId)}
                      // onClick={{() => onClickDeleteAssignment({task.assignmentId})}}
                    >
                      <AiOutlineCloseCircle size={30} color={'white'} />
                    </div>
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

              {/* 예정된 정보들이 옵니다 */}
              {upcomingTask.map((task, idx) => {
                return (
                  <FlexTransparentDiv
                    key={`video-upcoming-${idx}`}
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
                      position: 'relative',
                    }}
                  >
                    <img
                      style={{
                        width: '15vw',
                        height: '20vh',
                        objectFit: 'cover',
                      }}
                      src={`https://img.youtube.com/vi/${task.videoId}/0.jpg`}
                    ></img>
                    <div
                      style={{ position: 'absolute', top: '0', right: '1vw' }}
                    >
                      <AiOutlineCloseCircle size={30} color={'white'} />
                    </div>
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
        <FlexTransparentDiv
          widthSize={'30vw'}
          heightSize={'75vh'}
          paddingSize={'0'}
          flexDirection={'row'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'none'}
          // style={{ border: '3px solid pink' }}
        >
          <MainBox
            widthSize={'30vw'}
            heightSize={'72vh'}
            paddingSize={'2vh 1vw'}
            fontColor={'black'}
            fontSize={'3vmin'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              justifyContent: 'start',
            }}
          >
            <FlexTransparentDiv
              widthSize={'26.5vw'}
              heightSize={'5vh'}
              paddingSize={'0'}
              flexDirection={'row'}
              justifyContent={'start'}
              alignItems={'center'}
              IsBorder={'none'}
              style={{ marginBottom: '1vh' }}
            >
              <GrGroup size={30}></GrGroup>
              <div style={{ width: '10vw' }}>&nbsp;MEMBERS</div>
              <div style={{ width: '5vw', position: 'relative' }}>
                <div
                  style={{
                    color: 'red',
                    position: 'absolute',
                    top: '-2.5vh',
                    left: '1vw',
                    cursor: 'pointer',
                  }}
                  onClick={() => setAcceptRequestMode(true)}
                >
                  {guildRequestLst.length}
                </div>
                <GrUserAdd size={30}></GrUserAdd>
              </div>
              {guildHandOver ? (
                <MainBtn
                  widthSize={'8vw'}
                  heightSize={'4vh'}
                  paddingSize={'0'}
                  fontSize={'2vmin'}
                  fontColor={'white'}
                  backgroundColor={'black'}
                  style={{ marginLeft: '5vw' }}
                  onClick={() => {
                    setGuildHandOver(false);
                  }}
                >
                  취소
                </MainBtn>
              ) : acceptRequestMode ? (
                <MainBtn
                  widthSize={'8vw'}
                  heightSize={'4vh'}
                  paddingSize={'0'}
                  fontSize={'2vmin'}
                  fontColor={'white'}
                  backgroundColor={'black'}
                  style={{ marginLeft: '5vw' }}
                  onClick={() => {
                    setAcceptRequestMode(false);
                  }}
                >
                  뒤로가기
                </MainBtn>
              ) : (
                <MainBtn
                  widthSize={'8vw'}
                  heightSize={'4vh'}
                  paddingSize={'0'}
                  fontSize={'2vmin'}
                  fontColor={'white'}
                  backgroundColor={'black'}
                  style={{ marginLeft: '5vw' }}
                  onClick={() => {
                    setGuildHandOver(true);
                  }}
                >
                  길드넘기기
                </MainBtn>
              )}
            </FlexTransparentDiv>
            {acceptRequestMode
              ? guildRequestLst.map((request, idx) => {
                  return (
                    <MainBox
                      widthSize={'27vw'}
                      heightSize={'6vh'}
                      paddingSize={'0 1vw'}
                      fontColor={'black'}
                      fontSize={'2.5vmin'}
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'start',
                        marginBottom: '1vh',
                        background: '#A2D0FC',
                      }}
                      key={idx}
                    >
                      <div style={{ minWidth: '8vw', fontSize: '2.5vmin' }}>
                        {request.requstId}의 신청
                      </div>
                      <div
                        style={{
                          minWidth: '7vw',
                        }}
                      ></div>
                      <MainBtn
                        widthSize={'5vw'}
                        heightSize={'4vh'}
                        paddingSize={'0'}
                        fontSize={'2vmin'}
                        fontColor={'white'}
                        backgroundColor={'blue'}
                        style={{ marginRight: '0.5vw' }}
                        onClick={() => {
                          onClickRequestHandler(request.requstId, 'accept');
                        }}
                      >
                        승인
                      </MainBtn>
                      <MainBtn
                        widthSize={'5vw'}
                        heightSize={'4vh'}
                        paddingSize={'0'}
                        fontSize={'2vmin'}
                        fontColor={'white'}
                        backgroundColor={'black'}
                        style={{ marginRight: '0.5vw' }}
                        onClick={() => {
                          onClickRequestHandler(request.requstId, 'reject');
                        }}
                      >
                        거절
                      </MainBtn>
                    </MainBox>
                  );
                })
              : guildMemberList.members.map((member, idx) => {
                  if (member.nickname !== currentUser?.nickname) {
                    return (
                      <MainBox
                        widthSize={'27vw'}
                        heightSize={'6vh'}
                        paddingSize={'0 1vw'}
                        fontColor={'black'}
                        fontSize={'2.5vmin'}
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'start',
                          marginBottom: '1vh',
                          background: '#A2D0FC',
                        }}
                        key={idx}
                      >
                        <div style={{ minWidth: '8vw', fontSize: '2.5vmin' }}>
                          {member.nickname}
                        </div>
                        <div
                          style={{
                            minWidth: '4vw',
                            fontSize: '2vmin',
                            color: '#9897a9',
                          }}
                        >
                          {member.lastLearningDay}일 전
                        </div>
                        <div
                          style={{
                            minWidth: '7vw',
                          }}
                        ></div>
                        {guildHandOver ? (
                          <AiFillCrown
                            size={30}
                            style={{ marginRight: '1vw', cursor: 'pointer' }}
                            onClick={() => onClickHandOverPost(member.userId)}
                          ></AiFillCrown>
                        ) : (
                          ''
                        )}
                        <ImExit
                          style={{ cursor: 'pointer' }}
                          size={25}
                          onClick={() => onClickDeleteMember(member.userId)}
                        ></ImExit>
                      </MainBox>
                    );
                  }
                })}
          </MainBox>
        </FlexTransparentDiv>
      </FlexTransparentDiv>
    </div>
  );
};

export default MasterSetting;
