import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../../utils/hooks';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import EnglishOnlyZone from './components/EnglishOnlyZone';

// style
import '../../../styles/Guild/EozVideoStyle.css';

// 길드 아이디 type 확정짓기 User에는 string으로 들어오긴함 ***
type EozPageProps = {
  // guildId: number;
  // nickname: string;
  localStream: any;
  setLocalStream: any;
};

// EOZ 중 최상단 (MyGuild에서 EOZ 부분 전체)
const EozPage = (
  // guildId: number,
  // nickname: string,
  localStream: any,
  setLocalStream: any
) => {
  // EOZ에 필요한 데이터
  const guildId = useAppSelector((state) => state.guild.myGuildInfo.guildId);
  let nickname = useAppSelector((state) => state.auth.currentUser?.nickname);
  nickname = nickname !== undefined ? nickname : '';

  const [bool, setBool] = useState(false);

  useEffect(() => {
    connectWithSocketIOServer(); // Socket통신 시작
    if (nickname !== undefined) {
      setBool(joinGuildChannel(nickname, guildId));
    }
    return () => {};
  }, []);

  // 길드에 한 명이라도 접속 시 방 3개짜리 GuildInfo 정보를 만들어 둔다
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

  // Guild/Room에 접속한 사람 발생 시 guildInfo 변경 감지
  useEffect(() => {
    console.log('guildInfo changed:', guildInfo);
  }, [guildInfo]);

  // Socket 통신 시작
  const connectWithSocketIOServer = () => {
    socket = io(SERVER);

    socket.on('connect', () => {
      console.log('successfully connected with socket io server');
      console.log(socket.id);
      // setSocketId(socket.id);
    });

    // Guild에 변경사항 발생 시(유저 입/퇴장 등) 갱신
    socket.on('guild-update', (data: any) => {
      setGuildInfo((prevState) => ({
        ...prevState,
        guildId: data.guild.guildId,
        rooms: data.guild.rooms,
        connectedUsers: data.guild.connectedUsers,
      }));
    });

    // socket = io(SERVER);
    console.log('-----------conn-prepare-------------');
    console.log(socket);
    // 새로운 유저가 들어왔을 경우, 유저들끼리  socket 연결 준비
    socket.on('conn-prepare', (data: any) => {
      const { connUserSocketId } = data;
      console.log('====================prepare 시작===================');
      prepareNewPeerConnection(connUserSocketId, false);

      // inform the user which just join the room that we have prepared for incoming connection
      // 새로 들어올 유저에게 준비 됐다고 알려주기
      socket.emit('conn-init', { connUserSocketId: connUserSocketId });
    });

    socket.on('conn-signal', (data: any) => {
      handleSignalingData(data);
    });

    // 새로운 유저와 연결하기
    socket.on('conn-init', (data: any) => {
      console.log('====================init 시작===================');
      const { connUserSocketId } = data;
      prepareNewPeerConnection(connUserSocketId, true);
    });
  };

  return (
    <div>
      {bool && (
        <EnglishOnlyZone
          guildInfo={guildInfo}
          nickname={nickname}
          localStream={localStream}
        />
      )}
    </div>
  );
};

/////////////////////////////////////////
////////////// 소켓 통신용 ///////////////
///////////////////////////////////////

const SERVER = 'http://localhost:5002';

let socket: any = null;

// 누군가 길드에 들어왔다!
export const joinGuildChannel = (nickname: string, guildId: number) => {
  const data = {
    nickname,
    guildId,
  };
  console.log('socket-------join-guild-channel---------11111111', socket);
  socket.emit('join-guild-channel', data);
  return true;
};

// 아무도 없는 방에 host로 입장
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

// 누군가 입장한 방에 guest로 입장
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

// 연결 끊기
export const disconnect = () => {
  // emit an event to server that we would like to create new room
  console.log('-------------------disconnect---------------', socket);
  socket.emit('join-room');
};

// 방에서 나가기
export const exitRoom = () => {
  console.log('--------------------exit-room----------------', socket);
  socket.emit('exit-room');
};

////////////////////////////////////////
////////////// webRTC 관련 //////////////
////////////////////////////////////////
let localStream: any;

// join-room 대체 (입장 시 기본 설정)
const defaultConstraint = {
  audio: true,
  video: true,
};

// 프리뷰 받고, 방에 집어 넣어서 연결하기
export const getLocalPreviewAndInitRoomConnection = (
  // roomInfo type은 webRTCHandler 12번째 줄 참고하세요 ***
  roomInfo: any,
  roomNumber: number,
  guildId: number,
  videoId: string,
  learningRecordId: number
) => {
  navigator.mediaDevices
    .getUserMedia(defaultConstraint)
    .then((stream) => {
      localStream = stream;
      showLocalVideoPreview(localStream);

      if (roomInfo) {
        console.log('225번째줄 =============', roomInfo);
        if (roomInfo.connectedUsers.length === 0) {
          createRoom(roomNumber, guildId, videoId, learningRecordId);
        } else {
          joinRoom(roomNumber, guildId, learningRecordId);
        }
      } else {
        createRoom(roomNumber, guildId, videoId, learningRecordId);
      }
    })
    .catch((err) => {
      console.log(
        'error occurred when trying to get an access to local stream'
      );
      console.log(err);
    });
};

// ///////////////////////////////////////
// ////////////// 프리뷰 파트 //////////////
// //////////////////////////////////////

const showLocalVideoPreview = (stream: any) => {
  // local 프리뷰 바닐라 스크립트로 짜야해서 index.html에 div만들고 index.css에 css적용해야함
  // 근데 모달 뒤에 나와요 어캄?
  const videosContainer = document.getElementById('RTCroom');
  if (videosContainer !== null) {
    videosContainer.classList.add('videos_portal_styles');
  }
  const videoContainer = document.createElement('div');
  videoContainer.classList.add('video_track_container');
  const videoElement = document.createElement('video');
  videoElement.autoplay = true;
  videoElement.muted = true;
  videoElement.srcObject = stream;

  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };

  videoContainer.appendChild(videoElement);
  if (videosContainer !== null) {
    videosContainer.appendChild(videoContainer);
  }
};

type PeersType = {
  [key: string]: {
    initiator: boolean;
    config: any /* Type of config */;
    stream: any /* Type of stream */;
  };
};

let peers: any = {};
let streams: any = [];

const getConfiguration = () => {
  return {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302',
      },
    ],
  };
};

export const prepareNewPeerConnection = (
  connUserSocketId: string,
  isInitiator: boolean
) => {
  const configuration = getConfiguration();

  console.log('==============localstream ============', localStream);

  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream,
  });

  peers[connUserSocketId].on('signal', (data: any) => {
    console.log('시그널 출발');
    // webRTC offer, webRTC Answer
    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };

    signalPeerData(signalData);
  });

  peers[connUserSocketId].on('stream', (stream: any) => {
    console.log('new stream came');

    addStream(stream, connUserSocketId);
    streams = [...streams, stream];
  });
};

const addStream = (stream: any, connUserSocketId: string) => {
  // display incoming stream 다른 사람들 스트림 보여줌
  const videosContainer = document.getElementById('RTCroom');
  const videoContainer = document.createElement('div');
  videoContainer.id = connUserSocketId;

  videoContainer.classList.add('video_track_container');
  const videoElement = document.createElement('video');
  videoElement.autoplay = true;
  videoElement.srcObject = stream;
  videoElement.id = `${connUserSocketId}-video`;

  videoElement.onloadedmetadata = () => {
    videoElement.play();
  };
  videoContainer.appendChild(videoElement);

  videoContainer.style.position = 'static';
  if (videosContainer !== null) {
    videosContainer.appendChild(videoContainer);
  }
};

export const signalPeerData = (data: any) => {
  socket.emit('conn-signal', data);
};

const handleSignalingData = (data: any) => {
  // add signaling data to peer connection
  console.log('받은 시그널 상대에게 돌려보내줌');
  peers[data.connUserSocketId].signal(data.signal);
};

export default EozPage;
