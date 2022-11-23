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
  const [roomNumber, setRoomNumber] = useState<number>(1);
  console.log(roomNumber);

  return (
    <WaitingRoomBlock>
      <RoomNumBtnContainer>
        <RoomNumBtn
          onClick={() => setRoomNumber(1)}
          style={{ opacity: roomNumber === 1 ? '' : '0.5' }}
        >
          Zone 1
        </RoomNumBtn>
        <RoomNumBtn
          onClick={() => setRoomNumber(2)}
          style={{ opacity: roomNumber === 2 ? '' : '0.5' }}
        >
          Zone 2
        </RoomNumBtn>
        <RoomNumBtn
          onClick={() => setRoomNumber(3)}
          style={{ opacity: roomNumber === 3 ? '' : '0.5' }}
        >
          Zone 3
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
