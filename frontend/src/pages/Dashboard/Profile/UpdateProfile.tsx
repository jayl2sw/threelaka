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

  return (
    <div>
      <FlexTransparentDiv
        widthSize={'30vw'}
        heightSize={'90vh'}
        paddingSize={'0'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        IsBorder={'is'}
        style={{ position: 'relative' }}
      >
        <ProfileImgBox
          style={{
            width: '14vmin',
            height: '14vmin',
            background: `linear-gradient(
                110.64deg,
                #4a9fff 5.65%,
                rgba(88, 172, 240, 0.861458) 45.15%,
                #b0ff91 84.64%
              )`,
            borderRadius: '50%',
            border: '4px solid #fff',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <ProfileCenter
            className={profile !== '0' ? 'profileImg' + profile : 'default'}
          ></ProfileCenter>
          <EditBtn onClick={openModalProfle}></EditBtn>
        </ProfileImgBox>

        {isOpen ? (
          <SelectProfile
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            setProfileNum={setProfileNum}
          />
        ) : null}

        <MainBox
          widthSize={'30vw'}
          heightSize={'74vh'}
          paddingSize={'2vh 2vw'}
          fontColor={'black'}
          fontSize={'2vmin'}
          style={{ display: 'flex', position: 'absolute', bottom: '8vh' }}
        >
          <ModifyUserInfo></ModifyUserInfo>
        </MainBox>
      </FlexTransparentDiv>
    </div>
  );
};

export default UpdateProfile;
