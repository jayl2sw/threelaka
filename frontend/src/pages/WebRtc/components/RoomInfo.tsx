import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';

import { guildActions } from '../../../features/guild/guild-slice';

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
  const dispatch = useAppDispatch();

  const { isOpenModal, onClickModal } = useModal();
  const { isOpenRoomModal, onClickRoomModal } = useRoomModal();
  const [videoId, setVideoId] = useState<string>('');
  const [learningRecordId, setLearningRecordId] = useState<string>('');

  let roomInfo = guildInfo.rooms[roomNumber - 1];

  // useEffect(() => {
  //   console.log('roomInfo 내의 videoId:', videoId);
  //   console.log('roomInfo내의 roomInfo:', roomInfo);
  // }, [videoId]);

  // 완료한 영상 정보

  const completeTaskLst = useAppSelector(
    (state) => state.guild.completedTaskList
  );

  console.log('completeTaskLst----', completeTaskLst);

  return (
    <div>
      {roomInfo && (
        <div>
          <RoomVideoInfo
            setVideoId={setVideoId}
            videoId={roomInfo.videoId}
            completeTaskLst={completeTaskLst}
            roomNumber={roomNumber}
          />
          <WaitingRoomBottom>
            <RoomUserInfo connectedUsers={roomInfo.connectedUsers} />
            <PickEssay
              roomInfo={roomInfo}
              setLearningRecordId={setLearningRecordId}
              localStream={localStream}
              guildId={guildInfo.guildId}
              onClickModal={onClickModal}
              onClickRoomModal={onClickRoomModal}
            />
          </WaitingRoomBottom>

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
