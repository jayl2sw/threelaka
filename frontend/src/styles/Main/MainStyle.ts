import styled from 'styled-components';

// 메인페이지 전체
export const MainPageBlock = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  width: 100vw;
  height: 85vh;
  padding: 0 10vw 5vh 10vw;

  & .video-title {
  }
`;

// 메인페이지 최근 학습
export const RecentVideo = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 10vh;
  margin-bottom: 10vh;
`;

export const RecentVideoContainer = styled.div``;

// 메인페이지 추천 영상
export const RecommendVideos = styled.div`
  display: flex;
  border: 1px solid blue;
`;

export const VideoCardBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 20vw;
  /* border: 1px solid red; */
  padding: 1vw;

  & .video-title {
    margin: 1vh 0 0 0;
  }
`;

export const VideoImg = styled.img`
  width: 18vw;
  height: 22vh;
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
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 4.5vw;
  height: 3vh;
  font-size: 0.9vw;
  color: 'white';
  background-color: 'blue';
  margin-top: 1vh;
  margin-right: 0.5vw;
`;
