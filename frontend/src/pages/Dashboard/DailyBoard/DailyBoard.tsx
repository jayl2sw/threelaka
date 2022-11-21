import React from 'react';
import VideoContainer from './VideoContainer';
import GraphContainer from './GraphContainer';
import Calendar from './Calendar';
import { DailyBoardContainer } from '../../../styles/DashBoard/DashBoardStyle';
import StudyHistoryContainer from './StudyHistoryContainer';

interface IDailyBoardProps {
  setModalToggleVideoId: (nextVideoId: string) => void;
}
const DailyBoard = ({ setModalToggleVideoId }: IDailyBoardProps) => {
  return (
    <DailyBoardContainer>
      <VideoContainer
        setModalToggleVideoId={setModalToggleVideoId}
      ></VideoContainer>
      <Calendar></Calendar>
      <GraphContainer></GraphContainer>
      <StudyHistoryContainer></StudyHistoryContainer>
    </DailyBoardContainer>
  );
};

export default DailyBoard;
