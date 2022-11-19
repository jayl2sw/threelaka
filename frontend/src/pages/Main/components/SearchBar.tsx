import React, { useEffect, useState } from 'react';
// style
import { useNavigate } from 'react-router-dom';
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

interface ISearchBarProps {
  setModalToggleVideoId: (nextVideoId: string) => void;
}

const SearchBar = ({ setModalToggleVideoId }: ISearchBarProps) => {
  const navigate = useNavigate();
  // 입력 받을 영상 주소
  const [videoUrl, setVideoUrl] = useState<string>('');
  // 입력 받을 때 변환
  const onChange = (e: any) => {
    setVideoUrl(e.target.value);
  };

  // 버튼 클릭으로 영상 정보 조회
  const handlerGetVideoData = (videoUrl: string) => {
    // https://www.youtube.com/watch?v=_X834O9MaCM&t=90s
    if (videoUrl.includes('www.youtube.com')) {
      setModalToggleVideoId(videoUrl);
    } else {
      alert('키워드는 videos 페이지에서 이용하세요');
      navigate('/videos');
    }
  };

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
              // className: 'global-class-name',
              size: '2.2vw',
            }}
          >
            <GoSearch style={{ paddingBottom: '0.5vw' }}></GoSearch>
          </IconContext.Provider>
        </SearchIconBtn>
      </SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar;
