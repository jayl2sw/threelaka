import React, { useState } from 'react';
import RoomInfo from './RoomInfo';

// style
import {
  WaitingRoomBlock,
  RoomNumBtnContainer,
  RoomNumBtn,
  RoomInfoBlock,
} from '../../../styles/WebRtc/WebRtcStyle';

type WaitingRoomProps = {
  guildInfo: any;
  messages: string;
  localStream: any;
};

const WaitingRoom = ({
  guildInfo,
  messages,
  localStream,
}: WaitingRoomProps) => {
  const [roomNumber, setRoomNumber] = useState(1);
  console.log(roomNumber);

  return (
    <WaitingRoomBlock>
      <RoomNumBtnContainer>
        <RoomNumBtn
          onClick={() => setRoomNumber(1)}
          className={roomNumber === 1 ? '' : 'not-active'}
        >
          Room1
        </RoomNumBtn>
        <RoomNumBtn
          onClick={() => setRoomNumber(2)}
          className={roomNumber === 2 ? '' : 'not-active'}
        >
          Room2
        </RoomNumBtn>
        <RoomNumBtn
          onClick={() => setRoomNumber(3)}
          className={roomNumber === 3 ? '' : 'not-active'}
        >
          Room3
        </RoomNumBtn>
      </RoomNumBtnContainer>
      <RoomInfo
        messages={messages}
        localStream={localStream}
        guildInfo={guildInfo}
        roomNumber={roomNumber}
      />
    </WaitingRoomBlock>
  );
};

export default WaitingRoom;
