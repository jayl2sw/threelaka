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

const recommendDummy2 = [
  {
    videoId: 'Ks-_Mh1QhMc',
    title: 'Your body language may shape who you are',
    description: '없음',
    script: true,
    script_kor: true,
  },
  {
    videoId: 'Ks-_Mh1QhMc',
    title: 'Your body language may shape who you are',
    description: '없음',
    script: true,
    script_kor: true,
  },
  {
    videoId: 'Ks-_Mh1QhMc',
    title: 'Your body language may shape who you are',
    description: '없음',
    script: true,
    script_kor: true,
  },
  {
    videoId: 'Ks-_Mh1QhMc',
    title: 'Your body language may shape who you are',
    description: '없음',
    script: true,
    script_kor: true,
  },
];
const MainPage = () => {
  return (
    <MainPageBlock>
      <FirstpageBlock>
        <SearchBarBlock>
        <LogoBlock></LogoBlock>
        <YoutubeLink></YoutubeLink>
        <NewVideo>
          <SearchBar />
        </NewVideo>
        </SearchBarBlock>
      </FirstpageBlock>
      
      <RecentVideoContainer>
      <RecentVideo>
        <div>최근 학습한 영상</div>
      </RecentVideo>
      </RecentVideoContainer>
      <RecommendVideos>
        {recommendDummy1.map((videoData, i) => {
          return <VideoCard data={videoData} key={i} />;
        })}
      </RecommendVideos>

      <RecommendVideos>
        {recommendDummy2.map((videoData, i) => {
          return <VideoCard data={videoData} key={i} />;
        })}
      </RecommendVideos>
    </MainPageBlock>
  );
};

export default MainPage;
