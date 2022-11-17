import React from 'react';

type MembersListProps = {
  //   connectedUsers: never[];
  connectedUsers: {
    guildId: string;
    learningRecordId: number;
    nickname: string;
    roomNumber: number;
    socketId: string;
  }[];
};

const MembersList = (props: MembersListProps) => {
  const { connectedUsers } = props;
  console.log('connectedUsers', connectedUsers);
  let nicknameList: any = [];
  connectedUsers.forEach((user) => {
    {
      console.log('user--------', user);
      console.log(user.nickname);
      nicknameList.push(user.nickname);
    }
  });
  return (
    <div
      style={{
        border: '2px solid red',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
      }}
    >
      현재 접속한 사람 목록
      <p>{nicknameList}</p>
    </div>
  );
};

export default MembersList;
