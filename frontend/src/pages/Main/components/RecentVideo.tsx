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
  RecentVideoTitle,
  RecentVideoStageContainer,
  RecentVideoImg,
  RecentVideoStageDataContainer,
  RecentVideoStageBtnContainer,
} from '../../../styles/Main/MainStyle';

const RecentVideo = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // 페이지 렌더링 하기 전에 최근 공부한 영상 요청하기
  useEffect(() => {
    dispatch(videoActions.getRecentVideoData());
  }, []);

  // 보여줄 최근 영상 정보
  const video = useAppSelector((state) => state.video.recentVideoData.video);
  const record = useAppSelector(
    (state) => state.video.recentVideoData.learningRecord
  );

  // 영상 정보 왔나요
  const [isReady, setIsReady] = useState<boolean>();
  useEffect(() => {
    setIsReady(true);
  }, [video]);

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
    if (stage == 'READING') {
      navigate(`study/reading/${learingRecordId}/${stage}/${videoId}`);
    } else if (stage == 'WRITING') {
      navigate(`study/writing/${learingRecordId}/${stage}/${videoId}`);
    } else if (stage == 'SPEAKING') {
      navigate(`study/speaking/${learingRecordId}/${stage}/${videoId}`);
    } else navigate(`/`);
  };

  return (
    <div>
      {isReady && (
        <MainPaleBox
          widthSize={'45vw'}
          heightSize={'45vh'}
          paddingSize={'1.5vw'}
          fontSize={'1.2vw'}
          fontColor={'black'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <RecentVideoTitle>{video.title}</RecentVideoTitle>
          <RecentVideoStageContainer>
            <FlexTransparentDiv
              widthSize={'19vw'}
              heightSize={'22.5vh'}
              paddingSize={'0'}
              flexDirection={'column'}
              justifyContent={'center'}
              alignItems={'center'}
              IsBorder={'none'}
              style={{
                borderTop: '10px solid black',
                borderBottom: '10px solid black',
                borderRadius: '10px',
                background: 'black',
              }}
            >
              <RecentVideoImg
                src={`https://img.youtube.com/vi/${video.videoId}/0.jpg`}
              />
            </FlexTransparentDiv>
            <RecentVideoStageDataContainer>
              <div>
                <p>
                  최근 학습 날짜 : {record.date.substr(0, 4)}년{' '}
                  {record.date.substr(5, 2)}월 {record.date.substr(8, 2)}일
                </p>
                <p>마지막 학습 단계 : {record.stage}</p>
              </div>
              <RecentVideoStageBtnContainer>
                <MainBtn
                  widthSize={'8.5vw'}
                  heightSize={'4vh'}
                  paddingSize={'0'}
                  fontSize={'1vw'}
                  fontColor={'white'}
                  backgroundColor={'black'}
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
              </RecentVideoStageBtnContainer>
            </RecentVideoStageDataContainer>
          </RecentVideoStageContainer>
        </MainPaleBox>
      )}
    </div>
  );
};

export default RecentVideo;
