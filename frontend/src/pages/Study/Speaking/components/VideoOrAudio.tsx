import React from 'react';
import { VideoOrAudioPick } from '../../../../styles/Speaking/SpeakingStyle';

const VideoOrAudio = () => {
  return (
    <VideoOrAudioPick>
      <button>발음 연습</button>
      <button>실전 녹화</button>
      <button>실전 녹음 </button>
    </VideoOrAudioPick>
  );
};

export default VideoOrAudio;
