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
  /* border: 1px solid red; */
`;

export const VideoAudioContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 32vw;
  height: 32vh;
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

export const VideoAudioBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 24vw;
  height: 20vh;
  margin-top: 1vh;
`;

export const VideoAudioBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  /* width: 5vw; */
  height: 6.5vh;
  font-size: 1.2rem;
  border-radius: 50%;
  padding: 0.7vh 0.8vw;
  color: #ffffff;
  background-color: #111111;
  margin: 1vh 0.5vw;
  cursor: pointer;
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
  flex-direction: column;
  width: 60vw;
  height: 20vh;
  background-color: skyblue;
  border-radius: 20px;
  overflow: scroll;
`;

export const TextBox = styled.div`
  width: 20rem;
  height: 10rem;
  margin: 5rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  background-color: #febf00;
  transition: 0.4s;
  &.active {
    width: 20rem;
    background: #f03d3d;
    color: #fff;
  }
`;
