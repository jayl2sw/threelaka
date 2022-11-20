import React, { useState } from 'react';
import { exitRoom } from '../EozPage';
import StreamVideo from './StreamVideo';
import UserEssayBtn from './UserEssayBtn';

import {
  EozBtn,
  UserEssayContainer,
  EssayPickBtnContainer,
} from '../../../../styles/Guild/GuildEozStyle';

type EozRoomProps = {
  onClickModal: () => void;
  isOpenModal: Boolean;
  roomNumber: number;
  guildId: number;
  roomInfo: {
    roomNumber: number;
    videoId: string | null;
    connectedUsers: never[];
  };
};

const EozRoom = (props: EozRoomProps) => {
  const { onClickModal, roomNumber, guildId, roomInfo } = props;
  const [essayNumber, setEssayNumber] = useState<number>(1);
  const [selectedMember, setSelectedMember] = useState<string>('');

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <div>
          <StreamVideo />
          <StreamVideo />
          <StreamVideo />
        </div>
        <div>
          <StreamVideo />
          <StreamVideo />
          <StreamVideo />
        </div>
        <div>
          <UserEssayContainer>
            <EssayPickBtnContainer>
              <UserEssayBtn
                nickname={'하나둘셋넷다섯여섯'}
                learningRecordId={123}
                pickedUser={'하나둘'}
              />
            </EssayPickBtnContainer>
            <div>에세이</div>
          </UserEssayContainer>
        </div>
      </div>

      <EozBtn
        widthSize="10vw"
        heightSize="3.5vh"
        fontColor="white"
        backgroundColor="red"
        onClick={() => {
          exitRoom();
          onClickModal();
        }}
      >
        나가기
      </EozBtn>
    </div>
  );
};

export default EozRoom;
