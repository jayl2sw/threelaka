import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { videoActions } from '../../../features/video/video-slice';
import {
  SearchBarContainer,
  SearchBarInput,
  SearchButton,
} from '../../../styles/Main/MainSearchStyle';

const SearchBar = () => {
  const dispatch = useAppDispatch();

  const onClickHandler = () => {
    dispatch(videoActions.getVideoData('https://youtu.be/UhssmfRXYZI'));
  };
  return (
    <SearchBarContainer>
      <button onClick={onClickHandler}>비디오 정보 받기</button>
      <SearchBarInput>
        <input type="text" required />
        <span>공부하려는 영상의 유튜브 링크를 넣어주세요</span>
        <i></i>
      </SearchBarInput>
      <SearchButton>
        <button>
          <p>공부 하러 가기</p>
        </button>
      </SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar;
