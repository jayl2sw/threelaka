import React from 'react';
import MainHeader from '../../layout/MainHeader';
import SearchBar from './components/SearchBar';
import {
  MainPageBlock,
  RecentVideo,
  RecommendVideos,
} from '../../styles/Main/MainStyle';
import { NewVideo } from '../../styles/Main/MainSearchStyle';
import VideoCard from './components/VideoCard';
import RecommendVideoList from './components/RecommendVideoList';

const MainPage = () => {
  return (
    <MainPageBlock>
      <NewVideo>
        <SearchBar />
      </NewVideo>
      <RecentVideo>
        <div>최근 학습한 영상</div>
      </RecentVideo>
      <RecommendVideoList />
    </MainPageBlock>
  );
};

export default MainPage;
