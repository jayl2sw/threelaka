import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../utils/hooks';
import io from 'socket.io-client';
import EnglishOnlyZone from './components/EnglishOnlyZone';

// 길드 아이디 type 확정짓기 User에는 string으로 들어오긴함
type EozPageProps = {
  guildId: number;
  nickname: string;
};

const EozPage = (props: EozPageProps) => {
  const { guildId, nickname } = props;

  const [bool, setBool] = useState(false);

  useEffect(() => {
    connectWithSocketIOServer();
    setBool(joinGuildChannel(nickname, guildId));
    return () => {};
  }, []);

  const [guildInfo, setGuildInfo] = useState({
    guildId: guildId,
    rooms: [
      {
        roomNumber: 1,
        videoId: null,
        connectedUsers: [],
      },
      {
        roomNumber: 2,
        videoId: null,
        connectedUsers: [],
      },
      {
        roomNumber: 3,
        videoId: null,
        connectedUsers: [],
      },
    ],
    connectedUsers: [],
  });
  const [socketId, setSocketId] = useState('');

  useEffect(() => {
    console.log('guildInfo changed:', guildInfo);
  }, [guildInfo]);

  const connectWithSocketIOServer = () => {
    socket = io(SERVER);

    socket.on('connect', () => {
      console.log('successfully connected with socket io server');
      console.log(socket.id);
      // setSocketId(socket.id);
    });

    socket.on('guild-update', (data: any) => {
      setGuildInfo((prevState) => ({
        ...prevState,
        guildId: data.guild.guildId,
        rooms: data.guild.rooms,
        connectedUsers: data.guild.connectedUsers,
      }));
    });
  };
  return (
    <div>
      <EnglishOnlyZone
        guildInfo={guildInfo}
        nickname={nickname}
        socketId={socketId}
      />
    </div>
  );
};

// 소켓 통신용
const SERVER = 'http://localhost:5002';

let socket: any = null;

export const joinGuildChannel = (nickname: string, guildId: number) => {
  const data = {
    nickname,
    guildId,
  };
  console.log('socket---------------------------11111111', socket);
  socket.emit('join-guild-channel', data);
  return true;
};
export const createRoom = (
  roomNumber: number,
  guildId: number,
  videoId: string,
  learningRecordId: number
) => {
  // emit an event to server that we would like to create new room
  const data = {
    roomNumber,
    guildId,
    videoId,
    learningRecordId,
  };
  console.log('-------------------create room------------------', socket);
  socket.emit('create-room', data);
};
export const joinRoom = (
  roomNumber: number,
  guildId: number,
  learningRecordId: number
) => {
  // emit an event to server that we would like to create new room
  const data = {
    roomNumber,
    guildId,
    learningRecordId,
  };
  console.log('-------------------join room------------------', socket);
  socket.emit('join-room', data);
};
export const disconnect = () => {
  // emit an event to server that we would like to create new room
  console.log('-------------------disconnect---------------', socket);
  socket.emit('join-room');
};
export const exitRoom = () => {
  console.log('--------------------exit-room----------------', socket);
  socket.emit('exit-room');
};

export default EozPage;
