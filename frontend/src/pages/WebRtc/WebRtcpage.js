import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';

import { guildActions } from '../../features/guild/guild-slice';
import { authActions } from '../../features/auth/authSlice';
import WaitingRoom from './components/WaitingRoom';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import axios from 'axios';

import '../../styles/WebRtc/WebRtc.css';

let messages = [];
const guildId = 2;

const WebRtcPage = () => {
  const dispatch = useAppDispatch();

  const nickname = useAppSelector((state) => state.auth.currentUser?.nickname);

  const [bool, setBool] = useState(false);

  useEffect(() => {
    connectWithSocketIOServer();
    setBool(joinGuildChannel(nickname, guildId));
    // 완료한 과제 정보 미리 dispatch
    dispatch(authActions.fetchUser());
    dispatch(guildActions.getProgressTask());
    return () => {};
  }, []);

  //   useEffect(() => {}, [guildInfo]);
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

    socket.on('guild-update', (data) => {
      setGuildInfo((prevState) => ({
        ...prevState,
        guildId: data.guild.guildId,
        rooms: data.guild.rooms,
        connectedUsers: data.guild.connectedUsers,
      }));
    });

    socket.on('conn-prepare', (data) => {
      const { connUserSocketId } = data;
      console.log('====================prepare 받음===================');
      prepareNewPeerConnection(connUserSocketId, false);

      // inform the user which just join the room that we have prepared for incoming connection
      console.log(5);
      socket.emit('conn-init', { connUserSocketId: connUserSocketId });
    });

    socket.on('conn-signal', (data) => {
      handleSignalingData(data);
    });

    socket.on('user-disconnected', (data) => {
      removePeerConnection(data);
    });

    socket.on('conn-init', (data) => {
      console.log('====================init 시작===================');
      const { connUserSocketId } = data;
      prepareNewPeerConnection(connUserSocketId, true);
    });
  };

  return (
    <div>
      {bool && nickname && (
        <WaitingRoom
          messages={messages}
          guildInfo={guildInfo}
          localStream={localStream}
        />
      )}
    </div>
  );
};

// export const SERVER = 'http://localhost:5002';
export const SERVER = 'https://3laka.com/socket_api/';

let socket = null;
// const nickname = '테스트계정';
export const joinGuildChannel = (nickname, guildId) => {
  const data = {
    nickname,
    guildId,
  };
  console.log('socket---------------------------11111111', socket);
  socket.emit('join-guild-channel', data);
  return true;
};
export const createRoom = (roomNumber, guildId, videoId, learningRecordId) => {
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
export const joinRoom = (roomNumber, guildId, learningRecordId) => {
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

let localStream;

// join-room 대체
const defaultConstraint = {
  audio: true,
  video: true,
};

export const getLocalPreviewAndInitRoomConnection = async (
  roomInfo,
  roomNumber,
  guildId,
  videoId,
  learningRecordId
) => {
  await fetchTURNCredentials();
  await fetchTURNCredentials();

  navigator.mediaDevices
    .getUserMedia(defaultConstraint)
    .then((stream) => {
      localStream = stream;
      showLocalVideoPreview(localStream);

      if (roomInfo) {
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

//////////////////////////////////////////UI///////////////////////////////////////////////////////////////
const showLocalVideoPreview = (stream) => {
  const videosContainer = document.getElementById('RTCroom');
  videosContainer.classList.add('videos_portal_styles');
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
  videosContainer.appendChild(videoContainer);
};

let peers = {};
let streams = {};

export const removePeerConnection = (data) => {
  const { socketId } = data;
  const videoContainer = document.getElementById(socketId);
  const videoEl = document.getElementById(`${socketId}-video`);

  if (videoContainer && videoEl) {
    const tracks = videoEl.srcObject.getTracks();

    tracks.forEach((t) => t.stop());

    videoEl.srcObject = null;
    videoContainer.removeChild(videoEl);

    videoContainer.parentNode.removeChild(videoContainer);

    if (peers[socketId]) {
      peers[socketId].destroy();
    }
    delete peers[socketId];
  }
};

////////////////////////////turn///////////////////////////////////////
let TURNIceServers = null;

export const fetchTURNCredentials = async () => {
  const responseData = await getTURNCredentials();
  console.log('responseDAta', responseData.token);
  if (responseData.token?.iceServers) {
    TURNIceServers = responseData.token.iceServers;
  }

  return TURNIceServers;
};

export const getTurnIceServers = () => {
  return TURNIceServers;
};

// const getConfiguration = () => {
//   return {
//     iceServers: [
//       {
//         urls: 'stun:stun.l.google.com:19302'
//       }
//     ]
//   }
// }

const getConfiguration = () => {
  const turnIceServers = getTurnIceServers();

  if (turnIceServers) {
    return {
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
        ...turnIceServers,
      ],
    };
  } else {
    console.warn('Using only STUN server');
    return {
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    };
  }
};

const messengerChanel = 'messenger';

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const configuration = getConfiguration();
  console.log(1);
  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream,
    channelName: messengerChanel,
  });
  console.log(2);
  peers[connUserSocketId].on('signal', (data) => {
    console.log('start signal');
    // webRTC offer, webRTC Answer
    const signalData = {
      signal: data,
      connUserSocketId: connUserSocketId,
    };

    signalPeerData(signalData);
  });

  peers[connUserSocketId].on('stream', (stream) => {
    console.log('new stream came');

    addStream(stream, connUserSocketId);
    streams = [...streams, stream];
  });

  // peers[connUserSocketId].on("data", (data) => {
  //   const messageData = JSON.parse(data);
  //   appendNewMessage(messageData);
  // });
};

const addStream = (stream, connUserSocketId) => {
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
  videosContainer.appendChild(videoContainer);
};

export const signalPeerData = (data) => {
  socket.emit('conn-signal', data);
};

export const handleSignalingData = (data) => {
  // add signaling data to peer connection
  console.log('받은 시그널 상대에게 돌려보내줌');
  peers[data.connUserSocketId].signal(data.signal);
};

////////////////////// Messages /////////////////////////////

// 들어온 메시지 저장하기
const appendNewMessage = (messageData) => {
  messages = [...messages, messageData];
};

// 메시지 전송하기
// https://www.udemy.com/course/webrtc-practical-course-create-video-chat-group-call-app/learn/lecture/27970252#content
export const sendMessageUsingDataChannel = (messageContent) => {
  const localMessageData = {
    content: messageContent,
    // nickname,
    messageCreatedByMe: true,
  };

  appendNewMessage(localMessageData);

  const messageData = {
    content: messageContent,
    // nickname,
  };
  const stringifiedMessageData = JSON.stringify(messageData);
  for (let socketId in peers) {
    peers[socketId].send(stringifiedMessageData);
  }
};

const serverApi = 'http://localhost:5002/api';
export const getTURNCredentials = async () => {
  const response = await axios.get(`${serverApi}/get-turn-credentials`);
  return response.data;
};

export default WebRtcPage;
