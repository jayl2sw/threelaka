import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
// style
import { WaitingRoomPickEssay } from '../../../styles/WebRtc/WebRtcStyle';
import { guildActions } from '../../../features/guild/guild-slice';
import {
  FlexTransparentDiv,
  BackBlurBox,
} from '../../../styles/Common/CommonDivStyle';
import { MainBtn } from '../../../styles/Common/CommonBtnStyle';
import {
  BsCalendarCheck,
  BsCaretRightFill,
  BsCaretLeftFill,
} from 'react-icons/bs';

type JoinRoomProps = {
  videoId: string;
  roomInfo: any;
  // setVideoId: (value: string) => void;
  setLearningRecordId: (value: string) => void;
  localStream: any;
  guildId: number;
  onClickModal: () => void;
  onClickRoomModal: () => void;
};

const PickEssay = ({
  videoId,
  roomInfo,
  // setVideoId,
  setLearningRecordId,
  guildId,
  onClickModal,
  onClickRoomModal,
  localStream,
}: JoinRoomProps) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (videoId === '') {
      return;
    } else {
      dispatch(guildActions.getSpecificEssayStart(videoId));
    }
  }, [videoId]);
  const [pageNum, setPageNum] = useState<number>(0);

  const mySpecifitVideoEssayLst = useAppSelector(
    (state) => state.guild.specifitVideoEssayLst
  );

  let totalPageNum = mySpecifitVideoEssayLst.length;
  useEffect(() => {
    if (mySpecifitVideoEssayLst.length === 0) {
      return;
    }
    setLearningRecordId(
      mySpecifitVideoEssayLst[pageNum].learningRecordId.toString()
    );
  }, [pageNum]);

  return (
    <WaitingRoomPickEssay>
      {totalPageNum !== 0 ? (
        <FlexTransparentDiv
          widthSize={'41vw'}
          heightSize={'31vh'}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'start'}
          alignItems={'center'}
          IsBorder={'none'}
        >
          <FlexTransparentDiv
            widthSize={'41vw'}
            heightSize={'5vh'}
            paddingSize={'0'}
            flexDirection={'row'}
            justifyContent={'center'}
            alignItems={'center'}
            IsBorder={'none'}
          >
            {pageNum === 0 ? (
              <FlexTransparentDiv
                widthSize={'30px'}
                heightSize={'30px'}
                paddingSize={'0'}
                flexDirection={'column'}
                justifyContent={'start'}
                alignItems={'center'}
                IsBorder={'none'}
              ></FlexTransparentDiv>
            ) : (
              <BsCaretLeftFill
                size={20}
                onClick={() => setPageNum((pageNum) => pageNum - 1)}
                style={{ cursor: 'pointer' }}
              ></BsCaretLeftFill>
            )}
            <FlexTransparentDiv
              widthSize={'20vw'}
              heightSize={'5vh'}
              paddingSize={'0'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              IsBorder={'none'}
            >
              {mySpecifitVideoEssayLst[pageNum].modifiedDate}
            </FlexTransparentDiv>
            {pageNum === totalPageNum - 1 ? (
              <FlexTransparentDiv
                widthSize={'30px'}
                heightSize={'30px'}
                paddingSize={'0'}
                flexDirection={'column'}
                justifyContent={'start'}
                alignItems={'center'}
                IsBorder={'none'}
              ></FlexTransparentDiv>
            ) : (
              <BsCaretRightFill
                onClick={() => setPageNum((pageNum) => pageNum + 1)}
                size={20}
                style={{ cursor: 'pointer' }}
              ></BsCaretRightFill>
            )}
          </FlexTransparentDiv>

          <BackBlurBox
            widthSize={'41vw'}
            heightSize={'21vh'}
            paddingSize={'1vh 1vw'}
            fontColor={'black'}
            fontSize={'2vmin'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'start',
              justifyContent: 'start',
              backgroundColor: 'rgba(88, 172, 240, 0.861458)',
              overflowX: 'hidden',
              overflowY: 'auto',
            }}
          >
            {mySpecifitVideoEssayLst[pageNum].essay}
          </BackBlurBox>
          <MainBtn
            widthSize={'10vw'}
            heightSize={'4vh'}
            paddingSize={'0'}
            fontSize={'1.8vmin'}
            fontColor={'white'}
            backgroundColor={'blue'}
            style={{ borderRadius: '10px', marginTop: '1vh' }}
            onClick={() => {
              onClickModal();
              onClickRoomModal();
            }}
          >
            입장하기
          </MainBtn>
        </FlexTransparentDiv>
      ) : (
        ''
      )}

      {/* <p
          style={{
            fontSize: '2.5vmin',
            fontWeight: 'bold',
            color: '#4A9FFF',
            verticalAlign: 'middle',
          }}
        >
          함께 공부할 에세이{videoId}
          {mySpecifitVideoEssayLst.length !== 0
            ? mySpecifitVideoEssayLst[1].essay
            : ''}
        </p>
        <input onChange={(e) => setLearningRecordId(e.target.value)} />
      </FlexTransparentDiv>
      <button
        onClick={() => {
          onClickModal();
          onClickRoomModal();
        }}
      >
        입장하기
      </button> */}
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
