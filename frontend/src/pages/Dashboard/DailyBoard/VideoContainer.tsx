import React, { useEffect } from 'react';
import RecentVideos from './RecentVideos';
import CompletedVideos from './CompletedVideos';
import { VideoBlock } from '../../../styles/DashBoard/DashBoardStyle';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { useRef, useState } from 'react';
const VideoContainer = () => {
  const recentVideoBlock = useRef<HTMLDivElement>(null);
  const completedVideoBlock = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<Boolean>(true);
  const AddHide = () => {
    console.log(recentVideoBlock.current);
    if (recentVideoBlock.current !== null) {
      console.log('얍얍');
      recentVideoBlock.current.classList.add('hide');
    }
  };
  //초기값은 true 로서 최근공부한영상
  const handleMode = () => {
    setMode(!mode);
  };

  return (
    <VideoBlock>
      <div style={{ display: 'flex' }}>
        {mode ? <div>최근 공부한 영상</div> : <div>공부 완료한 영상</div>}
        <div className="arrowBox">
          <IoIosArrowBack
            style={{ fontSize: '2vmin', display: 'inline' }}
            onClick={handleMode}
          ></IoIosArrowBack>
          <IoIosArrowForward
            style={{ fontSize: '2vmin', display: 'inline' }}
            onClick={handleMode}
          ></IoIosArrowForward>
        </div>
      </div>

      {mode ? (
        <RecentVideos recentVideoBlock={recentVideoBlock}></RecentVideos>
      ) : (
        <CompletedVideos
          completedVideoBlock={completedVideoBlock}
        ></CompletedVideos>
      )}
    </VideoBlock>
  );
};

export default VideoContainer;
