import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  VideoCardBlock,
  VideoImg,
  SubTagContainer,
  SubTag,
} from '../../../styles/Main/MainStyle';

// video별 갖고 있는 정보들
// 이것도 interface?? 모르겠어 9ㅅ9
type VideoCardProps = {
  data: {
    videoId: string;
    title: string;
    script: boolean;
    script_kor: boolean;
  };
};

const VideoCard = ({ data }: VideoCardProps) => {
  return (
    <VideoCardBlock>
      <Link to={`/study/${data.videoId}`}>
        <VideoImg src={`https://img.youtube.com/vi/${data.videoId}/0.jpg`} />
      </Link>
      <p className="video-title">{data.title}</p>
      <SubTagContainer>
        {data.script_kor && (
          <SubTag>
            <p>한글자막</p>
          </SubTag>
        )}
        {data.script && (
          <SubTag>
            <p>영어자막</p>
          </SubTag>
        )}
      </SubTagContainer>
    </VideoCardBlock>
  );
};

export default VideoCard;
