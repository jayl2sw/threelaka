import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { writingActions } from '../../../features/writing/writing-slice';

import {
  EssayPickBtn,
  RoomEssayContainer,
  EssayPickBtnContainer,
} from '../../../styles/WebRtc/WebRtcStyle';

type UserEssayPick = {
  nickname: string;
  pickedUser: string;
  learningRecordId: number;
  setPickedUser: (value: string) => void;
  setPickedLearningRecord: (value: number) => void;
};

const RoomEssayBtn = ({
  nickname,
  pickedUser,
  learningRecordId,
  setPickedUser,
  setPickedLearningRecord,
}: UserEssayPick) => {
  const dispatch = useAppDispatch();
  const handleGetPickedEssay = (learningRecordId: number) => {
    dispatch(writingActions.getEssayStart(learningRecordId));
  };

  return (
    <EssayPickBtnContainer>
      <EssayPickBtn
        style={{ opacity: nickname === pickedUser ? '' : '0.5' }}
        onClick={() => {
          setPickedUser(nickname);
          handleGetPickedEssay(learningRecordId);
          setPickedLearningRecord(learningRecordId);
        }}
      >
        {nickname && (
          <>
            {nickname.length < 8 ? nickname : nickname.substring(0, 6) + '...'}
          </>
        )}
      </EssayPickBtn>
    </EssayPickBtnContainer>
  );
};

export default RoomEssayBtn;
