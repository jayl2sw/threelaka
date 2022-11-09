import React from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { dashboardActions } from '../../../features/dashboard/dashboard-slice';

import RecentVideoCard from './CompletedVideoCard';
import CompletedVideoCard from './CompletedVideoCard';
const CompletedVideos = () => {
  const dispatch = useAppDispatch();
  // 현재 공부중인 영상 리스트
  useEffect(() => {
    dispatch(dashboardActions.getCompletedVideos());
  }, []);

  // 현재 공부중인 영상 리스트
  const completedVideoList = useAppSelector(
    (state) => state.dashboard.completedVideoList
  );

  return (
    <div style={{ display: 'flex' }}>
      {completedVideoList.length !== 0 ? (
        completedVideoList.length > 3 ? (
          completedVideoList.slice(0, 3).map((data, i) => {
            return <CompletedVideoCard data={data} key={i} />;
          })
        ) : (
          completedVideoList.map((data, i) => {
            return <CompletedVideoCard data={data} key={i} />;
          })
        )
      ) : (
        <div>'공부 완료한 영상이 없어요'</div>
      )}
    </div>
  );
};

export default CompletedVideos;
