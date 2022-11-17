import React, { useEffect, useState } from 'react';
import EozRoomInfo from './EozRoomInfo';
//style
import {
  RoomNumBtnContainer,
  RoomNumBtn,
  EozMainContainer,
} from '../../../../styles/Guild/GuildEozStyle';

type EozProps = {
  guildInfo: {
    guildId: number;
    rooms: {
      roomNumber: number;
      videoId: string | null;
      connectedUsers: never[];
    }[];
    connectedUsers: never[];
  };
  nickname: string;
  localStream: any;
};

const EnglishOnlyZone = (props: EozProps) => {
  const { guildInfo, localStream, nickname } = props;
  console.warn(localStream);
  console.log('localStream type을 알려줘===========', typeof localStream);
  const [roomNumber, setRoomNumber] = useState(1);
  useEffect(() => {
    console.log('EnglishOnlyZone에서 useEffect 발동');
  }, []);

  return (
    <div>
      <RoomNumBtnContainer>
        <RoomNumBtn
          className={roomNumber === 1 ? '' : 'not-active'}
          onClick={() => {
            setRoomNumber(1);
          }}
        >
          Zone 1
        </RoomNumBtn>
        <RoomNumBtn
          className={roomNumber === 2 ? '' : 'not-active'}
          onClick={() => {
            setRoomNumber(2);
          }}
        >
          Zone 2
        </RoomNumBtn>
        <RoomNumBtn
          className={roomNumber === 3 ? '' : 'not-active'}
          onClick={() => {
            setRoomNumber(3);
          }}
        >
          Zone 3
        </RoomNumBtn>
      </RoomNumBtnContainer>
      <EozRoomInfo
        guildInfo={guildInfo}
        roomNumber={roomNumber}
        localStream={localStream}
      />
    </div>
  );
};

export default EnglishOnlyZone;
