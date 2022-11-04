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
  ListInfo
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
          <YoutubeLink>
            <IconContext.Provider value={{ color: 'red', size: '5vmin' }}>
              <RiYoutubeFill />
            </IconContext.Provider>
            TED 보러가기
          </YoutubeLink>
          <NewVideo>
            <SearchBar />
          </NewVideo>

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
