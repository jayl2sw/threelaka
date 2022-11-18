import React, { useState } from 'react';
// import { TitleRegion } from '../styles/Layout/HeaderStyle';
import {
  MainHeaderMenuRegion,
  MainLinkWrapper,
  HeaderLeftBlock,
  HeaderRightBlock,
  LogoBlock,
  HeaderBgBlock,
} from '../styles/Layout/MainHeaderStyle';
import { Link } from 'react-router-dom';
import { TbBellRinging } from 'react-icons/tb';

import { LogoutIcon } from '../styles/Layout/HeaderStyle';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { authActions } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { ToastMessage } from '../utils/ToastMessage';
import { ToastContainer } from '../styles/Common/CommonDivStyle';
import { FlexTransparentDiv } from '../styles/Common/CommonDivStyle';
import { ProfileImgBox } from '../styles/DashBoard/DashBoardStyle';
import { ProfileCenter } from '../styles/DashBoard/DashBoardStyle';

import { RiWechat2Fill } from 'react-icons/ri';

import { AlertImgBox } from '../styles/Main/MainStyle';
import AlertDropDown from '../pages/Main/components/AlertDropDown';
const MainHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate('/auth/login');
  };
  const [isToast, setIsToast] = useState(false);
  const profile = useAppSelector((state) => state.auth.currentUser?.profile);
  const nickname = useAppSelector((state) => state.auth.currentUser?.nickname);
  function activeToast() {
    setIsToast(true);
    let timer = setTimeout(() => {
      setIsToast(false);
    }, 2000);
    return () => {
      clearTimeout(timer);
    };
  }
  const [toggleDropDown, setToggleDropDown] = useState(false);

  const handleToggle = () => {
    setToggleDropDown(!toggleDropDown);
  };

  return (
    <MainHeaderMenuRegion>
      <HeaderBgBlock>
        {isToast && (
          <ToastContainer
            widthSize={'25vw'}
            heightSize={'20vh'}
            paddingSize={'2vh 1vw'}
            fontColor={'black'}
            top={'40vh'}
            left={'40vw'}
          >
            <ToastMessage text={'해당 페이지는 열심히 만드는 중...'} />
          </ToastContainer>
        )}

        {/* <MainLinkWrapper bgColor="transparent" widthSize="10vw"></MainLinkWrapper> */}

        <HeaderLeftBlock>
          <LogoBlock>
            <img
              src="https://threelaka.s3.ap-northeast-2.amazonaws.com/mainlogo.png"
              alt="스리라까 로고"
            />
          </LogoBlock>
          <MainLinkWrapper bgColor="transparent" widthSize="5vw">
            <Link to="/videos">VIDEOS</Link>
          </MainLinkWrapper>

          {/* <MainLinkWrapper
        bgColor="transparent"
        widthSize="10vw"
        onClick={activeToast}
      >
        VIDEOS
      </MainLinkWrapper> */}

          <MainLinkWrapper bgColor="transparent" widthSize="5vw">
            <Link to="/auth/dashboard/1">DASHBOARD</Link>
          </MainLinkWrapper>

          <MainLinkWrapper bgColor="transparent" widthSize="5vw">
            <Link to="/auth/guild/1">GUILD</Link>
          </MainLinkWrapper>
          {/* <MainLinkWrapper
        bgColor="transparent"
        widthSize="10vw"
        onClick={activeToast}
      >
        GUILD
      </MainLinkWrapper> */}
        </HeaderLeftBlock>

        <HeaderRightBlock>
          {/* {nickname && (
            <div
              style={{
                fontSize: '2vmin',
                color: '#111111',
                textAlign: 'center',
                width: '10vw',
                // border: 'solid red 1px',
                marginTop: '2vh',
              }}
            >
              Welcome {nickname}!
            </div>
          )} */}
          <MainLinkWrapper bgColor="transparent" widthSize="3vw">
            {/* <Link
              to="/auth/login"
              onClick={() => {
                // alert('다음에 또 만나요!');
                handleLogout();
              }}
            >
              <LogoutIcon size={20}></LogoutIcon>
            </Link> */}

            {/* <LogoutIcon
          onClick={handleLogout}
          style={{ width: '15vw' }}
        ></LogoutIcon> */}
          </MainLinkWrapper>
          <MainLinkWrapper
            bgColor="transparent"
            widthSize="2vw"
            onClick={handleToggle}
          >
            <AlertImgBox
              style={{
                width: '4vmin',
                height: '3vmin',

                borderRadius: '50%',

                position: 'absolute',
                display: 'flex',
                flexDirection: 'column',
                // backgroundImage: `url(https://threelaka.s3.ap-northeast-2.amazonaws.com/neonCircle.png)`,
                // backgroundImage: `url("https://threelaka.s3.ap-northeast-2.amazonaws.com/neonCircle.png")`,
                // top: '1vh',
                top: '6vh',
                right: '6.5vw',
              }}
            ></AlertImgBox>
            <TbBellRinging size={30}></TbBellRinging>
          </MainLinkWrapper>

          {toggleDropDown ? <AlertDropDown></AlertDropDown> : null}

          <MainLinkWrapper bgColor="transparent" widthSize="5vw">
            <FlexTransparentDiv
              widthSize={'13vw'}
              heightSize={'10vh'}
              paddingSize={'0'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              IsBorder={'none'}
            >
              <ProfileImgBox
                style={{
                  width: '8vmin',
                  height: '8vmin',
                  background: `linear-gradient(
                    106.62deg,
                    #83bdff 8.18%,
                    rgba(88, 172, 240, 0.861458) 45.03%,
                    #c1ffa9 92.42%
                  )`,
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  opacity: 0.9,
                  // border: '1px solid blue',
                  position: 'absolute',
                  display: 'flex',
                  flexDirection: 'column',
                  // top: '1vh',
                }}
              >
                <ProfileImgBox
                  style={{
                    width: '7vmin',
                    height: '7vmin',
                    // background: `linear-gradient(
                    //   110.64deg,
                    //   rgb(74, 159, 255, 0.3) 5.65%,
                    //   rgba(88, 172, 240, 0.3) 45.15%,
                    //   rgb(176, 255, 145, 0.6) 84.64%
                    // )`,
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    opacity: 0.9,
                    // border: '1px solid blue',
                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
                    // top: '1vh',
                  }}
                >
                  <ProfileCenter
                    className={
                      profile !== '0' ? 'profileImg' + profile : 'default'
                    }
                    style={{ backgroundSize: '5.5vmin 5.5vmin' }}
                  ></ProfileCenter>
                </ProfileImgBox>
              </ProfileImgBox>
            </FlexTransparentDiv>
          </MainLinkWrapper>
        </HeaderRightBlock>
      </HeaderBgBlock>

      {/* <MainLinkWrapper bgColor="transparent" widthSize="10vw">
        <Link
          to="/auth/login"
          onClick={() => {
            // alert('다음에 또 만나요!');
            handleLogout();
          }}
          style={{ fontSize: '1.2vw' }}
        >
          LOGOUT
        </Link> */}
      {/* <LogoutIcon
          onClick={handleLogout}
          style={{ width: '15vw' }}
        ></LogoutIcon> */}
      {/* </MainLinkWrapper> */}

      {/* <MainLinkWrapper bgColor="transparent" widthSize="10vw">
        <FlexTransparentDiv
          widthSize={'13vw'}
          heightSize={'10vh'}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'none'}
        >
          <ProfileImgBox
            style={{
              width: '8vmin',
              height: '8vmin',
              background: `linear-gradient(
                110.64deg,
                #4a9fff 5.65%,
                rgba(88, 172, 240, 0.861458) 45.15%,
                #b0ff91 84.64%
              )`,
              borderRadius: '50%',
              border: '3.5px solid #111111',
              position: 'absolute',
              display: 'flex',
              flexDirection: 'column',
              // top: '1vh',
            }}
          >
            <ProfileCenter
              className={profile !== '0' ? 'profileImg' + profile : 'default'}
              style={{ backgroundSize: '6vmin 6vmin' }}
            ></ProfileCenter>
          </ProfileImgBox>
        </FlexTransparentDiv> */}

      {/* <img
          src="https://threelaka.s3.ap-northeast-2.amazonaws.com/neonCircle.png"
          alt="스리라까 로고"
          style={{
            width: '8vmin',
            height: '8vmin',

            borderRadius: '50%',

            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            zIndex: '1',
          }}
        /> */}
      {/* <img
          src="https://threelaka.s3.ap-northeast-2.amazonaws.com/neonCircle.png"
          alt="스리라까 로고"
          style={{
            width: '8vmin',
            height: '8vmin',

            borderRadius: '50%',

            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            zIndex: '1',
          }}
        >
          <CgBell></CgBell>
        </img>
        <ProfileCenter
          style={{ backgroundSize: '6vmin 6vmin' }}
        ></ProfileCenter> */}
    </MainHeaderMenuRegion>
  );
};

export default MainHeader;
