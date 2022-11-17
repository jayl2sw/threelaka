import styled from 'styled-components';

// 메인페이지 전체
export const MainPageBlock = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  width: 100vw;
  height: 200vh;
  padding: 0 10vw 5vh 10vw;
  /* border: solid red 1px; */
  /* background: linear-gradient(
    106.56deg,
    rgba(132, 176, 226, 0.1) 7.3%,
    rgba(88, 172, 240, 0.23) 77.68%,
    rgba(174, 243, 147, 0.5) 99.32%
  ); */
  background: white;
  & .video-title {
  }
`;

export const FirstpageBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  /* border: solid green 3px; */
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
  width: 40vw;
  height: 18vh;
  & img {
    width: 100%;
  }
`;

export const YoutubeLink = styled.div`
  width: 8.5vw;
  height: 6vh;
  margin-top: -5vh;
  margin-right: 1vw;
  margin-bottom: -2vh;
  background: #111111;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1vw;
  & p {
    color: #ffffff;
    font-size: 2.7vmin;
    font-weight: bold;
    font-family: 'PretendardSemiBold';
    margin-bottom: 2.8vh;
  }
  :hover {
    transform: scale(1.05);
  }

  cursor: pointer;
`;
export const FirstCenterBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const PageDownButton = styled.a`
  /* transform: ; */
  font-size: 6.5vmin;
  background: linear-gradient(
    110.64deg,
    #4a9fff 1.5%,
    rgba(88, 172, 240, 1) 25%,
    #b0ff91 70%,
    rgba(88, 172, 240, 1) 85%,
    #4a9fff 90%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 2s linear infinite, boomboom 0.5s alternate infinite;
  cursor: pointer;
  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }

  @keyframes boomboom {
    from {
      transform: translateX(-10%);
    }
    to {
      transform: translateX(10%);
    }
  }

  /* font-weight: bold; */

  & a {
    margin: 0;
  }
`;

// 최근 학습 영상 전체 컨테이너(MainPage)
export const RecentVideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 60vh;
  margin-top: 10vh;
`;

// 추천 영상 관련 스타일링
export const RecommendVideoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 40vh;
  flex-direction: column;
`;

// 메인페이지 추천 영상
export const RecommendVideos = styled.div`
  display: flex;
  width: 20vw;
  height: 50vh;
  /* border: 1px solid blue; */
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

export const ListInfo = styled.div`
  display: flex;
  /* border: solid red 2px; */
  width: 30vw;
  height: 4vh;
  margin-top: 6.2vh;
  flex-direction: row;

  margin-right: 48vw;
  font-size: 3.2vmin;
  font-weight: bold;
  align-items: baseline;
`;

export const VideoImg = styled.img`
  width: 18vw;
  height: 22vh;
  object-fit: cover;

  // 이미지 위에 자막 정보 띄우기
  position: absolute;
  /* z-index: -1; */
`;

export const SubTagContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  position: absolute;
  margin-bottom: 17vh;
  right: 0;
  margin-right: -0.8vw;
  /* border: solid 3px green; */
  width: 10vw;
  height: 5vh;
`;

export const SubTag = styled.button`
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 3.5vw;
  height: 3vh;
  font-weight: bold;
  font-size: 0.9vw;
  color: white;
  /* background: #111111; */
  background: black;
  opacity: 0.8;
  margin-top: 0.5vh;
  margin-right: 0.5vw;
  border: solid 3px black;
  font-family: 'PretendardLight';
  z-index: 1;
`;

export const VideoTitle = styled.div`
  position: static;
  margin: 2vh 0 0 0;
  width: 18vw;
  height: 10vh;
  padding-left: 0.3vw;
  font-size: 2.2vmin;
  font-family: 'PretendardRegular';
`;
