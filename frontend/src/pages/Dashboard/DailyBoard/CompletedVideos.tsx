import React from 'react';
import { useEffect, RefObject } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { dashboardActions } from '../../../features/dashboard/dashboard-slice';
import { CompletedVideoContainer } from '../../../styles/DashBoard/DashBoardStyle';

import CompletedVideoCard from './CompletedVideoCard';

interface ICompletedVideosPros {
  completedVideoBlock: RefObject<HTMLDivElement>;
}

const CompletedVideos = ({ completedVideoBlock }: ICompletedVideosPros) => {
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
    <>
      <CompletedVideoContainer
        className="completedVideo"
        style={{ display: 'flex' }}
      >
        {completedVideoList.length !== 0 ? (
          completedVideoList.length > 3 ? (
            completedVideoList.slice(0, 2).map((data, i) => {
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
      </CompletedVideoContainer>
    </>
  );
};

export default CompletedVideos;
