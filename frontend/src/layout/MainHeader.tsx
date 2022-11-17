import React, { useState } from 'react';
// import { TitleRegion } from '../styles/Layout/HeaderStyle';
import {
  MainHeaderMenuRegion,
  MainLinkWrapper,
} from '../styles/Layout/MainHeaderStyle';
import { Link } from 'react-router-dom';
// import { LogoutIcon } from '../styles/Layout/HeaderStyle';
import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { authActions } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { ToastMessage } from '../utils/ToastMessage';
import { ToastContainer } from '../styles/Common/CommonDivStyle';
import { FlexTransparentDiv } from '../styles/Common/CommonDivStyle';
import { ProfileImgBox } from '../styles/DashBoard/DashBoardStyle';
import { ProfileCenter } from '../styles/DashBoard/DashBoardStyle';
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

      <MainLinkWrapper bgColor="transparent" widthSize="10vw">
        <Link to="/videos" style={{ fontSize: '1.2vw' }}>
          VIDEOS
        </Link>
      </MainLinkWrapper>

      {/* <MainLinkWrapper
        bgColor="transparent"
        widthSize="10vw"
        onClick={activeToast}
      >
        VIDEOS
      </MainLinkWrapper> */}

      <MainLinkWrapper bgColor="transparent" widthSize="10vw">
        <Link to="/auth/dashboard/1" style={{ fontSize: '1.2vw' }}>
          DASHBOARD
        </Link>
      </MainLinkWrapper>

      <MainLinkWrapper bgColor="transparent" widthSize="10vw">
        <Link to="/auth/guild/1" style={{ fontSize: '1.2vw' }}>
          GUILD
        </Link>
      </MainLinkWrapper>
      {/* <MainLinkWrapper
        bgColor="transparent"
        widthSize="10vw"
        onClick={activeToast}
      >
        GUILD
      </MainLinkWrapper> */}

      <MainLinkWrapper bgColor="transparent" widthSize="10vw">
        <Link
          to="/auth/login"
          onClick={() => {
            // alert('다음에 또 만나요!');
            handleLogout();
          }}
          style={{ fontSize: '1.2vw' }}
        >
          LOGOUT
        </Link>
        {/* <LogoutIcon
          onClick={handleLogout}
          style={{ width: '15vw' }}
        ></LogoutIcon> */}
      </MainLinkWrapper>
      <MainLinkWrapper bgColor="transparent" widthSize="10vw">
        {nickname && <div>{nickname}</div>}
      </MainLinkWrapper>
      <MainLinkWrapper bgColor="transparent" widthSize="10vw">
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
        </FlexTransparentDiv>
      </MainLinkWrapper>
    </MainHeaderMenuRegion>
  );
};

export default MainHeader;
