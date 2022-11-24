import React from 'react';
import YouTube from 'react-youtube';

import {
  EozRoomStudyVideoContainer,
  EssayPickBtn,
} from '../../../styles/WebRtc/WebRtcStyle';

const RoomStudyVideo = (videoId: any) => {
  // YouTube 비디오 설정
  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0,
    },
  };
  console.log('RoomStudy---------', videoId);

  return (
    <EozRoomStudyVideoContainer>
      <EssayPickBtn style={{ width: '12vw', fontSize: '2.1vmin', padding: 0 }}>
        오늘 학습할 영상
      </EssayPickBtn>
      <YouTube
        videoId={videoId.videoId}
        opts={opts}
        style={{ width: '36vw', height: '43vh' }}
      />
    </EozRoomStudyVideoContainer>
  );
};

export default RoomStudyVideo;
