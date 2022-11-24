import React, { useEffect } from 'react';
import UpdateProfile from './UpdateTag';
import UpdateUserInfo from './UpdateUserInfo';
import { ProfileContainer } from '../../../styles/DashBoard/DashBoardStyle';
import { useAppDispatch } from '../../../utils/hooks';
import { dashboardActions } from '../../../features/dashboard/dashboard-slice';
import UpdateTag from './UpdateTag';
import ModifyProfile from './ModifyProfile';
const Profile = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(dashboardActions.getTagList());
  }, []);
  return (
    <ProfileContainer>
      <div>
        <ModifyProfile></ModifyProfile>
        <UpdateUserInfo></UpdateUserInfo>
      </div>
      <UpdateTag></UpdateTag>
    </ProfileContainer>
  );
};

export default Profile;
