import React, { useState } from 'react';
import RoomInfo from './RoomInfo';

const EnglishOnlyZone = () => {
  const [roomNubmer, setRoomNumber] = useState<number>(0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <button
          onClick={() => {
            setRoomNumber(1);
          }}
        >
          방 1
        </button>
        <button
          onClick={() => {
            setRoomNumber(2);
          }}
        >
          방 2
        </button>
        <button
          onClick={() => {
            setRoomNumber(3);
          }}
        >
          방 3
        </button>
      </div>
      <div>{/* <RoomInfo roomnumber={roomNubmer} /> */}</div>
    </div>
  );
};

export default EnglishOnlyZone;
