import React from 'react';
import MainHeader from '../../layout/MainHeader';
import SearchBar from './components/SearchBar';
import RecentVideo from './components/RecentVideo';
import {
  MainPageBlock,
  RecommendVideos,
  RecentVideoContainer,
  SearchBarBlock,
  LogoBlock,
  FirstpageBlock,
  YoutubeLink,
  RecommendVideoContainer,
  ListInfo,
} from '../../styles/Main/MainStyle';
import { NewVideo } from '../../styles/Main/MainSearchStyle';
import RecommendVideoList from './components/RecommendVideoList';
import { RiYoutubeFill } from 'react-icons/ri';
import { IconContext } from 'react-icons';

const MainPage = () => {
  return (
    <MainPageBlock>
      <FirstpageBlock>
        <SearchBarBlock>
          <LogoBlock></LogoBlock>
          <NewVideo>
            <SearchBar />
          </NewVideo>
          <a href="https://www.youtube.com/c/TED">
            <YoutubeLink>
              <IconContext.Provider value={{ color: 'red', size: '3rem' }}>
                <RiYoutubeFill />
              </IconContext.Provider>
              TED 채널 바로가기
            </YoutubeLink>
          </a>
        </SearchBarBlock>
      </FirstpageBlock>
      <RecentVideoContainer>
        <RecentVideo />
      </RecentVideoContainer>
      <RecommendVideoContainer>
        <ListInfo>추천 영상</ListInfo>
        <RecommendVideoList />
      </RecommendVideoContainer>
    </MainPageBlock>
  );
};

export default MainPage;
