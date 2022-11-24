import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { writingActions } from '../../../features/writing/writing-slice';

import {
  EssayPickBtn,
  RoomEssayContainer,
  RoomEmptyEssayContainer,
} from '../../../styles/WebRtc/WebRtcStyle';

type UserEssayPick = {
  // nickname: string;
  // pickedUser: string;
  // learningRecordId: number;
  // setPickedUser: (value: string) => void;
  pickedLearningRecord: number;
  pickedEssay: string;
};

const RoomEssay = ({ pickedEssay, pickedLearningRecord }: UserEssayPick) => {
  return (
    <div>
      {pickedLearningRecord ? (
        <RoomEssayContainer>{pickedEssay}</RoomEssayContainer>
      ) : (
        <RoomEmptyEssayContainer>
          <img
            src="https://threelaka.s3.ap-northeast-2.amazonaws.com/white.png"
            alt="blue bear logo"
            style={{
              width: '10vmin',
              marginBottom: '2vh',
            }}
          />
          <p>길드원 닉네임을 선택하면 에세이가 나와요!</p>
        </RoomEmptyEssayContainer>
      )}
    </div>
  );
};

export default RoomEssay;
