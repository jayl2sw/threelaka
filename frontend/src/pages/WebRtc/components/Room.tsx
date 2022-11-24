import React, { useEffect } from 'react';
import StreamVideo from './StreamVideo';
import { getLocalPreviewAndInitRoomConnection, exitRoom } from '../WebRtcpage';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { writingActions } from '../../../features/writing/writing-slice';
import RoomEssayPickBtn from './RoomEssay';
import RoomEssays from './RoomEssays';
import RoomStudyVideo from './RoomStudyVideo';

// style
import {
  EozRoomBlock,
  EozRoomVideoContainer,
  UserEssayContainer,
  EozRoomStudyVideoContainer,
  EozRoomStudyContainer,
  EssayPickBtnContainer,
  EozRoomBtnContainer,
  EozBtn,
} from '../../../styles/WebRtc/WebRtcStyle';

type RoomProps = {
  messages: any;
  roomInfo: any;
  guildId: string;
  videoId: string;
  learningRecordId: string;
  onClickRoomModal: () => void;
  isOpenRoomModal: boolean;
};

const Room = ({
  messages,
  roomInfo,
  guildId,
  videoId,
  learningRecordId,
  onClickRoomModal,
}: RoomProps) => {
  const dispatch = useAppDispatch();
  console.log('room----------', videoId);

  useEffect(() => {
    getLocalPreviewAndInitRoomConnection(
      roomInfo,
      roomInfo.roomNumber,
      guildId,
      videoId,
      learningRecordId
    );
    return () => {
      exitRoom();
    };
  }, []);
  const handleGetUserEssay = (learningRecordId: number) => {
    dispatch(writingActions.getEssayStart(learningRecordId));
  };
  const handleRoomDisconnection = () => {
    const siteUrl = '/auth/dashboard/4';
    window.location.href = siteUrl;
  };

  return (
    <EozRoomBlock>
      <EozRoomVideoContainer>
        <StreamVideo />
        <StreamVideo />
        <StreamVideo />
        <StreamVideo />
        <StreamVideo />
      </EozRoomVideoContainer>
      <EozRoomStudyContainer>
        <RoomStudyVideo videoId={videoId} />
        <RoomEssays connectedUsers={roomInfo.connectedUsers} />
      </EozRoomStudyContainer>
      <EozRoomBtnContainer>
        <EozBtn
          widthSize="10vw"
          heightSize="5vh"
          fontColor="white"
          backgroundColor="black"
          onClick={() => {
            onClickRoomModal();
            exitRoom();
            handleRoomDisconnection();
          }}
        >
          나가기
        </EozBtn>
      </EozRoomBtnContainer>
    </EozRoomBlock>
  );
};

export default Room;

// import React, { useEffect } from 'react';
// import { getLocalPreviewAndInitRoomConnection, exitRoom } from '../WebRtcpage';

// type RoomModalProps = {
//   messages: any;
//   videoId: string;
//   learningRecordId: string;
//   roomInfo: any;
//   guildId: number;
//   onClickModal: () => void;
// };

// const Room = ({
//   messages,
//   videoId,
//   learningRecordId,
//   roomInfo,
//   guildId,
//   onClickModal,
// }: RoomModalProps) => {
//   useEffect(() => {
//     getLocalPreviewAndInitRoomConnection(
//       roomInfo,
//       roomInfo.roomNumber,
//       guildId,
//       videoId,
//       learningRecordId
//     );
//     return () => {
//       exitRoom();
//     };
//   }, []);

//   return (
//     <div>
//       <div>얼굴</div>
//       <div>{videoId}</div>
//       <div>영상</div>
//       <div>스크립트</div>
//       <div>에세이</div>
//       <div>내 에세이: {learningRecordId}</div>
//       <button
//         onClick={() => {
//           onClickModal();
//         }}
//       >
//         나가기
//       </button>
//     </div>
//   );
// };

// export default Room;
