import React from 'react';
import { EssayPickBtn } from '../../../../styles/Guild/GuildEozStyle';

type UserEssayPick = {
  nickname: string;
  pickedUser: string;
  learningRecordId: number;
};

const UserEssayBtn = (props: UserEssayPick) => {
  const { nickname, pickedUser, learningRecordId } = props;
  // console.log('nickname', nickname);
  // console.log('pickedUser', pickedUser);
  // console.log(nickname === pickedUser);

  return (
    <EssayPickBtn
      className={nickname === pickedUser ? '' : 'not-actiave'}
      onClick={() => console.log(`${nickname} clicked!`)}
    >
      {nickname.length < 8 ? nickname : nickname.substring(0, 6) + '...'}
    </EssayPickBtn>
  );
};

export default UserEssayBtn;
