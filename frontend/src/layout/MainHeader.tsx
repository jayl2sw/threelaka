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
          {nickname && (
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
          )}
          <MainLinkWrapper bgColor="transparent" widthSize="3vw">
            <Link
              to="/auth/login"
              onClick={() => {
                // alert('다음에 또 만나요!');
                handleLogout();
              }}
            >
              <LogoutIcon size={20}></LogoutIcon>
            </Link>

            {/* <LogoutIcon
          onClick={handleLogout}
          style={{ width: '15vw' }}
        ></LogoutIcon> */}
          </MainLinkWrapper>

          <TbBellRinging
            size={25}
            color="white"
            style={{ marginTop: '2vh' }}
          ></TbBellRinging>
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
            </FlexTransparentDiv>
          </MainLinkWrapper>
        </HeaderRightBlock>
      </HeaderBgBlock>
    </MainHeaderMenuRegion>
  );
};

export default MainHeader;
