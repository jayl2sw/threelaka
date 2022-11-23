import React, { useEffect, useState } from 'react';
import { TopBtn, MainBtn } from '../../styles/Common/CommonBtnStyle';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import {
  GuildBlueArcodian,
  GuildBlueArcodianItem,
  GuildCreateContainer,
  GuildCreateInput,
  GuildCreateTextArea,
} from '../../styles/Guild/GuildMainStyle';
import { guildActions } from '../../features/guild/guild-slice';
import {
  BackBlurBox,
  MainBox,
  GradientCircleDiv,
  FlexTransparentDiv,
  ToastContainer,
} from '../../styles/Common/CommonDivStyle';
import { ToastMessage } from '../../utils/ToastMessage';
import { useNavigate } from 'react-router-dom';
import { FaCrown } from 'react-icons/fa';
import { FcIdea } from 'react-icons/fc';
import { BiImageAdd } from 'react-icons/bi';

const GuildMain = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // useSelector
  const topThreeGuild = useAppSelector(
    (state) => state.guild.topThreeGuildList
  );
  const sortedGuild = useAppSelector((state) => state.guild.guildSortedList);
  const myGuildInfo = useAppSelector((state) => state.guild.myGuildInfo);
  const guildId = useAppSelector((state) => state.auth.currentUser?.guildId);
  const isCreateSuccess = useAppSelector(
    (state) => state.guild.isCreateSuccess
  );
  const myRequestLst = useAppSelector((state) => state.guild.MyRequestLst);
  const isRequestSuccess = useAppSelector(
    (state) => state.guild.isRequestSuccess
  );
  // useState
  const [guildCreateToggle, setGuildCreateToggle] = useState<boolean>(false);
  const [guildCreateName, setGuildCreateName] = useState<string>('');
  const [guildCreateDescription, setGuildCreateDescription] =
    useState<string>('');
  const [pickedSortStandard, setPickedSortStandard] =
    useState<string>('activity');
  const [myRequestNames, setMyRequestNames] = useState<string[]>([]);
  const [files, setFiles] = useState<any>('');
  // useEffect
  useEffect(() => {
    dispatch(guildActions.getTopThreeGuildStart());
    dispatch(guildActions.getSortedGuildStart('activity'));
    dispatch(guildActions.getSearchGuildStart());
    dispatch(guildActions.getMyRequestStart());
  }, []);
  useEffect(() => {
    const temp = myRequestLst.map((item, idx) => {
      return item.guildName;
    });
    setMyRequestNames(temp);
  }, [myRequestLst]);
  // 요청보낸 길드 목록 name

  // 길드 생성 alert
  useEffect(() => {
    if (isCreateSuccess !== null) {
      let timer = setTimeout(() => {
        // setDownloadToast(false);
        dispatch(guildActions.resetIsCreateSuccess());
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [dispatch, isCreateSuccess]);
  // onClickHandler
  const onClickGuildSortedList = (basis: string) => {
    dispatch(guildActions.getSortedGuildStart(basis));
  };
  const onClickMoveMyGuildPage = () => {
    navigate(`/auth/guild/myGuild/${guildId}`);
  };
  const onClickpostGuildRequest = (guildId: number) => {
    dispatch(guildActions.postGuildRequestStart(guildId));
  };
  // guild create form value update
  const onChangeGuildCreateValue = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputType = e.target.id;
    if (inputType === 'createName') {
      setGuildCreateName(e.target.value);
    } else {
      setGuildCreateDescription(e.target.value);
    }
  };
  // guild Create dispatch + profile img
  const createGuild = () => {
    console.log(files);
    const formdata = new FormData();
    formdata.append('file', files[0]);

    const value = {
      description: guildCreateDescription,
      name: guildCreateName,
    };

    const blob = new Blob([JSON.stringify(value)], {
      type: 'application/json',
    });

    formdata.append('data', blob);
    for (let value of formdata.values() as any) {
      console.log(value);
    }
    dispatch(guildActions.createGuildStart(formdata));
  };
  // profile img upload 관련
  const onLoadFile = (e: any) => {
    const file = e.target.files;
    console.log(file);
    setFiles(file);
  };

  return (
    <>
      {isCreateSuccess && (
        <ToastContainer
          widthSize={'20vw'}
          heightSize={'20vh'}
          paddingSize={'2vh 1vw'}
          fontColor={'black'}
          top={'40vh'}
          left={'40vw'}
        >
          <ToastMessage text={'길드가 생성됐어요'}></ToastMessage>
        </ToastContainer>
      )}
      {isCreateSuccess === false && (
        <ToastContainer
          widthSize={'20vw'}
          heightSize={'20vh'}
          paddingSize={'2vh 1vw'}
          fontColor={'black'}
          top={'40vh'}
          left={'40vw'}
        >
          <ToastMessage text={'길드 생성에 실패했어요'}></ToastMessage>
        </ToastContainer>
      )}
      {isRequestSuccess && (
        <ToastContainer
          widthSize={'30vw'}
          heightSize={'20vh'}
          paddingSize={'2vh 1vw'}
          fontColor={'black'}
          top={'40vh'}
          left={'40vw'}
        >
          <ToastMessage text={'가입 신청 성공!'}></ToastMessage>
        </ToastContainer>
      )}
      {isRequestSuccess === false && (
        <ToastContainer
          widthSize={'30vw'}
          heightSize={'20vh'}
          paddingSize={'2vh 1vw'}
          fontColor={'black'}
          top={'40vh'}
          left={'40vw'}
        >
          <ToastMessage text={'가입 신청에 실패했어요'}></ToastMessage>
        </ToastContainer>
      )}
      <div>
        <FlexTransparentDiv
          widthSize={'32vw'}
          heightSize={'5vh'}
          paddingSize={'0'}
          flexDirection={'row'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'none'}
        >
          <div
            style={{
              fontSize: '2.5vmin',
              backgroundColor: '#4f9fff',
              color: '#ffffff',
              borderRadius: '2vmin',
              padding: '0.8vh 1vw',
              marginTop: '2vh',
              fontFamily: 'PretendardRegular',
            }}
          >
            이번 주 우수 길드
          </div>
        </FlexTransparentDiv>
        <FlexTransparentDiv
          widthSize={'65vw'}
          heightSize={'75vh'}
          paddingSize={'0'}
          flexDirection={'row'}
          justifyContent={'start'}
          alignItems={'start'}
          IsBorder={'none'}
        >
          <FlexTransparentDiv
            widthSize={'35vw'}
            heightSize={'75vh'}
            paddingSize={'0'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            IsBorder={'none'}
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
                background: 'transparent',
                boxShadow: 'none',
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
                    backgroundUrl={topThreeGuild[0] && topThreeGuild[0].profile}
                    style={{ position: 'relative', marginRight: '2vw' }}
                  >
                    <FaCrown
                      style={{
                        color: '#ffb94c',
                        position: 'absolute',
                        width: '9vmin',
                        height: '9vmin',
                        top: '-9.5vmin',
                        left: '50%',
                        transform: 'translateX(-50%)',
                      }}
                    />
                    <div
                      style={{
                        height: '5vmin',
                        fontSize: '2vmin',
                        position: 'absolute',
                        top: '19vmin',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '100%',
                        wordBreak: 'keep-all',
                      }}
                    >
                      {topThreeGuild[0] &&
                        topThreeGuild[0].guildname.substring(6, 0)}
                    </div>
                  </GradientCircleDiv>
                  <GradientCircleDiv
                    widthSize={'15vmin'}
                    heightSize={'15vmin'}
                    paddingSize={'0'}
                    fontColor={'black'}
                    fontSize={'1vmin'}
                    backgroundUrl={topThreeGuild[1] && topThreeGuild[1].profile}
                    style={{ position: 'relative', marginRight: '2vw' }}
                  >
                    <FaCrown
                      style={{
                        color: '#bcbcbc',
                        position: 'absolute',
                        width: '7vmin',
                        height: '7vmin',
                        top: '-7.5vmin',
                        left: '50%',
                        transform: 'translateX(-50%)',
                      }}
                    />
                    <div
                      style={{
                        height: '5vmin',
                        fontSize: '2vmin',
                        position: 'absolute',
                        top: '14vmin',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '100%',
                        wordBreak: 'keep-all',
                      }}
                    >
                      {topThreeGuild[1] &&
                        topThreeGuild[1].guildname.substring(6, 0)}
                    </div>
                  </GradientCircleDiv>
                  <GradientCircleDiv
                    widthSize={'10vmin'}
                    heightSize={'10vmin'}
                    paddingSize={'0'}
                    fontColor={'black'}
                    fontSize={'2vmin'}
                    backgroundUrl={topThreeGuild[2] && topThreeGuild[2].profile}
                    style={{ position: 'relative', marginRight: '0vw' }}
                  >
                    <FaCrown
                      style={{
                        color: '#cc7c00',
                        position: 'absolute',
                        width: '5vmin',
                        height: '5vmin',
                        top: '-5.5vmin',
                        left: '50%',
                        transform: 'translateX(-50%)',
                      }}
                    />
                    <div
                      style={{
                        height: '5vmin',
                        fontSize: '2vmin',
                        position: 'absolute',
                        top: '9vmin',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontWeight: 'bold',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '100%',
                        wordBreak: 'keep-all',
                      }}
                    >
                      {topThreeGuild[2] &&
                        topThreeGuild[2].guildname.substring(6, 0)}
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
                justifyContent: 'start',
                boxShadow: 'none',
              }}
            >
              {guildId === null ? (
                guildCreateToggle ? (
                  <GuildCreateContainer className="guildCreate">
                    <FlexTransparentDiv
                      widthSize={'30vw'}
                      heightSize={'10vh'}
                      paddingSize={'0'}
                      flexDirection={'row'}
                      justifyContent={'start'}
                      alignItems={'start'}
                      IsBorder={'none'}
                      style={{ position: 'relative' }}
                    >
                      <form className="upload_input">
                        <label
                          htmlFor="input-file"
                          style={{
                            position: 'absolute',
                            cursor: 'pointer',
                            top: '-0.5vh',
                            left: '4vw',
                            backgroundColor: 'skyblue',
                            borderRadius: '10px',
                          }}
                        >
                          <BiImageAdd size={30}></BiImageAdd>
                        </label>
                        <input
                          type="file"
                          id="input-file"
                          accept="img/*"
                          onChange={onLoadFile}
                          style={{ display: 'none' }}
                        />
                      </form>

                      <img
                        src="https://threelaka.s3.ap-northeast-2.amazonaws.com/white.png"
                        alt="blue bear logo"
                        style={{
                          width: '10vmin',
                          // transform: 'translateX(10%)',
                          // border: '1px solid black',
                          marginRight: '1vw',
                        }}
                      />
                      <FlexTransparentDiv
                        widthSize={'10vw'}
                        heightSize={'10vh'}
                        paddingSize={'0'}
                        flexDirection={'column'}
                        justifyContent={'start'}
                        alignItems={'start'}
                        IsBorder={'none'}
                        style={{ marginLeft: '3vh' }}
                      >
                        <div
                          style={{
                            height: '4vh',
                            fontSize: '2vmin',
                            color: '#4a9fff',
                            fontWeight: 'bold',
                          }}
                        >
                          길드이름(6자 이하)
                        </div>
                        <GuildCreateInput
                          value={guildCreateName}
                          onChange={(e) => onChangeGuildCreateValue(e)}
                          id="createName"
                          maxLength={6}
                        ></GuildCreateInput>
                      </FlexTransparentDiv>
                    </FlexTransparentDiv>

                    <FlexTransparentDiv
                      widthSize={'30vw'}
                      heightSize={'20vh'}
                      paddingSize={'0'}
                      flexDirection={'column'}
                      justifyContent={'start'}
                      alignItems={'start'}
                      IsBorder={'none'}
                    >
                      <div
                        style={{
                          height: '3vh',
                          fontSize: '2vmin',
                          color: '#4a9fff',
                          fontWeight: 'bold',
                          marginTop: '1vh',
                          marginBottom: '1vh',
                        }}
                      >
                        길드설명
                      </div>
                      <GuildCreateTextArea
                        value={guildCreateDescription}
                        onChange={(e) => onChangeGuildCreateValue(e)}
                        id="createDescription"
                        maxLength={100}
                      ></GuildCreateTextArea>
                    </FlexTransparentDiv>

                    <FlexTransparentDiv
                      widthSize={'30vw'}
                      heightSize={'5vh'}
                      paddingSize={'0'}
                      flexDirection={'row'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      IsBorder={'none'}
                      style={{ marginTop: '1.5vh' }}
                    >
                      <MainBtn
                        widthSize={'10vw'}
                        heightSize={'5vh'}
                        paddingSize={'0'}
                        fontSize={'2vmin'}
                        fontColor={'white'}
                        backgroundColor={'black'}
                        onClick={() => createGuild()}
                      >
                        길드 생성하기
                      </MainBtn>
                      <MainBtn
                        widthSize={'10vw'}
                        heightSize={'5vh'}
                        paddingSize={'0'}
                        fontSize={'2vmin'}
                        fontColor={'white'}
                        backgroundColor={'black'}
                        onClick={() => {
                          setGuildCreateToggle(false);
                          setGuildCreateDescription('');
                          setGuildCreateName('');
                        }}
                        style={{ marginLeft: '2vw' }}
                      >
                        돌아가기
                      </MainBtn>
                    </FlexTransparentDiv>
                  </GuildCreateContainer>
                ) : (
                  <GuildCreateContainer className="notGuild">
                    <img
                      src="https://threelaka.s3.ap-northeast-2.amazonaws.com/blue.png"
                      alt="blue bear logo"
                      style={{
                        width: '15vmin',
                        margin: '0 50%',
                        transform: 'translateX(-50%)',
                      }}
                    />
                    <p
                      style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        height: '5vh',
                        margin: 0,
                        fontSize: '3vmin',
                      }}
                    >
                      간단하게 길드에 가입해보세요(^人^)
                    </p>

                    <p
                      style={{
                        fontSize: '2vmin',
                        margin: 0,
                        height: '13vh',
                      }}
                    >
                      <FcIdea /> 길드란?
                      <br />
                      같은 목표를 가진 사람들과{' '}
                      <span style={{ fontWeight: 'bold' }}>함께</span> 영어
                      공부를 할 수 있는 기능입니다.
                      <br />
                      다양한 사람들과 화상미팅을 통해 에세이와 스피킹을 공유하며{' '}
                      <span style={{ fontWeight: 'bold' }}>성장</span>해보세요!
                    </p>
                    <MainBtn
                      widthSize={'10vw'}
                      heightSize={'5vh'}
                      paddingSize={'0'}
                      fontSize={'2vmin'}
                      fontColor={'white'}
                      backgroundColor={'black'}
                      onClick={() => setGuildCreateToggle(true)}
                      style={{ marginLeft: '9vw' }}
                    >
                      길드 생성하기
                    </MainBtn>
                  </GuildCreateContainer>
                )
              ) : (
                <>
                  <FlexTransparentDiv
                    widthSize={'32vw'}
                    heightSize={'20vh'}
                    paddingSize={'0'}
                    flexDirection={'row'}
                    justifyContent={'start'}
                    alignItems={'center'}
                    IsBorder={'none'}
                  >
                    <FlexTransparentDiv
                      widthSize={'10vw'}
                      heightSize={'15vh'}
                      paddingSize={'0'}
                      flexDirection={'row'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      IsBorder={'none'}
                    >
                      <GradientCircleDiv
                        widthSize={'15vmin'}
                        heightSize={'15vmin'}
                        paddingSize={'0'}
                        fontColor={'black'}
                        fontSize={'2vmin'}
                        backgroundUrl={myGuildInfo && myGuildInfo.profile}
                        style={{ position: 'relative', marginRight: '1vw' }}
                      ></GradientCircleDiv>
                    </FlexTransparentDiv>
                    <FlexTransparentDiv
                      widthSize={'22vw'}
                      heightSize={'20vh'}
                      paddingSize={'0'}
                      flexDirection={'column'}
                      justifyContent={'start'}
                      alignItems={'center'}
                      IsBorder={'none'}
                    >
                      <FlexTransparentDiv
                        widthSize={'22vw'}
                        heightSize={'7vh'}
                        paddingSize={'0'}
                        flexDirection={'row'}
                        justifyContent={'start'}
                        alignItems={'center'}
                        IsBorder={'none'}
                      >
                        <FlexTransparentDiv
                          widthSize={'14vw'}
                          heightSize={'7vh'}
                          paddingSize={'0'}
                          flexDirection={'row'}
                          justifyContent={'start'}
                          alignItems={'center'}
                          IsBorder={'none'}
                          style={{ fontFamily: 'pretendardBold' }}
                        >
                          {myGuildInfo.guildName}
                        </FlexTransparentDiv>
                        <FlexTransparentDiv
                          widthSize={'8vw'}
                          heightSize={'7vh'}
                          paddingSize={'0'}
                          flexDirection={'row'}
                          justifyContent={'center'}
                          alignItems={'center'}
                          IsBorder={'none'}
                        >
                          <MainBtn
                            widthSize={'7vw'}
                            heightSize={'5vh'}
                            paddingSize={'0.25vw'}
                            fontSize={'2vmin'}
                            fontColor={'white'}
                            backgroundColor={'black'}
                            style={{
                              borderRadius: '5px',
                              marginRight: '3vmin',
                            }}
                            onClick={onClickMoveMyGuildPage}
                          >
                            내 길드가기
                          </MainBtn>
                        </FlexTransparentDiv>
                      </FlexTransparentDiv>
                      <FlexTransparentDiv
                        widthSize={'22vw'}
                        heightSize={'13vh'}
                        paddingSize={'0'}
                        flexDirection={'column'}
                        justifyContent={'start'}
                        alignItems={'center'}
                        IsBorder={'none'}
                      >
                        <FlexTransparentDiv
                          widthSize={'22vw'}
                          heightSize={'6vh'}
                          paddingSize={'0'}
                          flexDirection={'row'}
                          justifyContent={'start'}
                          alignItems={'center'}
                          IsBorder={'none'}
                          style={{ marginBottom: '1vh' }}
                        >
                          <BackBlurBox
                            widthSize={'4vw'}
                            heightSize={'4vh'}
                            paddingSize={'0'}
                            fontSize={'2vmin'}
                            fontColor={'white'}
                            style={{
                              backgroundColor: '#5CA9FF',
                              borderRadius: '5px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginRight: '1vw',
                            }}
                          >
                            마스터
                          </BackBlurBox>
                          <span style={{ fontSize: '2.5vmin' }}>
                            {myGuildInfo.masterNickname}
                          </span>
                        </FlexTransparentDiv>
                        <FlexTransparentDiv
                          widthSize={'22vw'}
                          heightSize={'6vh'}
                          paddingSize={'0'}
                          flexDirection={'row'}
                          justifyContent={'start'}
                          alignItems={'center'}
                          IsBorder={'none'}
                        >
                          <BackBlurBox
                            widthSize={'4.1vw'}
                            heightSize={'4vh'}
                            paddingSize={'0'}
                            fontSize={'2vmin'}
                            fontColor={'white'}
                            style={{
                              backgroundColor: '#5CA9FF',
                              borderRadius: '5px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginRight: '1vw',
                            }}
                          >
                            소개
                          </BackBlurBox>
                          <span
                            style={{
                              fontSize: '2.5vmin',
                            }}
                          >
                            {myGuildInfo.description}
                          </span>
                        </FlexTransparentDiv>
                      </FlexTransparentDiv>
                    </FlexTransparentDiv>
                  </FlexTransparentDiv>
                  <FlexTransparentDiv
                    widthSize={'32vw'}
                    heightSize={'20vh'}
                    paddingSize={'0'}
                    flexDirection={'column'}
                    justifyContent={'start'}
                    alignItems={'start'}
                    IsBorder={'none'}
                  >
                    <FlexTransparentDiv
                      widthSize={'32vw'}
                      heightSize={'17vh'}
                      paddingSize={'1vh 1vw'}
                      flexDirection={'column'}
                      justifyContent={'start'}
                      alignItems={'start'}
                      IsBorder={'none'}
                    >
                      <FlexTransparentDiv
                        widthSize={'14vw'}
                        heightSize={'7vh'}
                        paddingSize={'0'}
                        flexDirection={'row'}
                        justifyContent={'start'}
                        alignItems={'center'}
                        IsBorder={'none'}
                        style={{
                          fontFamily: 'pretendardBold',
                          fontSize: '1rem',
                          marginLeft: '1vw',
                          marginBottom: '-1vh',
                        }}
                      >
                        공지사항
                      </FlexTransparentDiv>

                      {myGuildInfo.notice !== null ? (
                        <FlexTransparentDiv
                          widthSize={'30vw'}
                          heightSize={'12vh'}
                          paddingSize={'1vh 1vw'}
                          flexDirection={'column'}
                          justifyContent={'start'}
                          alignItems={'start'}
                          IsBorder={'none'}
                          style={
                            myGuildInfo.notice.length > 50
                              ? {
                                  fontSize: '2vmin',
                                  backgroundColor: '#dbecff',
                                  borderRadius: '10px',
                                }
                              : {
                                  fontSize: '3vmin',
                                  backgroundColor: '#dbecff',
                                }
                          }
                        >
                          <span
                            style={
                              myGuildInfo.notice.length > 50
                                ? { fontSize: '2vmin' }
                                : { fontSize: '3vmin' }
                            }
                          >
                            {myGuildInfo.notice}
                          </span>
                        </FlexTransparentDiv>
                      ) : (
                        ''
                      )}
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
            IsBorder={'none'}
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
                boxShadow: 'none',
                // overflowY: 'scroll',
                // overflowX: 'hidden',
              }}
            >
              <TopBtn
                widthSize="5vw"
                heightSize="5vh"
                paddingSize="0"
                fontSize="2.3vmin"
                fontColor="white"
                backgroundColor="blue"
                style={{
                  position: 'absolute',
                  top: '-5vh',
                  left: '1vw',
                  marginRight: '1vw',
                  opacity: pickedSortStandard === 'activity' ? '' : '0.5',
                  fontFamily: 'PretendardRegular',
                }}
                onClick={() => {
                  onClickGuildSortedList('activity');
                  setPickedSortStandard('activity');
                }}
              >
                활동순
              </TopBtn>
              <TopBtn
                widthSize="5vw"
                heightSize="5vh"
                paddingSize="0"
                fontSize="2.3vmin"
                fontColor="white"
                backgroundColor="blue"
                style={{
                  position: 'absolute',
                  top: '-5vh',
                  left: '6.25vw',
                  marginRight: '1vw',
                  opacity: pickedSortStandard === 'size' ? '' : '0.5',
                  fontFamily: 'PretendardRegular',
                }}
                onClick={() => {
                  onClickGuildSortedList('size');
                  setPickedSortStandard('size');
                }}
              >
                인원순
              </TopBtn>
              <TopBtn
                widthSize="5vw"
                heightSize="5vh"
                paddingSize="0"
                fontSize="2.3vmin"
                fontColor="white"
                backgroundColor="blue"
                style={{
                  position: 'absolute',
                  top: '-5vh',
                  left: '11.5vw',
                  opacity: pickedSortStandard === 'name' ? '' : '0.5',
                  fontFamily: 'PretendardRegular',
                }}
                onClick={() => {
                  onClickGuildSortedList('name');
                  setPickedSortStandard('name');
                }}
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
                style={{
                  overflowY: 'auto',
                  overflowX: 'hidden',
                }}
              >
                {sortedGuild.map((guild, idx) => {
                  return (
                    <GuildBlueArcodian
                      key={`guild-${idx}`}
                      style={{
                        position: 'relative',
                        boxShadow: 'none',
                      }}
                    >
                      {guildId !== null ? (
                        ''
                      ) : myRequestNames.includes(guild.guildName) ? (
                        <div
                          style={{
                            position: 'absolute',
                            right: '1vw',
                            width: '6vw',
                            height: '5vh',
                            fontSize: '2vmin',
                            color: 'white',
                            backgroundColor: 'black',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: '2vmin',
                          }}
                        >
                          가입신청중
                        </div>
                      ) : (
                        <MainBtn
                          widthSize={'6vw'}
                          heightSize={'5vh'}
                          paddingSize={'0'}
                          fontSize={'2vmin'}
                          fontColor={'white'}
                          backgroundColor={'blue'}
                          style={{ position: 'absolute', right: '1vw' }}
                          onClick={() => {
                            onClickpostGuildRequest(guild.guildId);
                          }}
                        >
                          가입신청
                        </MainBtn>
                      )}

                      <FlexTransparentDiv
                        widthSize={'24vw'}
                        heightSize={'5vh'}
                        paddingSize={'0'}
                        flexDirection={'row'}
                        justifyContent={'start'}
                        alignItems={'center'}
                        IsBorder={'none'}
                      >
                        <GradientCircleDiv
                          widthSize={'5vmin'}
                          heightSize={'5vmin'}
                          paddingSize={'0'}
                          fontColor={'black'}
                          fontSize={'2vmin'}
                          backgroundUrl={guild.profile}
                          style={{
                            margin: '0 1vw 0 0',
                            border: 'white',
                          }}
                        ></GradientCircleDiv>
                        {guild.guildName}
                      </FlexTransparentDiv>
                      <GuildBlueArcodianItem className="arcodian-item">
                        <FlexTransparentDiv
                          widthSize={'22vw'}
                          heightSize={'4vh'}
                          paddingSize={'0'}
                          flexDirection={'row'}
                          justifyContent={'start'}
                          alignItems={'center'}
                          IsBorder={'none'}
                        >
                          <BackBlurBox
                            widthSize={'4vw'}
                            heightSize={'3vh'}
                            paddingSize={'0'}
                            fontSize={'1.5vmin'}
                            fontColor={'white'}
                            style={{
                              backgroundColor: '#5CA9FF',
                              borderRadius: '10px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginRight: '1vw',
                            }}
                          >
                            마스터
                          </BackBlurBox>
                          {guild.masterNickname}
                        </FlexTransparentDiv>
                        <FlexTransparentDiv
                          widthSize={'22vw'}
                          heightSize={'4vh'}
                          paddingSize={'0'}
                          flexDirection={'row'}
                          justifyContent={'start'}
                          alignItems={'center'}
                          IsBorder={'none'}
                        >
                          <BackBlurBox
                            widthSize={'4vw'}
                            heightSize={'3vh'}
                            paddingSize={'0'}
                            fontSize={'1.5vmin'}
                            fontColor={'white'}
                            style={{
                              backgroundColor: '#5CA9FF',
                              borderRadius: '10px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginRight: '1vw',
                              wordBreak: 'keep-all',
                            }}
                          >
                            소개
                          </BackBlurBox>
                          <div
                            style={{
                              width: '16vw',
                              fontSize:
                                guild.description.length > 20
                                  ? '1.5vmin'
                                  : '2vmin',
                            }}
                          >
                            {guild.description}
                          </div>
                        </FlexTransparentDiv>
                        <FlexTransparentDiv
                          widthSize={'22vw'}
                          heightSize={'4vh'}
                          paddingSize={'0'}
                          flexDirection={'row'}
                          justifyContent={'start'}
                          alignItems={'center'}
                          IsBorder={'none'}
                        >
                          <BackBlurBox
                            widthSize={'4vw'}
                            heightSize={'3vh'}
                            paddingSize={'0'}
                            fontSize={'1.5vmin'}
                            fontColor={'white'}
                            style={{
                              backgroundColor: '#5CA9FF',
                              borderRadius: '10px',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginRight: '1vw',
                            }}
                          >
                            정원
                          </BackBlurBox>
                          {`${guild.memberSize}명/20명`}
                        </FlexTransparentDiv>
                      </GuildBlueArcodianItem>
                    </GuildBlueArcodian>
                  );
                })}
              </FlexTransparentDiv>
            </MainBox>
          </FlexTransparentDiv>
        </FlexTransparentDiv>
      </div>
    </>
  );
};

export default GuildMain;
