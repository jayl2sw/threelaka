import React from 'react';
import {
  SearchBarContainer,
  SearchBarInput,
  SearchButton,
} from '../../../styles/Main/MainSearchStyle';

const SearchBar = () => {
  return (
    <SearchBarContainer>
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
