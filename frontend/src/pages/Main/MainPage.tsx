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

const recommendDummy1 = [
  {
    videoId: '9E1SLTvngEw',
    title: 'Lasting Conservation, Led by Indigenous Heritage',
    description: '없음',
    script: true,
    script_kor: false,
  },
  {
    videoId: '9E1SLTvngEw',
    title: 'Lasting Conservation, Led by Indigenous Heritage',
    description: '없음',
    script: true,
    script_kor: false,
  },
  {
    videoId: '9E1SLTvngEw',
    title: 'Lasting Conservation, Led by Indigenous Heritage',
    description: '없음',
    script: true,
    script_kor: false,
  },
  {
    videoId: '9E1SLTvngEw',
    title: 'Lasting Conservation, Led by Indigenous Heritage',
    description: '없음',
    script: true,
    script_kor: false,
  },
];

// const recommendDummy2 = [
//   {
//     videoId: 'Ks-_Mh1QhMc',
//     title: 'Your body language may shape who you are',
//     description: '없음',
//     script: true,
//     script_kor: true,
//   },
//   {
//     videoId: 'Ks-_Mh1QhMc',
//     title: 'Your body language may shape who you are',
//     description: '없음',
//     script: true,
//     script_kor: true,
//   },
//   {
//     videoId: 'Ks-_Mh1QhMc',
//     title: 'Your body language may shape who you are',
//     description: '없음',
//     script: true,
//     script_kor: true,
//   },
//   {
//     videoId: 'Ks-_Mh1QhMc',
//     title: 'Your body language may shape who you are',
//     description: '없음',
//     script: true,
//     script_kor: true,
//   },
// ];

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
      </RecentVideoContainer>
      <RecommendVideoList />
    </MainPageBlock>
  );
};

export default MainPage;
