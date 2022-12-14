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

import { useAppDispatch, useAppSelector } from '../utils/hooks';
import { authActions } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

import { FlexTransparentDiv } from '../styles/Common/CommonDivStyle';
import { ProfileImgBox } from '../styles/DashBoard/DashBoardStyle';
import { ProfileCenter } from '../styles/DashBoard/DashBoardStyle';

import { AlertImgBox } from '../styles/Main/MainStyle';
import AlertDropDown from '../pages/Main/components/AlertDropDown';
import ProfileDropDown from '../pages/Main/components/ProfileDropDown';
import { IVideoContainerProps } from '../pages/Dashboard/DailyBoard/VideoContainer';
import { studyActions } from '../features/study/study-slice';
const MainHeader = ({ setModalToggleVideoId }: IVideoContainerProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const userAlertList = useAppSelector((state) => state.auth.userAlertList);
  const profile = useAppSelector((state) => state.auth.currentUser?.profile);

  const guildId = useAppSelector((state) => state.auth.currentUser?.guildId);

  const [toggleDropDown, setToggleDropDown] = useState(false);
  const [toggleProfile, setToggleProfile] = useState(false);

  const handleToggle = () => {
    setToggleDropDown(!toggleDropDown);
    setToggleProfile(false);
  };
  const handleProfileToggle = () => {
    setToggleProfile(!toggleProfile);
    setToggleDropDown(false);
  };
  const goToHome = () => {
    dispatch(studyActions.resetStudystate());
    navigate('/');
  };

  return (
    <MainHeaderMenuRegion>
      <HeaderBgBlock>
        <HeaderLeftBlock>
          <LogoBlock>
            <img
              src="https://threelaka.s3.ap-northeast-2.amazonaws.com/mainlogo.png"
              alt="???????????? ??????"
              onClick={goToHome}
              style={{ cursor: 'pointer' }}
            />
          </LogoBlock>
          <MainLinkWrapper bgColor="transparent" widthSize="5vw">
            <Link to="/videos">VIDEOS</Link>
          </MainLinkWrapper>

          <MainLinkWrapper bgColor="transparent" widthSize="5vw">
            <Link to="/auth/dashboard/1">DASHBOARD</Link>
          </MainLinkWrapper>

          <MainLinkWrapper bgColor="transparent" widthSize="5vw">
            <Link
              to={
                guildId === null
                  ? `/auth/guild/main/${guildId}`
                  : `/auth/guild/myGuild/${guildId}`
              }
            >
              GUILD
            </Link>
          </MainLinkWrapper>
        </HeaderLeftBlock>

        <HeaderRightBlock>
          <MainLinkWrapper
            bgColor="transparent"
            widthSize="3vw"
          ></MainLinkWrapper>
          <MainLinkWrapper
            bgColor="transparent"
            widthSize="2vw"
            onClick={handleToggle}
            style={{ marginRight: '1vw' }}
          >
            {userAlertList.length !== 0 ? (
              <AlertImgBox
                style={{
                  width: '4vmin',
                  height: '3vmin',

                  borderRadius: '50%',

                  position: 'absolute',
                  display: 'flex',
                  flexDirection: 'column',

                  top: '6vh',
                  right: '7.4vw',
                }}
              ></AlertImgBox>
            ) : null}

            <TbBellRinging
              size={30}
              color="white"
              style={{ cursor: 'pointer' }}
            ></TbBellRinging>
          </MainLinkWrapper>

          {toggleDropDown ? (
            <AlertDropDown
              setModalToggleVideoId={setModalToggleVideoId}
              setToggleDropDown={setToggleDropDown}
            ></AlertDropDown>
          ) : null}

          <MainLinkWrapper
            bgColor="transparent"
            widthSize="5vw"
            onClick={handleProfileToggle}
          >
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

                  position: 'absolute',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                }}
              >
                <ProfileImgBox
                  style={{
                    width: '7vmin',
                    height: '7vmin',

                    backgroundColor: 'white',
                    borderRadius: '50%',
                    opacity: 0.9,

                    position: 'absolute',
                    display: 'flex',
                    flexDirection: 'column',
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
          {toggleProfile ? <ProfileDropDown></ProfileDropDown> : null}
        </HeaderRightBlock>
      </HeaderBgBlock>
    </MainHeaderMenuRegion>
  );
};

export default MainHeader;
