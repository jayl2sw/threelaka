import React from 'react';
import UpdateProfile from './UpdateProfile';
import UpdateUserInfo from './UpdateUserInfo';
import { ProfileContainer } from '../../../styles/DashBoard/DashBoardStyle';
const Profile = () => {
  return (
    <ProfileContainer>
      <UpdateProfile></UpdateProfile>
      <UpdateUserInfo></UpdateUserInfo>
    </ProfileContainer>
  );
};

export default Profile;
