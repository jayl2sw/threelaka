import styled from 'styled-components';

// 메인페이지 전체
export const MainPageBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 85vh;
  padding: 0 10vw 5vh 10vw;

  & .video-title {
  }
`;

// 메인페이지 검색
export const SearchBarContainer = styled.div``;

export const SearchBar = styled.div``;

// 메인페이지 최근 학습
export const RecentVideoContainer = styled.div``;

export const RecentVideo = styled.div``;

// 메인페이지 추천 영상
export const RecommendVideos = styled.div`
  display: flex;
`;

export const VideoCardBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5rem;

  & .video-title {
  }
`;

export const VideoImg = styled.img`
  width: 300px;
  height: 200px;
  object-fit: cover;

  &:hover {
    transition: transform 0.3s;
    transform: scale3d(1.03, 1.03, 1.03);
  }
`;

export const SubTagContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
`;

export const SubTag = styled.button`
  border-radius: 10px;
  padding: 5px;
  margin: 0.5rem;
`;
