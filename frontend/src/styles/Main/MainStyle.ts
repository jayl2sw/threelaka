import styled from 'styled-components';
// import logoImg from '../../media/images/logo.png';

// 메인페이지 전체
export const MainPageBlock = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  width: 100vw;
  height: 200vh;
  padding: 0 10vw 5vh 10vw;
  border: solid red 1px;
  background: linear-gradient(
    106.56deg,
    rgba(132, 176, 226, 0.1) 7.3%,
    rgba(88, 172, 240, 0.23) 77.68%,
    rgba(174, 243, 147, 0.5) 99.32%
  );
  /* background: white; */
  & .video-title {
  }
`;

export const FirstpageBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  border: solid green 3px;
  flex-direction: column;
`;

// search bar 전체 감싸는 block
export const SearchBarBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 70vh;
  /* border: solid purple 3px; */
  flex-direction: column;
  margin-top: 5vh;
`;
export const LogoBlock = styled.div`
  width: 30vw;
  height: 13vh;
  background-size: 30vw 13vh;
  /* border: 3px pink solid; */
  margin-bottom: 3vw;
`;

export const YoutubeLink = styled.div`
  width: 10vw;
  height: 8vh;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  margin-top: 10vh;
  display: flex;

  cursor: pointer;
`;

// 메인페이지 최근 학습
// export const RecentVideo = styled.div`
//   display: flex;
//   flex-direction: row;
//   margin-top: 10vh;
//   margin-bottom: 10vh;
// `;

export const RecentVideoContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100vw;
  height: 50vh;
  // border: solid yellow 3px;
`;

// 메인페이지 추천 영상
export const RecommendVideos = styled.div`
  display: flex;
  border: 1px solid blue;
`;

export const VideoCardBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 20vw;
  height: 40vh;
  padding: 1vw;
`;

export const VideoDataBox = styled.div`
  position: relative;
  width: 18vw;
  height: 22vh;
  &:hover {
    transition: transform 0.3s;
    transform: scale3d(1.03, 1.03, 1.03);
  }
`;

export const VideoImg = styled.img`
  width: 18vw;
  height: 22vh;
  object-fit: cover;

  // 이미지 위에 자막 정보 띄우기
  position: absolute;
  z-index: -1;
`;

export const SubTagContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  position: absolute;
  right: 0;
  margin-left: auto;
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
  color: #ffffff;
  background: #111111;
  margin-top: 1vh;
  margin-right: 0.5vw;
  border: none;
`;

export const VideoTitle = styled.div`
  position: static;
  margin: 1vh 0 0 0;
  width: 18vw;
  height: 10vh;
`;
