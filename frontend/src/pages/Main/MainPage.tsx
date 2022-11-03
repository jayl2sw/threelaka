import React from 'react';
import MainHeader from '../../layout/MainHeader';
import SearchBar from './components/SearchBar';
import {
  MainPageBlock,
  RecentVideo,
  RecommendVideos,
  RecentVideoContainer,
  SearchBarBlock,
  LogoBlock,
  FirstpageBlock,
  YoutubeLink
} from '../../styles/Main/MainStyle';
import { NewVideo } from '../../styles/Main/MainSearchStyle';
import VideoCard from './components/VideoCard';
import RecommendVideoList from './components/RecommendVideoList';
import { RiYoutubeFill } from 'react-icons/ri';
import { IconContext } from "react-icons";

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
        <IconContext.Provider value={{ color: "red", size:"3rem"}}>
          <RiYoutubeFill />
        </IconContext.Provider>
        
         to TED</YoutubeLink>
        </SearchBarBlock>
      </FirstpageBlock>
      
      <RecentVideoContainer>
      <RecentVideo>
        <div>최근 학습한 영상</div>
      </RecentVideo>
<<<<<<< HEAD
=======
      </RecentVideoContainer>
>>>>>>> 0c310cde1de7e08d4a8be5aec985d864a81c5c20
      <RecommendVideoList />
    </MainPageBlock>
  );
};

export default MainPage;
