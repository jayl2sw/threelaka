import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import VideoCard from './VideoCard';
import { videoActions } from '../../../features/video/video-slice';

const RecommendVideoList = () => {
  const dispatch = useAppDispatch();

  // 페이지 렌더링 하기 전에 추천 영상 요청하기
  useEffect(() => {
    dispatch(videoActions.getRecommendVideos());
  }, []);

  // (저장 되어 있는) 추천 영상 가져오기
  const recommendVideoList = useAppSelector(
    (state) => state.video.recommendVideoList
  );

  return (
    <div style={{ display: 'flex'}}>
      {recommendVideoList &&
        recommendVideoList.map((videoData, i) => {
          return <VideoCard data={videoData} key={i} />;
        })}
    </div>
  );
};

export default RecommendVideoList;
