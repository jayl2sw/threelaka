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
import { GuildProgressbar } from '../../styles/Guild/MyGuildStyle';

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
  const [filesMiri, setFilesMiri] = useState<any>('');
  const [progressAnime, setProgressAnime] = useState<boolean>(false);
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
  // ???????????? ?????? ?????? name

  // ?????? ?????? alert
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
  // ?????????????????? transition
  useEffect(() => {
    if (topThreeGuild.length === 0) {
      return;
    }
    setTimeout(() => {
      setProgressAnime(true);
    }, 200);
  }, [topThreeGuild]);
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
    formdata.append('title', guildCreateName);
    formdata.append('description', guildCreateDescription);

    // const value = {
    //   description: guildCreateDescription,
    //   name: guildCreateName,
    // };

    // const blob = new Blob([JSON.stringify(value)], {
    //   type: 'application/json',
    // });

    for (let value of formdata.values() as any) {
      console.log(value);
    }
    dispatch(guildActions.createGuildStart(formdata));
  };
  // profile img upload ??????
  const onLoadFile = (e: any) => {
    const file = e.target.files;
    setFilesMiri(URL.createObjectURL(file[0]));
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
          <ToastMessage text={'????????? ???????????????'}></ToastMessage>
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
          <ToastMessage text={'?????? ????????? ???????????????'}></ToastMessage>
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
          <ToastMessage text={'?????? ?????? ??????!'}></ToastMessage>
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
          <ToastMessage text={'?????? ????????? ???????????????'}></ToastMessage>
        </ToastContainer>
      )}
      <div>
        <FlexTransparentDiv
          widthSize={'32vw'}
          heightSize={'5vh'}
          paddingSize={'0'}
          flexDirection={'row'}
          justifyContent={'start'}
          alignItems={'center'}
          IsBorder={'none'}
        >
          <div
            style={{
              fontSize: '2.3vmin',
              color: '#4f9fff',
              borderRadius: '2vmin',
              paddingLeft: '2.2vw',
              paddingTop: '3vh',
              fontFamily: 'PretendardBold',
            }}
          >
            ?????? ??? ?????? ??????
          </div>
        </FlexTransparentDiv>
        <FlexTransparentDiv
          widthSize={'68vw'}
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
            <BackBlurBox
              widthSize={'32vw'}
              heightSize={'30vh'}
              paddingSize={'1vh 1vw'}
              fontColor={'black'}
              fontSize={'2vmin'}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                justifyContent: 'center',
                marginBottom: '2vh',
                position: 'relative',
              }}
            >
              <img
                style={{
                  position: 'absolute',
                  width: '5vmin',
                  height: '5vmin',
                  objectFit: 'cover',
                  top: '1vh',
                }}
                src={`https://threelaka.s3.ap-northeast-2.amazonaws.com/crown.png
                `}
              ></img>
              {topThreeGuild.length !== 0 ? (
                <>
                  {topThreeGuild.map((guild, idx) => {
                    const timeRatio = guild.time / topThreeGuild[0].time;
                    return (
                      <FlexTransparentDiv
                        key={`top-three-${idx}`}
                        widthSize={'30vw'}
                        heightSize={'8vh'}
                        paddingSize={'0'}
                        flexDirection={'row'}
                        justifyContent={'start'}
                        alignItems={'center'}
                        IsBorder={'none'}
                      >
                        <FlexTransparentDiv
                          widthSize={'8vw'}
                          heightSize={'4vh'}
                          paddingSize={'0'}
                          flexDirection={'row'}
                          justifyContent={'start'}
                          alignItems={'center'}
                          IsBorder={'none'}
                          style={{ fontSize: '2.5vmin', fontWeight: 'bold' }}
                        >
                          {guild.guildname}
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
                          <GuildProgressbar
                            widthSize={`${timeRatio * 16}vw`}
                            heightSize={'2.5vh'}
                            progressPercent={timeRatio}
                            className={progressAnime ? 'on' : 'off'}
                          />
                          <FlexTransparentDiv
                            widthSize={'6vw'}
                            heightSize={'4vh'}
                            paddingSize={'0'}
                            flexDirection={'row'}
                            justifyContent={'start'}
                            alignItems={'center'}
                            IsBorder={'none'}
                            style={{
                              fontSize: '1.5vmin',
                              fontWeight: 'bold',
                              color: 'black',
                              paddingLeft: '0.5vw',
                            }}
                          >
                            {Math.floor(guild.time / 3600)}??????&nbsp;
                            {Math.floor((guild.time % 3600) / 60)}???
                          </FlexTransparentDiv>
                        </FlexTransparentDiv>
                      </FlexTransparentDiv>
                    );
                  })}
                </>
              ) : (
                ''
              )}
            </BackBlurBox>
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
                      {files ? (
                        <img
                          src={filesMiri}
                          alt="file-miri"
                          style={{
                            width: '10vmin',
                            height: '10vmin',
                            marginRight: '1vw',
                            borderRadius: '10px',
                          }}
                        />
                      ) : (
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
                      )}

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
                          ????????????(6??? ??????)
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
                        ????????????
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
                        ?????? ????????????
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
                        ????????????
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
                      ???????????? ????????? ??????????????????(^???^)
                    </p>

                    <p
                      style={{
                        fontSize: '2vmin',
                        margin: 0,
                        height: '13vh',
                      }}
                    >
                      <FcIdea /> ??????????
                      <br />
                      ?????? ????????? ?????? ????????????{' '}
                      <span style={{ fontWeight: 'bold' }}>??????</span> ??????
                      ????????? ??? ??? ?????? ???????????????.
                      <br />
                      ????????? ???????????? ??????????????? ?????? ???????????? ???????????? ????????????{' '}
                      <span style={{ fontWeight: 'bold' }}>??????</span>????????????!
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
                      ?????? ????????????
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
                            ??? ????????????
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
                            ?????????
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
                            ??????
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
                        ????????????
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
            widthSize={'32vw'}
            heightSize={'75vh'}
            paddingSize={'0'}
            flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            IsBorder={'none'}
          >
            <MainBox
              widthSize={'32vw'}
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
                heightSize="4.5vh"
                paddingSize="0"
                fontSize="2vmin"
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
                ?????????
              </TopBtn>
              <TopBtn
                widthSize="5vw"
                heightSize="4.5vh"
                paddingSize="0"
                fontSize="2vmin"
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
                ?????????
              </TopBtn>
              <TopBtn
                widthSize="5vw"
                heightSize="4.5vh"
                paddingSize="0"
                fontSize="2vmin"
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
                ????????????
              </TopBtn>
              {/* <button>?????? ?????? (????????? ?????? ??????)</button> */}
              <FlexTransparentDiv
                widthSize={'30vw'}
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
                          ???????????????
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
                          ????????????
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
                            ?????????
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
                            ??????
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
                            ??????
                          </BackBlurBox>
                          {`${guild.memberSize}???/20???`}
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
