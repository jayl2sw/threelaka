import React from 'react';

// style
import { WaitingRoomPickEssay } from '../../../styles/WebRtc/WebRtcStyle';

type JoinRoomProps = {
  roomInfo: any;
  // setVideoId: (value: string) => void;
  setLearningRecordId: (value: string) => void;
  localStream: any;
  guildId: number;
  onClickModal: () => void;
  onClickRoomModal: () => void;
};

const PickEssay = ({
  roomInfo,
  // setVideoId,
  setLearningRecordId,
  guildId,
  onClickModal,
  onClickRoomModal,
  localStream,
}: JoinRoomProps) => {
  return (
    <WaitingRoomPickEssay>
      <div>
        <p
          style={{
            fontSize: '2.5vmin',
            fontWeight: 'bold',
            color: '#4A9FFF',
            verticalAlign: 'middle',
          }}
        >
          함께 공부할 에세이
        </p>
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
    </WaitingRoomPickEssay>
  );
};

export default PickEssay;

// import React from 'react;
// import useModal from '../../../utils/useModal';
// import Room from './Room';

// // style
// import { RoomModalContainer } from '../../../styles/WebRtc/WebRtcStyle';

// type JoinRoomProps = {
//   roomInfo: any;
//   setVideoId: (e: string) => void;
//   setLearningRecordId: (e: string) => void;
//   localStream: any;
//   guildId: number;
//   videoId: string;
//   learningRecordId: string;
//   messages: any;

// };

// const JoinRoom = ({
//   roomInfo,
//   setVideoId,
//   setLearningRecordId,
//   localStream,
//   guildId,
//   videoId,
//   learningRecordId,
//   messages,
// }: JoinRoomProps) => {
//   const { isOpenModal, onClickModal } = useModal();

//   return (
//     <div>
//       <div>
//         {roomInfo.videoId == null && (
//           <div>
//             <p>VideoId</p>
//             <input onChange={(e) => setVideoId(e.target.value)} />
//           </div>
//         )}
//         <p>learningRecordId</p>
//         <input onChange={(e) => setLearningRecordId(e.target.value)} />
//       </div>
//       <button
//         onClick={() => {
//           onClickModal();
//         }}
//       >
//         입장하기
//       </button>
//       {isOpenModal && (
//         <RoomModalContainer>
//           <Room
//             messages={messages}
//             videoId={videoId}
//             learningRecordId={learningRecordId}
//             roomInfo={roomInfo}
//             guildId={guildId}
//             onClickModal={onClickModal}
//           />
//         </RoomModalContainer>
//       )}
//     </div>
//   );
// };

// export default JoinRoom;
