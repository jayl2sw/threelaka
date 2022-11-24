import React, { useEffect, useState } from 'react';
import RoomEssay from './RoomEssay';
import RoomEssayBtn from './RoomEssayBtn';

import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { writingActions } from '../../../features/writing/writing-slice';

import {
  UserEssayContainer,
  EssayPickBtnContainer,
} from '../../../styles/WebRtc/WebRtcStyle';

type RoomEssaysProps = {
  connectedUsers: any;
};

const RoomEssays = ({ connectedUsers }: RoomEssaysProps) => {
  const dispatch = useAppDispatch();

  const [pickedUser, setPickedUser] = useState<string>('');
  const [pickedLearningRecord, setPickedLearningRecord] = useState<number>(0);

  const handleGetPickedEssay = (learningRecordId: number) => {
    dispatch(writingActions.getEssayStart(learningRecordId));
  };

  const pickedEssay = useAppSelector((state) => state.write.essay);

  return (
    <UserEssayContainer>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        {connectedUsers.map((user: any, idx: number) => {
          return (
            <>
              <RoomEssayBtn
                key={idx}
                nickname={user.nickname}
                learningRecordId={user.learningRecordId}
                pickedUser={pickedUser}
                setPickedUser={setPickedUser}
                setPickedLearningRecord={setPickedLearningRecord}
              />
            </>
          );
        })}
      </div>
      <div>
        <RoomEssay
          pickedLearningRecord={pickedLearningRecord}
          pickedEssay={pickedEssay}
        />
      </div>
    </UserEssayContainer>
  );
};

export default RoomEssays;
