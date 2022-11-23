import React from 'react';
import { useEffect, RefObject, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { dashboardActions } from '../../../features/dashboard/dashboard-slice';
import DashboardVideoCard from './DashboardVideoCard';
import { RecentVideoContainer } from '../../../styles/DashBoard/DashBoardStyle';
import { FlexTransparentDiv } from '../../../styles/Common/CommonDivStyle';

interface IRecentVideosPros {
  recentVideoBlock: RefObject<HTMLDivElement>;
  mode: number;
  setModalToggleVideoId: (nextVideoId: string) => void;
}

const DashboardVideos = ({
  recentVideoBlock,
  mode,
  setModalToggleVideoId,
}: IRecentVideosPros) => {
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
    <div>
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
                return (
                  <DashboardVideoCard
                    data={data}
                    key={i}
                    setModalToggleVideoId={setModalToggleVideoId}
                  />
                );
              })
            ) : (
              recentVideoList.map((data, i) => {
                return (
                  <DashboardVideoCard
                    data={data}
                    key={i}
                    setModalToggleVideoId={setModalToggleVideoId}
                  />
                );
              })
            )
          ) : (
            <h1>'아직 공부중인 영상이 없어요'</h1>
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
              return (
                <DashboardVideoCard
                  data={data}
                  key={i}
                  setModalToggleVideoId={setModalToggleVideoId}
                />
              );
            })
          ) : (
            <h1>'공부 완료한 영상이 없어요'</h1>
          )}
        </RecentVideoContainer>
      )}
      {/* </RecentVideoContainer> */}
    </div>
  );
};

export default DashboardVideos;
