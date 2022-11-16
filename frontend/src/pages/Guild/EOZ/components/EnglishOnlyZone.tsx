import React, { useState } from 'react';

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
  socketId: string;
};

const EnglishOnlyZone = (props: EozProps) => {
  const { guildInfo, nickname, socketId } = props;
  const [roomNumber, setRoomNumber] = useState(1);

  return <div></div>;
};

export default EnglishOnlyZone;
