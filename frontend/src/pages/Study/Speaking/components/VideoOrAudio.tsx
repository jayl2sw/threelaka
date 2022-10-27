import React from 'react';
import { VideoOrAudioPick } from '../../../../styles/Speaking/SpeakingStyle';

const VideoOrAudio = () => {
  return (
    <VideoOrAudioPick>
      <button>영상</button>
      <button>음성</button>
    </VideoOrAudioPick>
  );
};

export default VideoOrAudio;
