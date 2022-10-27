import styled from 'styled-components';

// 스피킹 페이지 전체 스타일
export const SpeakingPageBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 85vh;
  padding: 0 10vw 5vh 10vw;
  border: 1px solid black;
`;

export const VideoAudioButtonContainer = styled.div`
  width: 20vw;
  height: 5vh;
  background-color: yellow;
  border: 1px solid orange;
`;

export const VideoAudioContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60vw;
  height: 40vh;
  background-color: #111111;
  /* border-radius: 20px; */
  & Webcam {
    width: 100%;
    height: 100%;
  }
  & video {
    width: 100%;
    height: 100%;
  }
`;

export const VideoOrAudioPick = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 15vw;
  height: 5vh;
  & button {
    background-color: #4a9fff;
    color: white;
  }
`;

export const ModePickContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 15vw;
  height: 5vh;
  & button {
    background-color: #4a9fff;
    color: white;
  }
`;

// 비디오 녹화 스타일

// 에세이 스크립트 스타일
export const EssayContainer = styled.div`
  display: flex;
  width: 60vw;
  height: 20vh;
  background-color: skyblue;
  border-radius: 20px;
`;
