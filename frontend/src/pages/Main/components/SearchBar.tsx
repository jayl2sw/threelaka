import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { videoActions } from '../../../features/video/video-slice';
import VideoDataModal from './VideoDataModal';
import {
  SearchBarContainer,
  SearchBarInput,
  SearchButton,
  SearchIconBtn,
} from '../../../styles/Main/MainSearchStyle';
import useModal from '../../../utils/useModal';
import { GoSearch } from 'react-icons/go';
import { IconContext } from 'react-icons';

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 입력 받을 영상 주소
  const [videoUrl, setVideoUrl] = useState<string>('');
  // 입력 받을 때 변환
  const onChange = (e: any) => {
    setVideoUrl(e.target.value);
  };

  // 모달에 띄워줄 비디오 정보
  const videoData = useAppSelector((state) => state.video.videoData);
  // 버튼 클릭으로 영상 정보 조회
  const handlerGetVideoData = (videoUrl: string) => {
    dispatch(videoActions.getVideoData(videoUrl));
  };

  // 모달 사용하기
  const { isOpenModal, onClickModal } = useModal();

  // 현재 영상 stage 확인
  const studyState = useAppSelector((state) => state.study.studyState);
  // stage 변경 시 해당 스테이지로 이동
  useEffect(() => {
    if (studyState.stage !== '') {
      // navigate(`/study/${stage}`);
      navigate(
        `/study/reading/${studyState.learningRecordId}/${studyState.stage}/${studyState.videoId}`
      );
    }
  }, [studyState]);

  return (
    <SearchBarContainer>
      <SearchBarInput>
        <input
          type="text"
          onChange={onChange}
          value={videoUrl}
          onKeyPress={(e) => {
            if (e.key == 'Enter') {
              handlerGetVideoData(videoUrl);
              onClickModal();
            }
          }}
          required
        />
        <span>공부하려는 영상의 유튜브 링크를 넣어주세요</span>
        <i></i>
      </SearchBarInput>
      <SearchButton>
        <SearchIconBtn
          onClick={() => {
            handlerGetVideoData(videoUrl);
            onClickModal();
          }}
        >
          <IconContext.Provider
            value={{
              color: '4a9fff',
              className: 'global-class-name',
              size: '2rem',
            }}
          >
            <GoSearch></GoSearch>
          </IconContext.Provider>
        </SearchIconBtn>
        {isOpenModal && (
          <VideoDataModal
            isOpenModal={isOpenModal}
            toggle={onClickModal}
            videoData={videoData}
          />
        )}
      </SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar;
