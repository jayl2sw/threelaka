import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// style
import {
  VideoCardBlock,
  VideoImg,
  SubTagContainer,
  SubTag,
} from '../../../styles/Main/MainStyle';
import { MainBtn } from '../../../styles/Common/CommonBtnStyle';
import { MainBox } from '../../../styles/Common/CommonDivStyle';

// video별 갖고 있는 정보들
// 이것도 interface?? 모르겠어 9ㅅ9
type VideoCardProps = {
  data: {
    videoId: string;
    title: string;
    description: string;
    korScript: boolean;
  };
};

const VideoCard = ({ data }: VideoCardProps) => {
  return (
    <VideoCardBlock>
      <VideoImg src={`https://img.youtube.com/vi/${data.videoId}/0.jpg`} />
      <p className="video-title">{data.title}</p>
      <SubTagContainer>
        <SubTag>
          <p>영어자막</p>
        </SubTag>
        {data.korScript && (
          <SubTag>
            <p>한글자막</p>
          </SubTag>
        )}
      </SubTagContainer>
    </VideoCardBlock>
  );
};

export default VideoCard;
