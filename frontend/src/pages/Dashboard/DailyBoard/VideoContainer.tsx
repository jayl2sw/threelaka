import React from 'react';
import RecentVideos from './RecentVideos';
import CompletedVideos from './CompletedVideos';
import { VideoBlock } from '../../../styles/DashBoard/DashBoardStyle';
import { IoIosArrowBack } from 'react-icons/io';
const VideoContainer = () => {
  return (
    <VideoBlock>
      <IoIosArrowBack
        style={{ fontSize: '5vmin', display: 'inline' }}
      ></IoIosArrowBack>
      <RecentVideos></RecentVideos>
      {/* <CompletedVideos></CompletedVideos> */}
    </VideoBlock>
  );
};

export default VideoContainer;
