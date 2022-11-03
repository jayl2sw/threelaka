import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import VideoCard from './VideoCard';
import { videoActions } from '../../../features/video/video-slice';

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

const RecommendVideoList = () => {
  const dispatch = useAppDispatch();
  const recommendVideoList = useAppSelector(
    (state) => state.video.recommendVideoList
  );

  useEffect(() => {
    dispatch(videoActions.getRecommendVideos());
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      {recommendVideoList &&
        recommendVideoList.map((videoData, i) => {
          return <VideoCard data={videoData} key={i} />;
        })}
    </div>
  );
};

export default RecommendVideoList;
