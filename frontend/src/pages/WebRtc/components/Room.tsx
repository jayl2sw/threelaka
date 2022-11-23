import React, { useEffect } from 'react';
import VideoContainer from './VideoContainer';
import { getLocalPreviewAndInitRoomConnection, exitRoom } from '../WebRtcpage';
import ChatSection from './ChatSection';

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
  return (
    <div>
      <VideoContainer />
      <div>
        <p>{videoId}</p>
      </div>
      {/* <ChatSection messages={messages} /> */}
      <button
        onClick={() => {
          onClickRoomModal();
          exitRoom();
        }}
      >
        나가기
      </button>
    </div>
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
