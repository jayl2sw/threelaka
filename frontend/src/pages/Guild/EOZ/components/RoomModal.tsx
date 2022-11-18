import React, { useEffect, useState } from 'react';
import { exitRoom, getLocalPreviewAndInitRoomConnection } from '../EozPage';
import StreamVideo from './StreamVideo';

// style
import UserEssayBtn from './UserEssayBtn';
import {
  EozRoomBlock,
  RoomStudyDataContainer,
  RoomStudyVideoContainer,
  RoomStudyEssayContainer,
  EssayPickBtnContainer,
  EozBtn,
} from '../../../../styles/Guild/GuildEozStyle';

const RoomModal = (
  roomInfo: any,
  guildId: number,
  videoId: string,
  learningRecordId: number,
  guildInfo: any,
  onClickModal: () => void
) => {
  const test = () => {
    getLocalPreviewAndInitRoomConnection(
      roomInfo,
      roomInfo.roomNumber,
      guildId,
      videoId,
      learningRecordId
    );
  };
  useEffect(() => {
    test();
    return () => {
      exitRoom();
    };
  }, []);

  const connectedUsers = roomInfo.connectedUsers;
  const [pickedUser, setPickedUser] = useState<string>('');
  const [userList, setUserList] = useState([]);

  return (
    <EozRoomBlock>
      <div style={{ width: '20vw' }}>
        <StreamVideo />
      </div>
      <RoomStudyDataContainer>
        <RoomStudyVideoContainer>동영상을 넣을게요</RoomStudyVideoContainer>
        <RoomStudyEssayContainer>
          <EssayPickBtnContainer>
            {userList &&
              userList.map((userData: any, i: number) => {
                return (
                  <UserEssayBtn
                    nickname={userData.nickname}
                    learningRecordId={userData.learningRecordId}
                    pickedUser={pickedUser}
                    key={i}
                  />
                );
              })}
          </EssayPickBtnContainer>
          <div>에세이</div>
        </RoomStudyEssayContainer>
      </RoomStudyDataContainer>

      <EozBtn
        widthSize="8vw"
        heightSize="3vh"
        fontColor="white"
        backgroundColor="red"
        style={{ marginTop: '3vh', float: 'right' }}
        onClick={() => {
          onClickModal();
          exitRoom();
        }}
      >
        EOZ 나가기
      </EozBtn>
    </EozRoomBlock>
  );
};

export default RoomModal;
