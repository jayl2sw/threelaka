import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import useModal from '../../../utils/useModal';
import VideoDataModal from './VideoDataModal';
import { videoActions } from '../../../features/video/video-slice';

// style
import {
  VideoCardBlock,
  VideoDataBox,
  VideoImg,
  SubTagContainer,
  SubTag,
  VideoTitle,
} from '../../../styles/Main/MainStyle';
import { FlexTransparentDiv } from '../../../styles/Common/CommonDivStyle';

// video별 갖고 있는 정보들
type VideoCardProps = {
  data: {
    videoId: string;
    title: string;
    description: string;
    korScript: boolean;
  };
};

const VideoCard = ({ data }: VideoCardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [videoUrl, setVideoUrl] = useState<string>('');

  // 모달에 띄워줄 비디오 정보
  const videoData = useAppSelector((state) => state.video.videoData);
  const learningRecord = useAppSelector(
    (state) => state.video.recentVideoData.learningRecord
  );

  // 영상 제목 정제하기
  const cutIndex = data.title.indexOf('|');
  const videoTitle = data.title.substr(0, cutIndex);

  // 영상 정보 조회
  const handlerGetVideoData = (videoId: string) => {
    const videoUrl = `https://youtu.be/${videoId}`;
    dispatch(videoActions.getVideoData(videoUrl));
  };

  // 모달 사용하기
  const { isOpenModal, onClickModal } = useModal();

  // 현재 영상 stage 확인
  const studyState = useAppSelector((state) => state.study.studyState);
  // stage 변경 시 해당 스테이지로 이동
  useEffect(() => {
    if (studyState.stage !== '') {
      navigate(
        `/study/reading/${studyState.learningRecordId}/${studyState.stage}/${studyState.videoId}`
      );
    }
  }, [studyState]);

  return (
    <VideoCardBlock>
      <VideoDataBox
        onClick={() => {
          handlerGetVideoData(data.videoId);
          onClickModal();
        }}
      >
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
          <VideoImg src={`https://img.youtube.com/vi/${data.videoId}/0.jpg`} />
          <SubTagContainer>
            {data.korScript && <SubTag>한글</SubTag>}
            <SubTag>ENG</SubTag>
          </SubTagContainer>
        </FlexTransparentDiv>
      </VideoDataBox>
      {isOpenModal && (
        <VideoDataModal
          isOpenModal={isOpenModal}
          toggle={onClickModal}
          videoData={videoData}
          learningRecord={learningRecord}
        />
      )}
      <VideoTitle>{videoTitle}</VideoTitle>
    </VideoCardBlock>
  );
};

export default VideoCard;
