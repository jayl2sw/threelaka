import React from 'react';
import * as wss from './wss';
let localStream;

// join-room 대체
const defaultConstraint = {
  audio: true,
  video: true,
};

export const getLocalPreviewAndInitRoomConnection = (
  roomInfo: {
    roomNumber: number;
    videoId: string;
    connectedUsers: never[];
  },
  guildId: number,
  learningRecordId: number
) => {
  const { roomNumber, videoId } = roomInfo;
  navigator.mediaDevices
    .getUserMedia(defaultConstraint)
    .then((stream) => {
      localStream = stream;
      showLocalVideoPreview(localStream);

      if (roomInfo) {
        if (roomInfo.connectedUsers.length === 0) {
          wss.createRoom(roomNumber, guildId, videoId, learningRecordId);
        } else {
          wss.joinRoom(roomNumber, guildId, learningRecordId);
        }
      } else {
        wss.createRoom(roomNumber, guildId, videoId, learningRecordId);
      }
    })
    .catch((err) => {
      console.log(
        'error occurred when trying to get an access to local stream'
      );
      console.log(err);
    });
};

const showLocalVideoPreview = (stream: any) => {
  // local 프리뷰 바닐라 스크립트로 짜야해서 index.html에 div만들고 index.css에 css적용해야함
  // 근데 모달 뒤에 나와요 어캄?
  const videosContainer = document.getElementById('RTCroom');
  videosContainer?.classList.add('videos_portal_styles');
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
  videosContainer?.appendChild(videoContainer);
};
