import React from 'react';
import { ProfileDropDownContainer } from '../../../styles/Main/MainStyle';
import {
  MainBox,
  FlexTransparentDiv,
} from '../../../styles/Common/CommonDivStyle';
import {
  ProfileImgBox,
  ProfileCenter,
} from '../../../styles/DashBoard/DashBoardStyle';
import { ProfileDropDownCard } from '../../../styles/Main/MainStyle';
import { useAppSelector, useAppDispatch } from '../../../utils/hooks';
import { Link } from 'react-router-dom';
import { authActions } from '../../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

import { LogoutIcon } from '../../../styles/Layout/MainHeaderStyle';

const ProfileDropDown = () => {
  const profile = useAppSelector((state) => state.auth.currentUser?.profile);
  const nickname = useAppSelector((state) => state.auth.currentUser?.nickname);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate('/auth/login');
  };
  return (
    <div>
      {' '}
      <ProfileDropDownContainer>
        <div className="dropdown">
          <MainBox
            widthSize={'16vw'}
            heightSize={'18vh'}
            paddingSize={'1.5vh 0vw'}
            fontColor={'black'}
            fontSize={'1vmin'}
            className="dropdown-content"
            style={{
              overflowY: 'hidden',
              minHeight: '20vh',
              overflowX: 'hidden',
            }}
          >
            <ProfileDropDownCard>
              <FlexTransparentDiv
                widthSize={'6vw'}
                heightSize={'12vh'}
                paddingSize={'0'}
                flexDirection={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                IsBorder={'none'}
                style={{ marginBottom: '1vh', marginLeft: '1VW' }}
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
              <FlexTransparentDiv
                widthSize={'13vw'}
                heightSize={'10vh'}
                paddingSize={'0'}
                flexDirection={'column'}
                justifyContent={'start'}
                alignItems={'start'}
                IsBorder={'none'}
                style={{ marginTop: '2vh' }}
              >
                {nickname && (
                  <div
                    style={{
                      fontSize: '2.5vmin',
                      color: '#111111',
                      textAlign: 'center',
                      fontWeight: 'bold',
                    }}
                  >
                    {nickname}
                  </div>
                )}
                <Link to="/auth/dashboard/3">
                  <div
                    className="profileLink"
                    style={{ marginTop: '1vh', fontSize: '2vmin' }}
                  >
                    My Profile
                  </div>
                </Link>
              </FlexTransparentDiv>
            </ProfileDropDownCard>
            <ProfileDropDownCard
              className="link"
              style={{
                height: '7vh',
                display: 'flex',
              }}
            >
              <Link
                style={{
                  height: '7vh',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2vmin',
                  paddingRight: '2.5vw',
                }}
                to="/auth/login"
                onClick={() => {
                  // alert('다음에 또 만나요!');
                  handleLogout();
                }}
              >
                <LogoutIcon
                  size={20}
                  style={{ marginRight: '0.5vw' }}
                ></LogoutIcon>
                <div>LOGOUT</div>
              </Link>
            </ProfileDropDownCard>
          </MainBox>
        </div>
      </ProfileDropDownContainer>
    </div>
  );
};

export default ProfileDropDown;
