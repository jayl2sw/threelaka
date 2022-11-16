import React from 'react';
import UpdateProfile from './UpdateProfile';
import UpdateUserInfo from './UpdateUserInfo';
import { ProfileContainer } from '../../../styles/DashBoard/DashBoardStyle';
const Profile = () => {
  return (
    <ProfileContainer>
      <UpdateUserInfo></UpdateUserInfo>
      <UpdateProfile></UpdateProfile>
    </ProfileContainer>
  );
};

export default Profile;
