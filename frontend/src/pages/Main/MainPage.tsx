import React from 'react';
import MainHeader from '../../layout/MainHeader';
import { MainPageBlock, RecommendVideos } from '../../styles/Main/MainStyle';
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
      <div>검색창 넣기</div>
      <div>최근 학습한 영상</div>
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
