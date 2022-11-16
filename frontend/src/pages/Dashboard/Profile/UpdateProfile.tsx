import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  FlexTransparentDiv,
  MainBox,
} from '../../../styles/Common/CommonDivStyle';
import {
  ProfileImgBox,
  ProfileCenter,
  EditBtn,
} from '../../../styles/DashBoard/DashBoardStyle';
import { useAppSelector } from '../../../utils/hooks';
import ModifyUserInfo from './ModifyUserInfo';
import SelectProfile from './SelectProfile';

const UpdateProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileNum, setProfileNum] = useState('');

  const openModalProfle = () => {
    setIsOpen(!isOpen);
  };
  const profile = useAppSelector((state) => state.auth.currentUser?.profile);
  const myGuildInfo = useAppSelector((state) => state.guild.myGuildInfo);
  return (
    <FlexTransparentDiv
      widthSize={'32vw'}
      heightSize={'81.5vh'}
      paddingSize={'0'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      IsBorder={'is'}
      style={{ marginLeft: '2.8vw' }}
    >
      <FlexTransparentDiv
        widthSize={'32vw'}
        heightSize={'40vh'}
        paddingSize={'0'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        IsBorder={'is'}
        style={{ position: 'relative', marginTop: '6vh' }}
      >
        <ProfileImgBox
          style={{
            width: '18vmin',
            height: '18vmin',
            background: `linear-gradient(
                110.64deg,
                #4a9fff 5.65%,
                rgba(88, 172, 240, 0.861458) 45.15%,
                #b0ff91 84.64%
              )`,
            borderRadius: '50%',
            border: '4px solid #fff',
            position: 'absolute',
            display: 'flex',
            flexDirection: 'column',
            top: '-6vh',
          }}
        >
          <ProfileCenter
            className={profile !== '0' ? 'profileImg' + profile : 'default'}
            style={{ backgroundSize: '12vmin 12vmin' }}
          ></ProfileCenter>
        </ProfileImgBox>

        {isOpen ? (
          <SelectProfile
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setProfileNum={setProfileNum}
          />
        ) : null}

        <MainBox
          widthSize={'28vw'}
          heightSize={'30vh'}
          paddingSize={'2vh 2vw'}
          fontColor={'black'}
          fontSize={'2vmin'}
          style={{ display: 'flex', position: 'absolute' }}
        >
          <FlexTransparentDiv
            widthSize={'24vw'}
            heightSize={'30vh'}
            paddingSize={'0'}
            flexDirection={'column'}
            justifyContent={'start'}
            alignItems={'center'}
            IsBorder={'is'}
            style={{ position: 'absolute', top: '9vh' }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div>프로필 수정</div>
              <EditBtn onClick={openModalProfle}></EditBtn>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 6vw)',
                justifyItems: 'center',
                marginTop: '2vh',
                textAlign: 'center',
              }}
            >
              <div>
                <div>My Guild</div>
                <div
                  style={{
                    color: '#4A9FFF',
                    marginTop: '2vh',
                    width: '10vw',
                    wordBreak: 'break-all',
                    fontSize: '2.5vmin',
                  }}
                >
                  {myGuildInfo.guildName === ''
                    ? 'Make Guild!'
                    : myGuildInfo.guildName}
                </div>
              </div>
              <div
                style={{
                  border: '2px solid #565656',
                  width: '0.3px',
                  height: '13vh',
                  background: '#565656',
                }}
              ></div>
              <div>
                Total<div></div> Study-Time
              </div>
            </div>
          </FlexTransparentDiv>
        </MainBox>
      </FlexTransparentDiv>

      <FlexTransparentDiv
        widthSize={'32vw'}
        heightSize={'40vh'}
        paddingSize={'0'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        IsBorder={'is'}
      ></FlexTransparentDiv>
    </FlexTransparentDiv>
  );
};

export default UpdateProfile;
