import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { videoActions } from '../../../features/video/video-slice';
import VideoDataModal from './VideoDataModal';
import useModal from '../../../utils/useModal';

// style
import {
  SearchBarContainer,
  SearchBarInput,
  SearchButton,
  SearchIconBtn,
} from '../../../styles/Main/MainSearchStyle';
import { RiYoutubeFill } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import { YoutubeLink } from '../../../styles/Main/MainStyle';
import { GoSearch } from 'react-icons/go';
import { boolean } from 'yup';

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
  const learningRecord = useAppSelector(
    (state) => state.video.recentVideoData.learningRecord
  );

  // 버튼 클릭으로 영상 정보 조회
  const handlerGetVideoData = (videoUrl: string) => {
    dispatch(videoActions.getVideoData(videoUrl));
    // 이전에 본 적 있는지도 확인하자
    dispatch(videoActions.getRecentVideoData());
  };

  // 모달 사용하기
  const { isOpenModal, onClickModal } = useModal();

  // url 관련 안내문
  const [urlAlert, setUrlAlert] = useState('');

  // 정확한 url인지 확인하기
  const correctUrl = useAppSelector((state) => state.video.correctUrl);
  useEffect(() => {
    if (correctUrl === true) {
      onClickModal();
    } else if (correctUrl == false) {
      alert('정확한 URL을 입력해주세요');
    }
  }, [correctUrl]);

  // 현재 영상 stage 확인
  const studyState = useAppSelector((state) => state.study.studyState);
  // stage 변경 시 해당 스테이지로 이동
  useEffect(() => {
    if (studyState.stage !== '') {
      // navigate(`/study/${stage}`);
      if (studyState.learningRecordId !== 0) {
        navigate(
          `/study/reading/${studyState.learningRecordId}/${studyState.stage}/${studyState.videoId}`
        );
      }
    }
  }, [studyState]);

  return (
    <SearchBarContainer>
      <a href="https://www.youtube.com/c/TED" target="_blank">
        <YoutubeLink>
          <IconContext.Provider value={{ color: 'red', size: '5vmin' }}>
            <RiYoutubeFill style={{ marginRight: '1vw' }} />
          </IconContext.Provider>{' '}
          <p>TED</p>
        </YoutubeLink>
      </a>

      <SearchBarInput>
        <input
          type="text"
          onChange={onChange}
          value={videoUrl}
          onKeyPress={(e) => {
            if (e.key == 'Enter') {
              handlerGetVideoData(videoUrl);
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
          }}
        >
          <IconContext.Provider
            value={{
              color: '111111',
              className: 'global-class-name',
              size: '2.2vw',
            }}
          >
            <GoSearch style={{ paddingBottom: '0.5vw' }}></GoSearch>
          </IconContext.Provider>
        </SearchIconBtn>

        {isOpenModal && (
          <VideoDataModal
            isOpenModal={isOpenModal}
            toggle={onClickModal}
            videoData={videoData}
            learningRecord={learningRecord}
          />
        )}
      </SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar;
