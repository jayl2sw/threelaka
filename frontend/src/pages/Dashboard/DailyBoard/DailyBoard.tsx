import React from 'react';
import VideoContainer from './VideoContainer';
import GraphContainer from './GraphContainer';
import Calendar from './Calendar';
import { DailyBoardContainer } from '../../../styles/DashBoard/DashBoardStyle';
const DailyBoard = () => {
  return (
    <DailyBoardContainer>
      <VideoContainer></VideoContainer>
      <Calendar></Calendar>
      <GraphContainer></GraphContainer>
    </DailyBoardContainer>
  );
};

export default DailyBoard;
