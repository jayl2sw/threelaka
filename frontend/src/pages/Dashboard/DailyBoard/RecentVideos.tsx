import React from 'react';
import { useEffect, RefObject } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { dashboardActions } from '../../../features/dashboard/dashboard-slice';
import RecentVideoCard from './RecentVideoCard';
import { RecentVideoContainer } from '../../../styles/DashBoard/DashBoardStyle';
interface IRecentVideosPros {
  recentVideoBlock: RefObject<HTMLDivElement>;
}

const RecentVideos = ({ recentVideoBlock }: IRecentVideosPros) => {
  const dispatch = useAppDispatch();
  // 현재 공부중인 영상 리스트
  useEffect(() => {
    dispatch(dashboardActions.getRecentVideos());
  }, []);

  // 현재 공부중인 영상 리스트
  const recentVideoList = useAppSelector(
    (state) => state.dashboard.recentVideoList
  );

  return (
    <>
      <RecentVideoContainer
        className="recentVideo"
        ref={recentVideoBlock}
        style={{ display: 'flex' }}
      >
        {recentVideoList.length !== 0 ? (
          recentVideoList.length > 3 ? (
            recentVideoList.slice(0, 2).map((data, i) => {
              return <RecentVideoCard data={data} key={i} />;
            })
          ) : (
            recentVideoList.map((data, i) => {
              return <RecentVideoCard data={data} key={i} />;
            })
          )
        ) : (
          <div>'아직 공부중인 영상이 없어요'</div>
        )}
      </RecentVideoContainer>
    </>
  );
};

export default RecentVideos;
