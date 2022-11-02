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
  width: 57vw;
  height: 33vh;
  /* padding: 0; */
  /* font-size: 1.5vmin; */

  background: #ffffff;
  box-shadow: 5px 5px 5px rgba(63, 39, 102, 0.25);
  border-radius: 2vmin;
  display: flex;
  flex-direction: column;

  overflow: scroll;
  .trigger {
    display: none;
  }
`;

export const TextContainer = styled.div`
  margin-top: 4vh;
`;
export const TextBox = styled.div`
  width: 50vw;
  /* height: 10rem; */
  /* padding-top: 5vh; */
  margin: 5rem auto;
  /* margin-bottom: 1vh; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4vmin;
  color: #9897a9;
  /* background-color: #febf00; */
  transition: 0.4s;
  &.active {
    font-size: 4vmin;
    width: 50vw;
    background-color: #8dc2ff;
    color: #fff;
  }
`;

export const SpeechTestContainer = styled.div`
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: center; */
  /* align-items: center; */
  padding-top: 3vh;
  height: 90vh;
`;

export const SpeechTestBox = styled.div`
  padding: 1vw;
  background-color: rgba(255, 255, 255, 0.5);
  box-shadow: 5px 5px 5px rgba(63, 39, 102, 0.25);
  border-radius: 2vmin;
`;

export const RecordBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .test-recorder {
    height: 10vh;
  }
`;
