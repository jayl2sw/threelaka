import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

// 스타일
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem;

  & .video-title {
  }
`;

const VideoImg = styled.img`
  width: 300px;
  height: 200px;
  object-fit: cover;

  &:hover {
    transition: transform 0.3s;
    transform: scale3d(1.03, 1.03, 1.03);
  }
`;

const SubTag = styled.img`
  border-radius: 10px;
  padding: 5px;
  margin: 0.5rem;
`;

// video별 갖고 있는 정보들
type VideoThumbnailProps = {
  video_id: number;
  title: string;
  script: boolean;
  script_kor: boolean;
};

const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
  video_id,
  title,
  script_kor,
  script,
}) => {
  return (
    <Wrapper>
      <Link to={`/study/${video_id}`}>
        <VideoImg src={`https://img.youtube.com/vi/${video_id}/0.jpg`} />
        <p className="video-title">{title}</p>
        <SubTag>{script_kor && <p>한글자막</p>}</SubTag>
        <SubTag>{script && <p>영어자막</p>}</SubTag>
      </Link>
    </Wrapper>
  );
};

export default VideoThumbnail;
