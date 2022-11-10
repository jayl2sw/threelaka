import React from 'react';
import RecentVideos from './RecentVideos';
import { VideoBlock } from '../../../styles/DashBoard/DashBoardStyle';
const VideoContainer = () => {
  return (
    <VideoBlock>
      <RecentVideos></RecentVideos>
    </VideoBlock>
  );
};

export default VideoContainer;
