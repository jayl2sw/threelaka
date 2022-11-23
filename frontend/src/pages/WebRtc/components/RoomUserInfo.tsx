import React from 'react';

// style
import { RoomUsersContainer } from '../../../styles/WebRtc/WebRtcStyle';

type RoomUserInfoProps = {
  users: any;
};

const RoomUserInfo = ({ users }: RoomUserInfoProps) => {
  return (
    <RoomUsersContainer>
      <p>현재 방에 접속한 사람</p>
      <p>{JSON.stringify(users)}</p>
    </RoomUsersContainer>
  );
};

export default RoomUserInfo;
