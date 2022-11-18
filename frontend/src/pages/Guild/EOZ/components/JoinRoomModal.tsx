import React from 'react';
import {
  EozModalContainer,
  EozRoomBlock,
  EozBtn,
} from '../../../../styles/Guild/GuildEozStyle';
import { ModalBackdrop } from '../../../../styles/DashBoard/DashBoardStyle';

type JoinRoomModalProps = {
  roomInfo: any;
  setVideoId: any;
  setLearningRecordId: any;
  onClickModal: () => void;
  onClickRoomModal: () => void;
  localStream: any;
};

const JoinRoomModal = (props: JoinRoomModalProps) => {
  const {
    roomInfo,
    setVideoId,
    setLearningRecordId,
    onClickModal,
    onClickRoomModal,
  } = props;
  return (
    <ModalBackdrop>
      <EozModalContainer>
        <div>
          {roomInfo.videoId == null && (
            <div>
              <p>VideoId</p>
              <input onChange={(e) => setVideoId(e.target.value)} />
            </div>
          )}
          <p>learningRecordId</p>
          <input onChange={(e) => setLearningRecordId(e.target.value)} />
        </div>
        <button
          onClick={() => {
            onClickModal();
            onClickRoomModal();
          }}
        >
          입장하기
        </button>
        <button
          onClick={() => {
            onClickModal();
          }}
        >
          나가기
        </button>
      </EozModalContainer>
    </ModalBackdrop>
  );
};

export default JoinRoomModal;
