import React, { useState } from 'react';
// import RoomInfo from './RoomInfo';

const EnglishOnlyZone = () => {
  const [roomNubmer, setRoomNumber] = useState<number>(0);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        borderRadius: '2vmin',
      }}
    >
      <div style={{ height: '100%' }}>
        <p
          style={{
            fontSize: '2.5vmin',
            fontWeight: 'bold',
            height: '5vh',
            margin: '0',
            lineHeight: '5vh',
            paddingLeft: '1vw',
          }}
        >
          <span style={{ color: '#4A9FFF' }}>E</span>nglish{' '}
          <span style={{ color: '#4A9FFF' }}>O</span>nly{' '}
          <span style={{ color: '#4A9FFF' }}>Z</span>one
        </p>
        <p style={{ fontSize: '2vmin', paddingLeft: '1vw' }}>
          현재 접속 중인 사람 ( 5 / 6 )
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            textAlign: 'center',
            height: '60%',
          }}
        >
          <span style={{ transform: 'translateY(35%)' }}>닉네임A</span>
          <span style={{ transform: 'translateY(35%)' }}>닉네임B</span>
          <span style={{ transform: 'translateY(35%)' }}>닉네임C</span>
          <span style={{ transform: 'translateY(35%)' }}>닉네임D</span>
          <span style={{ transform: 'translateY(35%)' }}>닉네임E</span>
          <span style={{ transform: 'translateY(35%)' }}>닉네임F</span>
        </div>
        {/* <button
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
        </button> */}
      </div>
      <div>{/* <RoomInfo roomnumber={roomNubmer} /> */}</div>
    </div>
  );
};

export default EnglishOnlyZone;
