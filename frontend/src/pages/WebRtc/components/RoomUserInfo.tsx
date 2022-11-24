import React from 'react';

// style
import { RoomUsersContainer } from '../../../styles/WebRtc/WebRtcStyle';

type RoomUserInfoProps = {
  connectedUsers: any;
};

const RoomUserInfo = ({ connectedUsers }: RoomUserInfoProps) => {
  let nicknameList: any = [];
  connectedUsers.forEach((user: any) => {
    {
      console.log('user--------', user);
      console.log(user.nickname);
      nicknameList.push(user.nickname);
    }
  });

  return (
    <RoomUsersContainer>
      <p
        style={{
          fontSize: '2.5vmin',
          fontWeight: 'bold',
          color: '#4A9FFF',
          verticalAlign: 'middle',
        }}
      >
        현재 방에 접속한 길드원
      </p>
      <div className="user-list">
        {/* {nicknameList.map((name: string, idx: number) => {
          <p key={`name-${idx}`}>{name}</p>;
        })} */}
        <p>- 신세계지현</p>
        <p>- 우리은행동욱</p>
        <p>- 라인재준</p>
        <p>- 토익만점</p>
        {/* <p>{nicknameList[4]}</p>
        <p>{nicknameList[5]}</p> */}
      </div>
    </RoomUsersContainer>
  );
};

export default RoomUserInfo;
