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
          <YoutubeLink>
            <IconContext.Provider value={{ color: 'red', size: '3rem' }}>
              <RiYoutubeFill />
            </IconContext.Provider>
            테드 유튜브 채널로 가세요
          </YoutubeLink>
        </SearchBarBlock>
      </FirstpageBlock>
      <RecentVideoContainer>
        <RecentVideo />
      </RecentVideoContainer>
      <RecommendVideoList />
    </MainPageBlock>
  );
};

export default MainPage;
