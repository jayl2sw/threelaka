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
        <VideoImg src={`https://img.youtube.com/vi/${data.videoId}/0.jpg`} />
        <SubTagContainer>
          {data.korScript && <SubTag>한글자막</SubTag>}
          <SubTag>영어자막</SubTag>
        </SubTagContainer>
      </VideoDataBox>
      {isOpenModal && (
        <VideoDataModal
          isOpenModal={isOpenModal}
          toggle={onClickModal}
          videoData={videoData}
        />
      )}
      <VideoTitle>{data.title}</VideoTitle>
    </VideoCardBlock>
  );
};

export default VideoCard;
