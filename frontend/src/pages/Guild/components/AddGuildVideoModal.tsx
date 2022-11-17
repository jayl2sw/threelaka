import React, { useEffect, useState, useRef } from 'react';
import { videoActions } from '../../../features/video/video-slice';
import { studyActions } from '../../../features/study/study-slice';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import {
  MainBox,
  FlexTransparentDiv,
  BackBlurBox,
} from '../../../styles/Common/CommonDivStyle';
import {
  AiFillCloseCircle,
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
} from 'react-icons/ai';
import { CloseModalBtn } from '../../../styles/Common/VideoModalStyle';
import { MainBtn } from '../../../styles/Common/CommonBtnStyle';
import { ModalBackdrop } from '../../../styles/DashBoard/DashBoardStyle';
import GradientInput from '../../../utils/GradientInput';

interface IVideoModalProps {
  modalToggle: boolean;
  setModalToggle: (nextToggle: boolean) => void;
}

const AddGuildVideoModal = ({
  modalToggle,
  setModalToggle,
}: IVideoModalProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const outside = useRef<HTMLDivElement>(null);
  // 버튼 클릭으로 영상 정보 조회
  const [inputValue, setInpuValue] = useState<string>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const onClickSearchVideo = (
    e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLDivElement>,
    targetInputVal: string
  ) => {
    const keyword = targetInputVal.trim();
    if (keyword.length < 2) {
      alert('키워드를 2글자 이상 입력해주세요');
    } else {
      dispatch(videoActions.getKeywordSearchVideosStart(keyword));
      setSearchKeyword(keyword);
    }
  };

  return (
    <ModalBackdrop
      ref={outside}
      onClick={(e) => {
        if (e.target === outside.current) {
          setModalToggle(false);
        }
      }}
    >
      <MainBox
        widthSize={'50vw'}
        heightSize={'80vh'}
        paddingSize={'2vh 2vw'}
        fontColor={'black'}
        fontSize={'1.5vmin'}
        style={{
          position: 'fixed',
          top: '10vh',
          left: '25vw',
          zIndex: '1000',
          // border: '1px solid green',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <GradientInput
          widthSize={50}
          onClickHandler={onClickSearchVideo}
          placeHolderText={'안녕하세요'}
          inputName={'keyword'}
          inputValue={inputValue}
          setInputValue={setInpuValue}
        ></GradientInput>
      </MainBox>
    </ModalBackdrop>
  );
};

export default AddGuildVideoModal;
