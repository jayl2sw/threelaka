import React, { useState } from 'react';
import { EozBtn } from '../../../../styles/Guild/GuildEozStyle';
import { createRoom, joinRoom, exitRoom } from '../EozPage';
import useModal from '../../../../utils/useModal';
import { useRoomModal, useOverlay } from '../../../../utils/eozRoomUtils';
import EozModal from './EozModal';
import JoinRoomModal from './JoinRoomModal';
import RoomModal from './RoomModal';
import MembersList from './MembersList';
import TodayVideo from './TodayVideo';

// style
import {
  EozRoomInfoContainer,
  EozMainContainer,
  EozModalContainer,
} from '../../../../styles/Guild/GuildEozStyle';

type Room = {
  roomNumber: number;
  videoId: string | null;
  connectedUsers: never[];
};

type RoomInfoProps = {
  guildInfo: {
    guildId: number;
    rooms: Room[];
    connectedUsers: never[];
  };
  roomNumber: number;
  localStream: any;
};

const EozRoomInfo = (props: RoomInfoProps) => {
  const { guildInfo, roomNumber, localStream } = props;

  const { isOpenModal, onClickModal } = useModal();
  const { isOpenRoomModal, onClickRoomModal } = useRoomModal();
  const [videoId, setVideoId] = useState('');
  const [learningRecordId, setLearningRecordId] = useState<number>(0);

  const guildId = guildInfo.guildId;
  let roomInfo = guildInfo.rooms[roomNumber - 1];

  return (
    <div>
      {roomInfo && (
        <EozMainContainer>
          <>
            <EozRoomInfoContainer>
              <TodayVideo videoId={roomInfo.videoId} />
              <MembersList connectedUsers={roomInfo.connectedUsers} />
            </EozRoomInfoContainer>
            <EozBtn
              widthSize="10vw"
              heightSize="3.5vh"
              fontColor="white"
              backgroundColor="blue"
              onClick={() => {
                onClickModal();
              }}
            >
              EOZ 참여하기
            </EozBtn>
          </>
          {/* {isOpenModal && (
            <EozModal
              isOpenModal={isOpenModal}
              onClickModal={onClickModal}
              guildId={guildId}
              roomInfo={roomInfo}
              localStream={localStream}
              learningRecordId={learningRecordId}
              videoId={videoId}
            />
          )} */}
          {isOpenModal && (
            <EozModal
              isOpenModal={isOpenModal}
              onClickModal={onClickModal}
              guildId={guildId}
              roomInfo={roomInfo}
              localStream={localStream}
              learningRecordId={learningRecordId}
              videoId={videoId}
              guildInfo={guildInfo}
            />
          )}

          {/* {isOpenModal && !isOpenRoomModal && (
            <JoinRoomModal
              roomInfo={roomInfo}
              setVideoId={setVideoId}
              setLearningRecordId={setLearningRecordId}
              localStream={localStream}
              onClickModal={onClickModal}
              onClickRoomModal={onClickRoomModal}
            />
          )}
          {isOpenRoomModal && (
            <RoomModal
              videoId={videoId}
              learningRecordId={learningRecordId}
              roomInfo={roomInfo}
              guildId={guildInfo.guildId}
              onClickRoomModal={onClickRoomModal}
            />
          )} */}
        </EozMainContainer>
      )}
    </div>
  );
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

export default EozRoomInfo;
