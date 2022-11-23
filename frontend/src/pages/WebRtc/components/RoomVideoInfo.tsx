import React from 'react';

// style
import { WaitingRoomVideoBox } from '../../../styles/WebRtc/WebRtcStyle';

type RoomVideoInfoProps = {
  setVideoId: (value: string) => void;
  videoId: string | null;
};

const RoomVideoInfo = ({ setVideoId, videoId }: RoomVideoInfoProps) => {
  if (videoId === null) {
    return (
      <WaitingRoomVideoBox>
        <p>videoId</p>
        <input onChange={(e) => setVideoId(e.target.value)} />
      </WaitingRoomVideoBox>
    );
  } else {
    return (
      <WaitingRoomVideoBox>
        <p>videoId</p>
      </WaitingRoomVideoBox>
    );
  }
};

export default RoomVideoInfo;
