import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { MainPaleBox } from '../../../styles/Common/CommonDivStyle';
import { videoActions } from '../../../features/video/video-slice';

const RecentVideo = () => {
  const dispatch = useAppDispatch();

  // 페이지 렌더링 하기 전에 최근 공부한 영상 요청하기
  useEffect(() => {
    dispatch(videoActions.getRecentVideoData());
  }, []);

  // 보여줄 최근 영상 정보
  const recentVideo = useAppSelector((state) => state.video.recentVideoData);

  return (
    <MainPaleBox
      widthSize={'45vw'}
      heightSize={'45vh'}
      paddingSize={'0'}
      fontSize={'4vw'}
      fontColor={'black'}
      style={{ border: '5px solid blue' }}
    >
      <p>최근 공부한 영상 여기 넣을게요</p>
      <p>{recentVideo.title}</p>
    </MainPaleBox>
  );
};

export default RecentVideo;
