import React from 'react';

//style
import { ModalBackdrop } from '../../../styles/DashBoard/DashBoardStyle';
import { MainBox } from '../../../styles/Common/CommonDivStyle';
import { CloseModalBtn } from '../../../styles/Common/VideoModalStyle';
import { AiFillCloseCircle } from 'react-icons/ai';
import { EozBtn } from '../../../styles/WebRtc/WebRtcStyle';

type VidoPickModalProps = {
  modalToggleVideoId: string;
  setModalToggleVideoId: (nextVideoId: string) => void;
  setIsVideoPicked: (value: boolean) => void;
  videoTitle: string;
};

const VideoPickModal = ({
  modalToggleVideoId,
  setModalToggleVideoId,
  setIsVideoPicked,
  videoTitle,
}: VidoPickModalProps) => {
  return modalToggleVideoId === 'none' ? (
    <></>
  ) : (
    <ModalBackdrop>
      <MainBox
        widthSize={'30vw'}
        heightSize={'50vh'}
        paddingSize={'1vh 1vw'}
        fontColor={'black'}
        fontSize={'1.5vmin'}
        style={{
          position: 'fixed',
          zIndex: '1000',
          // border: '1px solid green',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>{modalToggleVideoId}</p>
        <p>{videoTitle}</p>
        <p>학습 일자</p>

        <EozBtn
          widthSize={'7vw'}
          heightSize={'2vh'}
          fontColor={'white'}
          backgroundColor={'blue'}
          onClick={() => {
            setModalToggleVideoId('none');
            setIsVideoPicked(true);
          }}
        >
          영상 선택
        </EozBtn>
        <EozBtn
          widthSize={'7vw'}
          heightSize={'2vh'}
          fontColor={'white'}
          backgroundColor={'grey'}
          onClick={() => {
            setModalToggleVideoId('none');
            setIsVideoPicked(false);
          }}
        >
          돌아가기
        </EozBtn>
      </MainBox>
    </ModalBackdrop>
  );
};

export default VideoPickModal;
