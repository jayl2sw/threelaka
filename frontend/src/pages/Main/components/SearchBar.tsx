import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { useNavigate } from 'react-router-dom';
import { videoActions } from '../../../features/video/video-slice';
import { studyActions } from '../../../features/study/study-slice';
import {
  SearchBarContainer,
  SearchBarInput,
  SearchButton,
} from '../../../styles/Main/MainSearchStyle';

const SearchBar = () => {
  const dispatch = useAppDispatch();

  const handlerGetVideoData = () => {
    dispatch(videoActions.getVideoData('https://youtu.be/UhssmfRXYZI'));
  };

  const handlerPostStartStudy = () => {
    dispatch(studyActions.postStartStudy('UhssmfRXYZI'));
  };

  const stage = useAppSelector((state) => state.study.studyState.stage);

  const navigate = useNavigate();

  useEffect(() => {
    if (stage !== '') {
      navigate('/study/read');
    }
  }, [stage]);

  return (
    <SearchBarContainer>
      <button onClick={handlerPostStartStudy}>학습 시작하기</button>
      <SearchBarInput>
        <input type="text" required />
        <span>공부하려는 영상의 유튜브 링크를 넣어주세요</span>
        <i></i>
      </SearchBarInput>
      <SearchButton>
        <button onClick={handlerGetVideoData}>비디오 정보 받기</button>
        <p>위에 버튼 누르면 모달 띄우세요</p>
      </SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar;
