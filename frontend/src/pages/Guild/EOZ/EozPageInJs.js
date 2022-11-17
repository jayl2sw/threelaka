import { signalPeerData } from './EozPage';
import Peer from 'simple-peer';

let localStream;

///////////////////////////////////////
////////////// 프리뷰 파트 //////////////
//////////////////////////////////////

export const showLocalVideoPreview = (stream) => {
  // local 프리뷰 바닐라 스크립트로 짜야해서 index.html에 div만들고 index.css에 css적용해야함
  // 근데 모달 뒤에 나와요 어캄?
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

const getConfiguration = () => {
  return {
    iceServers: [
      {
        urls: 'stun:stun.l.google.com:19302',
      },
    ],
  };
};

export const prepareNewPeerConnection = (connUserSocketId, isInitiator) => {
  const configuration = getConfiguration();

  console.log('==============localstream ============', localStream);

  peers[connUserSocketId] = new Peer({
    initiator: isInitiator,
    config: configuration,
    stream: localStream,
  });

  peers[connUserSocketId].on('signal', (data) => {
    console.log('시그널 출발');
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
  if (videosContainer !== null) {
    videosContainer.appendChild(videoContainer);
  }
};

// const signalPeerData = (data) => {
//   socket.emit('conn-signal', data);
// };

export const handleSignalingData = (data) => {
  // add signaling data to peer connection
  console.log('받은 시그널 상대에게 돌려보내줌');
  peers[data.connUserSocketId].signal(data.signal);
};
