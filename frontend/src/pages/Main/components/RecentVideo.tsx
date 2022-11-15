import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { MainPaleBox } from '../../../styles/Common/CommonDivStyle';
import { videoActions } from '../../../features/video/video-slice';
import { studyActions } from '../../../features/study/study-slice';
// style
import { FlexTransparentDiv } from '../../../styles/Common/CommonDivStyle';
import { MainBtn } from '../../../styles/Common/CommonBtnStyle';
import {
  RecentVideoTextContainer,
  RecentVideoImg,
  RecentVideoDataContainer,
  RecentVideoBtnContainer,
  RecentVideoBox,
  NoRecentVideoYet,
  StudyProgressRegion,
  ProgressBarIndicator,
  RecentData,
} from '../../../styles/Main/RecentVideoStyle';

const RecentVideo = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 최근 공부한 영상 요청하기
  useEffect(() => {
    dispatch(videoActions.getRecentVideoData());
  }, []);

  // 보여줄 최근 영상 정보
  const recentVideoData = useAppSelector(
    (state) => state.video.recentVideoData
  );
  const video = recentVideoData.video;
  const record = recentVideoData.learningRecord;

  // 영상 제목 정제하기
  const cutIndex = video !== undefined ? video.title.indexOf('|') : 0;
  const videoTitle = video !== undefined ? video.title.substr(0, cutIndex) : '';

  // 영상 정보 왔나요
  const [studied, setStudied] = useState<boolean>(false);

  // 공부 새로 시작
  const handlerPostStartStudy = (videoId: string) => {
    dispatch(studyActions.postStartStudy(videoId));
  };

  // 기존의 이동하던 스테이지에서 이어서 공부하기
  const handlerResumeStudy = (
    stage: string,
    learingRecordId: number,
    videoId: string
  ) => {
    if (stage === 'READING') {
      navigate(`/study/reading/${learingRecordId}/${stage}/${videoId}`);
    } else if (stage === 'WRITING') {
      navigate(`/study/writing/${learingRecordId}/${stage}/${videoId}`);
    } else if (stage === 'SPEAKING') {
      navigate(`/study/speaking/${learingRecordId}/${stage}/${videoId}`);
    } else navigate(`/`);
  };

  return (
    <div>
      {Boolean(recentVideoData) !== false && record.learningRecordId !== 0 ? (
        <RecentVideoBox>
          {/* 비디오 썸네일 div */}

          <RecentVideoImg
            src={`https://img.youtube.com/vi/${video.videoId}/0.jpg`}
          />
          {/* 비디오 정보 div(container) */}
          <RecentVideoDataContainer>
            <RecentVideoTextContainer>
              <p className="video-title">{videoTitle}</p>
              <StudyProgressRegion>
                <ProgressBarIndicator className={'indicator-' + record.stage} />
              </StudyProgressRegion>
              <RecentData>
                <div className="data-title">최근 학습일</div>
                <p>
                  {record.date.substr(0, 4)}년 {record.date.substr(5, 2)}월{' '}
                  {record.date.substr(8, 2)}일
                </p>
              </RecentData>
            </RecentVideoTextContainer>
            <RecentVideoBtnContainer>
              <MainBtn
                widthSize={'8.5vw'}
                heightSize={'4vh'}
                paddingSize={'0'}
                fontSize={'1vw'}
                fontColor={'white'}
                backgroundColor={'blue'}
                style={{ marginRight: '0.5vw' }}
                onClick={() => {
                  handlerPostStartStudy(video.videoId);
                }}
              >
                새로 학습하기
              </MainBtn>
              <MainBtn
                widthSize={'8.5vw'}
                heightSize={'4vh'}
                paddingSize={'0'}
                fontSize={'1vw'}
                fontColor={'white'}
                backgroundColor={'blue'}
                style={{ marginLeft: '0.5vw' }}
                onClick={() => {
                  handlerResumeStudy(
                    record.stage,
                    record.learningRecordId,
                    video.videoId
                  );
                }}
              >
                이어서 학습하기
              </MainBtn>
            </RecentVideoBtnContainer>
          </RecentVideoDataContainer>
        </RecentVideoBox>
      ) : (
        <NoRecentVideoYet>
          <img
            src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fk.kakaocdn.net%2Fdn%2Fb26ISo%2FbtrQrujyoK5%2FrQpbto7PFVQZD5ASul9H40%2Fimg.png"
            alt=""
          />
          <p>최근 학습한 영상이 없어요</p>
        </NoRecentVideoYet>
      )}
      {/* <NoRecentVideoYet /> */}
    </div>
  );
};

export default RecentVideo;
