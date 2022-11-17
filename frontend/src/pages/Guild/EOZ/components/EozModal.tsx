import React, { useEffect, useState } from 'react';
import * as wss from '../../../../utils/wss';
import * as webrtc from '../../../../utils/webRTCHandler';
import EozRoom from './EozRoom';

import {
  EozModalContainer,
  EozRoomBlock,
  EozBtn,
} from '../../../../styles/Guild/GuildEozStyle';
import { ModalBackdrop } from '../../../../styles/DashBoard/DashBoardStyle';

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
};

const EozModal = (props: EnterRoomModalType) => {
  const { onClickModal, isOpenModal, roomNumber, guildId, roomInfo } = props;
  console.log('EozModalProps:', guildId);
  const [videoId, setVideoId] = useState<string>('');
  const [learningRecordId, setLearningRecordId] = useState<number>(0);
  const [startEoz, setStartEoz] = useState<boolean>(false);

  // 입력 받기
  const onChangeVideoId = (event: any) => {
    setVideoId(event.target.value);
  };

  const onChangeRecordId = (event: any) => {
    setLearningRecordId(event.target.value);
  };

  useEffect(() => {
    if (startEoz) {
      webrtc.getLocalPreviewAndInitRoomConnection(
        roomInfo,
        guildId,
        learningRecordId
      );
    }
  }, [startEoz]);
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
            value={learningRecordId}
            required
          />
          <EozBtn
            widthSize="10vw"
            heightSize="3.5vh"
            fontColor="white"
            backgroundColor="blue"
            onClick={() => {
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

export default EozModal;
