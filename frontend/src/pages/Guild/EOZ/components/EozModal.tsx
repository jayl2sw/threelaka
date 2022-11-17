import React, { useState } from 'react';
import { createRoom, joinRoom, exitRoom } from '../EozPage';
import EozRoom from './EozRoom';

import {
  EozModalContainer,
  EozRoomBlock,
  EozBtn,
} from '../../../../styles/Guild/GuildEozStyle';
import { ModalBackdrop } from '../../../../styles/DashBoard/DashBoardStyle';

const videoId = 'asoiharas';
const learningRecordId = 254;

type EnterRoomModalType = {
  onClickModal: () => void;
  isOpenModal: Boolean;
  roomNumber: number;
  guildId: number;
  roomInfo: {
    roomNumber: number;
    videoId: string | null;
    connectedUsers: never[];
  };
  localStream: any;
};

const EozModal = (props: EnterRoomModalType) => {
  const {
    onClickModal,
    isOpenModal,
    roomNumber,
    guildId,
    roomInfo,
    localStream,
  } = props;
  const [videoId, setVideoId] = useState<string>('');
  const [learningRecordid, setLearningRecordId] = useState<string>('');
  const [startEoz, setStartEoz] = useState<boolean>(false);

  // 입력 받기
  const onChangeVideoId = (event: any) => {
    setVideoId(event.target.value);
  };

  const onChangeRecordId = (event: any) => {
    setLearningRecordId(event.target.value);
  };
  if (startEoz) {
    return (
      <EozRoomBlock>
        <EozRoom
          isOpenModal={isOpenModal}
          onClickModal={onClickModal}
          roomNumber={roomNumber}
          guildId={guildId}
          roomInfo={roomInfo}
        />
      </EozRoomBlock>
    );
  } else {
    return (
      <ModalBackdrop>
        <EozModalContainer>
          {roomInfo.videoId === null && (
            <div>
              <p>학습 영상을 정해주세요</p>
              <input
                type="text"
                onChange={onChangeVideoId}
                value={videoId}
                required
              />
            </div>
          )}
          <p>학습 기록을 골라주세요</p>
          <input
            type="text"
            onChange={onChangeRecordId}
            value={learningRecordid}
            required
          />
          <EozBtn
            widthSize="10vw"
            heightSize="3.5vh"
            fontColor="white"
            backgroundColor="blue"
            onClick={() => {
              JoinRoomhandler(
                roomInfo,
                roomNumber,
                guildId,
                videoId,
                learningRecordId
              );
              setStartEoz(true);
            }}
          >
            입장하기
          </EozBtn>
          <EozBtn
            widthSize="10vw"
            heightSize="3.5vh"
            fontColor="white"
            backgroundColor="grey"
            onClick={onClickModal}
          >
            돌아가기
          </EozBtn>
        </EozModalContainer>
      </ModalBackdrop>
    );
  }
};

const JoinRoomhandler = (
  roomInfo: {
    roomNumber: number;
    videoId: string | null;
    connectedUsers: never[];
  },
  roomNumber: number,
  guildId: number,
  videoId: string,
  learningRecordId: number
) => {
  if (roomInfo) {
    if (roomInfo.connectedUsers.length === 0) {
      createRoom(roomNumber, guildId, videoId, learningRecordId);
    } else {
      joinRoom(roomNumber, guildId, learningRecordId);
    }
  } else {
    createRoom(roomNumber, guildId, videoId, learningRecordId);
  }
};

export default EozModal;
