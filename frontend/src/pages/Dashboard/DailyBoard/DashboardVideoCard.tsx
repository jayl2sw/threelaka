import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import useModal from '../../../utils/useModal';

import VideoDataModal from '../../Main/components/VideoDataModal';
import VideoModal from '../../../utils/VideoModal';
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
    continueTime: string;
    stage: string;
    title: string;
    videoId: string;
  };
  setModalToggleVideoId: (nextVideoId: string) => void;
};

const DashboardVideoCard = ({
  data,
  setModalToggleVideoId,
}: VideoCardProps) => {
  // 영상 제목 정제하기
  const cutIndex = data.title.indexOf('|');
  const videoTitle =
    cutIndex !== -1
      ? data.title.substr(0, cutIndex)
      : data.title.substr(data.title.indexOf(':') + 1);

  return (
    <VideoCardBlock
      onClick={() => {
        console.log('클릭');
        setModalToggleVideoId(data.videoId);
      }}
      style={{ cursor: 'pointer', padding: '0', minWidth: '20vw' }}
    >
      <VideoDataBox>
        <FlexTransparentDiv
          widthSize={'19vw'}
          heightSize={'20vh'}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'none'}
          style={{
            marginTop: '1.5vh',
            borderTop: '10px solid black',
            borderBottom: '10px solid black',
            borderRadius: '10px',
            background: 'black',
          }}
        >
          <VideoImg
            src={`https://img.youtube.com/vi/${data.videoId}/0.jpg`}
            style={{ height: '16vh' }}
          />
          <SubTagContainer>
            {/* {data.korScript && <SubTag>한글</SubTag>} */}
            <SubTag>ENG</SubTag>
          </SubTagContainer>
        </FlexTransparentDiv>
      </VideoDataBox>
      <VideoTitle>{videoTitle}</VideoTitle>
    </VideoCardBlock>
  );
};

export default DashboardVideoCard;
