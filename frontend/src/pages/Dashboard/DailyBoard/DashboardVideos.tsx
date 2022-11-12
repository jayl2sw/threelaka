import React from 'react';
import { useEffect, RefObject } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { dashboardActions } from '../../../features/dashboard/dashboard-slice';
import DashboardVideoCard from './DashboardVideoCard';
import { RecentVideoContainer } from '../../../styles/DashBoard/DashBoardStyle';
interface IRecentVideosPros {
  recentVideoBlock: RefObject<HTMLDivElement>;
  mode: number;
}

const DashboardVideos = ({ recentVideoBlock, mode }: IRecentVideosPros) => {
  const dispatch = useAppDispatch();
  // 현재 공부중인 영상 리스트
  useEffect(() => {
    dispatch(dashboardActions.getRecentVideos());
    dispatch(dashboardActions.getCompletedVideos());
  }, []);

  // 현재 공부중인 영상 리스트
  const recentVideoList = useAppSelector(
    (state) => state.dashboard.recentVideoList
  );

  const completedVideoList = useAppSelector(
    (state) => state.dashboard.completedVideoList
  );

  return (
    <>
      {/* <RecentVideoContainer ref={recentVideoBlock} style={{ display: 'flex' }}> */}
      {mode === 0 ? (
        <RecentVideoContainer
          ref={recentVideoBlock}
          style={{ display: 'flex' }}
          className={'recentVideo'}
        >
          {recentVideoList.length !== 0 ? (
            recentVideoList.length > 3 ? (
              recentVideoList.slice(0, 2).map((data, i) => {
                return <DashboardVideoCard data={data} key={i} />;
              })
            ) : (
              recentVideoList.map((data, i) => {
                return <DashboardVideoCard data={data} key={i} />;
              })
            )
          ) : (
            <div>'아직 공부중인 영상이 없어요'</div>
          )}
        </RecentVideoContainer>
      ) : (
        <RecentVideoContainer
          ref={recentVideoBlock}
          style={{ display: 'flex' }}
          className={'completedVideo'}
        >
          {completedVideoList.length !== 0 ? (
            completedVideoList.map((data, i) => {
              return <DashboardVideoCard data={data} key={i} />;
            })
          ) : (
            <div>'공부 완료한 영상이 없어요'</div>
          )}
        </RecentVideoContainer>
      )}
      {/* </RecentVideoContainer> */}
    </>
  );
};

export default DashboardVideos;
