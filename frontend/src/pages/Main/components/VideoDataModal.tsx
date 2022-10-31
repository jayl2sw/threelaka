import React, { PropsWithChildren, MouseEvent } from 'react';
import { VideoDataModalType } from '../../../models';
import {
  ModalContainer,
  VideoDataContainer,
  VideoTitle,
  VideoThumbnail,
  Backdrop,
} from '../../../styles/Main/VideoModalStyle';
import { studyActions } from '../../../features/study/study-slice';
import { useAppDispatch } from '../../../utils/hooks';

import { SubTagContainer, SubTag } from '../../../styles/Main/MainStyle';

const VideoDataModal = (props: VideoDataModalType) => {
  const dispatch = useAppDispatch();

  const video = props.videoData.video;
  const onClickModal = props.toggle;

  // 해당 영상으로 새로운 공부 시작
  const handlerPostStartStudy = (videoId: string) => {
    dispatch(studyActions.postStartStudy(videoId));
  };

  return (
    <ModalContainer onClick={onClickModal}>
      <VideoDataContainer>
        <VideoTitle>{video.title}</VideoTitle>
        <VideoThumbnail
          src={`https://img.youtube.com/vi/${video.videoId}/0.jpg`}
        />
        <SubTagContainer>
          {video.script && (
            <SubTag>
              <p>영어 자막</p>
            </SubTag>
          )}
          {video.script && (
            <SubTag>
              <p>한글 자막</p>
            </SubTag>
          )}
        </SubTagContainer>
        <button
          onClick={() => {
            console.log(video.videoId);
            handlerPostStartStudy(video.videoId);
          }}
        >
          학습 시작하기
        </button>
      </VideoDataContainer>
      {/* <Backdrop
        onClick={(e: MouseEvent) => {
          e.preventDefault();

          if (props.toggle) {
            props.toggle();
          }
        }}
      ></Backdrop> */}
    </ModalContainer>
  );
};
export default VideoDataModal;
