import React, { useEffect } from 'react';
import { VideoDataModalType } from '../../../models';
import {
  ModalContainer,
  VideoDataContainer,
  VideoTitle,
  VideoThumbnail,
} from '../../../styles/Main/VideoModalStyle';
import { studyActions } from '../../../features/study/study-slice';
import { useAppDispatch } from '../../../utils/hooks';

import { SubTagContainer, SubTag } from '../../../styles/Main/MainStyle';
import { MainBtn } from '../../../styles/Common/CommonBtnStyle';
import { useNavigate } from 'react-router-dom';

const VideoDataModal = (props: VideoDataModalType) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const video = props.videoData.video;
  const record = props.learningRecord;

  const onClickModal = props.toggle;

  // 해당 영상으로 새로운 공부 시작
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
        <div style={{ display: 'flex', flexDirection: 'row' }}>
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
          {record.stage && (
            <MainBtn
              widthSize={'8.5vw'}
              heightSize={'4vh'}
              paddingSize={'0'}
              fontSize={'1vw'}
              fontColor={'white'}
              backgroundColor={'black'}
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
          )}
        </div>
      </VideoDataContainer>
    </ModalContainer>
  );
};
export default VideoDataModal;
