import React, { PropsWithChildren, MouseEvent } from 'react';
import { VideoDataModalType } from '../../../models/video';
import {
  ModalContainer,
  VideoDataContainer,
  Backdrop,
} from '../../../styles/Main/VideoModalStyle';

const VideoDataModal = ({
  onClickModal,
  children,
}: PropsWithChildren<VideoDataModalType>) => {
  return (
    <ModalContainer>
      <VideoDataContainer>{children}</VideoDataContainer>
      <Backdrop
        onClick={(e: MouseEvent) => {
          e.preventDefault();

          if (onClickModal) {
            onClickModal();
          }
        }}
      ></Backdrop>
    </ModalContainer>
  );
};
export default VideoDataModal;
