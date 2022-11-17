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
      nicknameList.push(user.nickname);
    }
  });
  return (
    <div className="member-box">
      <p>현재 접속 중인 사람 ( {nicknameList.length} / 6 )</p>
      {nicknameList.length ? (
        <div className="member-name-box">
          <span style={{ transform: 'translateY(50%)' }}>
            {nicknameList[0]}
          </span>
          <span style={{ transform: 'translateY(50%)' }}>
            {nicknameList[1]}
          </span>
          <span style={{ transform: 'translateY(50%)' }}>
            {nicknameList[2]}
          </span>
          <span style={{ transform: 'translateY(50%)' }}>
            {nicknameList[3]}
          </span>
          <span style={{ transform: 'translateY(50%)' }}>
            {nicknameList[4]}
          </span>
          <span style={{ transform: 'translateY(50%)' }}>
            {nicknameList[5]}
          </span>
        </div>
      ) : (
        <div className="member-empty-box">
          <p>지금은 아무도 없어요 :(</p>
        </div>
      )}
    </div>
  );
};

export default MembersList;
