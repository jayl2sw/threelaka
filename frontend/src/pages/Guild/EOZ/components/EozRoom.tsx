import React, { useState } from 'react';
import { exitRoom } from '../EozPage';
import StreamVideo from './StreamVideo';
import { getLocalPreviewAndInitRoomConnection } from '../EozPage';

//style
import UserEssayBtn from './UserEssayBtn';
import {
  EozBtn,
  VideosContainer,
  RoomStudyDataContainer,
  EssayPickBtnContainer,
} from '../../../../styles/Guild/GuildEozStyle';

type EozRoomProps = {
  onClickModal: () => void;
  isOpenModal: Boolean;
  roomNumber: number;
  guildId: number;
  roomInfo: any;
  learningRecordId: number;
};

const EozRoom = (props: EozRoomProps) => {
  const { onClickModal, roomNumber, guildId, roomInfo, learningRecordId } =
    props;
  const [essayNumber, setEssayNumber] = useState<number>(1);
  const [selectedMember, setSelectedMember] = useState<string>('');

  const test = () => {
    getLocalPreviewAndInitRoomConnection(
      roomInfo,
      roomInfo.roomNumber,
      guildId,
      roomInfo.videoId,
      learningRecordId
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        border: '5px solid red',
      }}
    >
      <div>
        <VideosContainer>
          <StreamVideo />
        </VideosContainer>
        <div>
          <RoomStudyDataContainer>
            <EssayPickBtnContainer>
              <UserEssayBtn
                nickname={'하나둘셋넷다섯여섯'}
                learningRecordId={123}
                pickedUser={'하나둘'}
              />
            </EssayPickBtnContainer>
            <div>에세이</div>
          </RoomStudyDataContainer>
        </div>
      </div>

      <EozBtn
        widthSize="10vw"
        heightSize="3.5vh"
        fontColor="white"
        backgroundColor="red"
        onClick={() => {
          exitRoom();
          onClickModal();
        }}
      >
        나가기
      </EozBtn>
    </div>
  );
};

export default EozRoom;
