import React, { useEffect, useState } from 'react';
import useModal from '../../../utils/useModal';
import useRoomModal from '../../../utils/useRoomModal';

import Room from './Room';
import RoomVideoInfo from './RoomVideoInfo';
import RoomUserInfo from './RoomUserInfo';
import PickEssay from './PickEssay';

// style
import {
  RoomModalContainer,
  WaitingRoomBottom,
} from '../../../styles/WebRtc/WebRtcStyle';

interface RoomInfoProps {
  messages: any;
  localStream: any;
  guildInfo: any;
  roomNumber: number;
}

const RoomInfo = ({
  messages,
  localStream,
  guildInfo,
  roomNumber,
}: RoomInfoProps) => {
  const { isOpenModal, onClickModal } = useModal();
  const { isOpenRoomModal, onClickRoomModal } = useRoomModal();
  const [videoId, setVideoId] = useState('');
  const [learningRecordId, setLearningRecordId] = useState('');

  let roomInfo = guildInfo.rooms[roomNumber - 1];

  useEffect(() => {
    console.log('roomInfo 내의 videoId:', videoId);
    console.log('roomInfo내의 roomInfo:', roomInfo);
  }, [videoId]);

  return (
    <div>
      {roomInfo && (
        <div>
          <RoomVideoInfo setVideoId={setVideoId} videoId={roomInfo.videoId} />
          <WaitingRoomBottom>
            <RoomUserInfo users={roomInfo.connectedUsers} />
            <PickEssay
              roomInfo={roomInfo}
              setLearningRecordId={setLearningRecordId}
              localStream={localStream}
              guildId={guildInfo.guildId}
              onClickModal={onClickModal}
              onClickRoomModal={onClickRoomModal}
            />
          </WaitingRoomBottom>
          {/* <p>videoId: {roomInfo.videoId}</p>
          <p>{roomInfo.roomNumber}</p>
          <p>현재 접속한 사람들</p>
          <p>{JSON.stringify(roomInfo)}</p> */}

          {isOpenRoomModal && (
            <RoomModalContainer>
              <Room
                messages={messages}
                videoId={videoId}
                learningRecordId={learningRecordId}
                roomInfo={roomInfo}
                guildId={guildInfo.guildId}
                onClickRoomModal={onClickRoomModal}
                isOpenRoomModal={isOpenRoomModal}
              />
            </RoomModalContainer>
          )}
        </div>
      )}
    </div>
  );
};

export default RoomInfo;

{
  /* <div>
      {roomInfo && (
        <div>
          <p>videoId: {roomInfo.videoId}</p>
          <p>roomNumber: {roomInfo.roomNumber}</p>
          <p>RoomInfo 드리겠습니다~</p>
          <p>{JSON.stringify(roomInfo)}</p>

          <div>
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
              }}
            >
              입장하기
            </button>
            {isOpenModal && (
              <RoomModalContainer>
                <Room
                  messages={messages}
                  videoId={videoId}
                  learningRecordId={learningRecordId}
                  roomInfo={roomInfo}
                  guildId={roomInfo.guildId}
                  onClickModal={onClickModal}
                />
              </RoomModalContainer>
            )}
          </div>
        </div>
      )}
    </div> */
}
