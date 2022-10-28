import React, { useCallback, useEffect, useState, TouchEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { videoActions } from '../../../features/video/video-slice';
import { studyActions } from '../../../features/study/study-slice';
import VideoDataModal from './VideoDataModal';
import {
  SearchBarContainer,
  SearchBarInput,
  SearchButton,
} from '../../../styles/Main/MainSearchStyle';

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 영상 정보 조회
  const handlerGetVideoData = () => {
    dispatch(videoActions.getVideoData('https://youtu.be/UhssmfRXYZI'));
  };

  // 영상 정보 조회용 모달
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  // 모달 눌렀을 때
  const onClickModal = useCallback(() => {
    setIsOpenModal(!isOpenModal);
  }, [isOpenModal]);
  // 모달에 띄워줄 비디오 정보
  const videoData = useAppSelector((state) => state.video.videoData);

  // 해당 영상으로 새로운 공부 시작
  const handlerPostStartStudy = () => {
    dispatch(studyActions.postStartStudy('UhssmfRXYZI'));
  };

  // 현재 영상 stage 확인
  const stage = useAppSelector((state) => state.study.studyState.stage);
  // stage 변경 시 해당 스테이지로 이동
  useEffect(() => {
    if (stage !== '') {
      navigate(`/study/${stage}`);
    }
  }, [stage]);

  return (
    <SearchBarContainer>
      {/* 새로운 학습 시작 */}
      <button onClick={handlerPostStartStudy}>학습 시작하기</button>
      <SearchBarInput>
        <input type="text" required />
        <span>공부하려는 영상의 유튜브 링크를 넣어주세요</span>
        <i></i>
      </SearchBarInput>
      <SearchButton>
        {isOpenModal && <VideoDataModal videoData={videoData} />}
        <button
          onClick={() => {
            onClickModal();
            handlerGetVideoData();
          }}
        >
          비디오 정보 받기
        </button>
        {/* <button onClick={handlerGetVideoData}>비디오 정보 받기</button> */}
      </SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar;
