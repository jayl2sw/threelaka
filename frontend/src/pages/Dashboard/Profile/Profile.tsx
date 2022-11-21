import React, { useEffect } from 'react';
import UpdateProfile from './UpdateProfile';
import UpdateUserInfo from './UpdateUserInfo';
import { ProfileContainer } from '../../../styles/DashBoard/DashBoardStyle';
import { useAppDispatch } from '../../../utils/hooks';
import { dashboardActions } from '../../../features/dashboard/dashboard-slice';
const Profile = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(dashboardActions.getTagList());
  }, []);
  return (
    <ProfileContainer>
      <UpdateProfile></UpdateProfile>
      <UpdateUserInfo></UpdateUserInfo>
    </ProfileContainer>
  );
};

export default Profile;
