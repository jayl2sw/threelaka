import React from 'react';
import VideoContainer from './VideoContainer';
import GraphContainer from './GraphContainer';
import Calendar from './Calendar';
const DailyBoard = () => {
  return (
    <div>
      <VideoContainer></VideoContainer>
      <GraphContainer></GraphContainer>
      {/* <Calendar></Calendar> */}
    </div>
  );
};

export default DailyBoard;
