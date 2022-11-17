import { guildActions } from './../features/guild/guild-slice';
import io from 'socket.io-client';
import { useAppDispatch, useAppSelector } from './hooks';

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

const DispatchNewGuildInfo = (data: any) => {
  const dispatch = useAppDispatch();
  dispatch(guildActions.putGuildInfo(data));
};

// 받는거
export const connectWithSocketIOServer = () => {
  socket = io(SERVER);

  socket.on('connect', () => {
    console.log('successfully connected with socket io server');
    console.log(socket.id);
    // setSocketId(socket.id);
  });

  socket.on('guild-update', (data: any) => {
    console.log('guild-update socket is on!!!!!!!!!!!!!!!!!!!!!!!!!!');
    console.log('data', data.guild);
    const newGuildInfo = {
      guildId: data.guild.guildId,
      rooms: data.guild.rooms,
      connectedUsers: data.guild.connectedUsers,
    };
    console.log('newGuildInfo', newGuildInfo);
    console.log('----------------------');
    DispatchNewGuildInfo(newGuildInfo);
    console.log('----------------------');
    // let guildInfo = useAppSelector((state) => state.guild.guildInfo);
    // console.log(guildInfo, 'guildInfo');
    // guildInfo = data;
    // const dispatch = useAppDispatch();
    // dispatch(guildActions.putGuildInfo(newGuildInfo));
  });
};
