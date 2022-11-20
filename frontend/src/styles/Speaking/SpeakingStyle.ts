import styled from 'styled-components';
import { BsCircleFill } from 'react-icons/bs';
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
  justify-content: center;
  align-items: center;
  width: 32vw;
  height: 32vh;
  /* background-color: #111111; */
  /* border-radius: 20px; */
  & Webcam {
    width: 100%;
    height: 100%;
  }
  & video {
    width: 100%;
    height: 100%;
  }
  & p {
    margin-top: 4vh;
  }
`;

export const VideoAudioBtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  /* width: 24vw; */
  height: 8vh;
  margin-top: 1vh;
`;

export const VideoAudioBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 6.5vmin;
  height: 6.5vmin;
  font-size: 1.2rem;
  border-radius: 50%;
  padding: 0.7vh 0.8vw;
  color: #ffffff;
  background-color: #111111;
  margin: 1vh 0.5vw;
  cursor: pointer;
`;

type ModePickContainerProps = {
  heightSize: string;
};
export const ModePickContainer = styled.div<ModePickContainerProps>`
  width: 6vw;
  height: ${(props) => props.heightSize};
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  & .not-active {
    opacity: 0.5;
  }
`;

export const EssayScreenContainer = styled.div`
  width: 50vw;
  height: 30vh;
`;

// 에세이 스크립트 스타일
export const EssayContainer = styled.div`
  width: 50vw;
  height: 30vh;
  border-radius: 2vmin;
  display: flex;
  flex-direction: column;
  padding: 0.5vh 0.5vw;
  overflow: scroll;
  .trigger {
    display: none;
  }
`;

export const TextContainer = styled.div`
  margin-top: 1vh;
`;
export const TextBox = styled.div`
  width: 50vw;
  margin: 5rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3vmin;
  font-family: 'PretendardRegular';
  color: #9897a9;
  transition: 0.4s;
  &.active {
    font-size: 3.8vmin;
    width: 50vw;
    background-color: #8dc2ff;
    color: #fff;
  }
`;

export const SpeechTestContainer = styled.div`
  height: 82vh;
`;

export const SpeechTestBox = styled.div`
  height: 50vh;
  border: 1px solid green;
`;

// export const SpeechTestBox = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   padding: 1vw;
//   background-color: rgba(255, 255, 255, 0.5);
//   box-shadow: 5px 5px 5px rgba(63, 39, 102, 0.25);
//   border-radius: 2vmin;
//   border: 1px solid green;
// `;

export const RecordBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .test-recorder {
    height: 10vh;
  }
  &.noEssay {
    pointer-events: none;
    visibility: hidden;
  }
`;

export const ScoreIndicatorBlock = styled.div`
  margin-right: 2vw;
  .indicator {
    margin: 0 auto;
    padding: 0;
    list-style-type: none;
  }

  .indicator *,
  .indicator::before {
    box-sizing: border-box;
  }

  /* indicator STYLES
–––––––––––––––––––––––––––––––––––––––––––––––––– */

  .indicator {
    position: relative;
    width: 350px;
    height: 175px;
    overflow: hidden;
  }

  .indicator::before,
  .indicator::after {
    position: absolute;
  }

  .indicator::before {
    content: '';
    width: inherit;
    height: inherit;
    border: 45px solid rgba(211, 211, 211, 0.3);
    border-bottom: none;
    border-top-left-radius: 175px;
    border-top-right-radius: 175px;
  }

  .indicator span.bar {
    position: absolute;
    top: 100%;
    left: 0;
    width: inherit;
    height: inherit;
    border: 45px solid;
    border-top: none;
    border-bottom-left-radius: 175px;
    border-bottom-right-radius: 175px;
    transform-origin: 50% 0;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    animation-fill-mode: forwards;
    animation-duration: 0.4s;
    animation-timing-function: linear;
    z-index: 4;
    border-color: rgba(74, 159, 255, 1);
    animation-name: rotate-one;
  }

  .indicator span.result {
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    font-size: 1.1rem;
    font-weight: bold;
    color: cadetblue;
    text-align: center;
  }

  span.result span:nth-child(1) {
    font-size: 2rem;
  }

  @keyframes rotate-one {
    0% {
      transform: rotate(0);
    }
  }
`;

export const SpeechResultBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  min-height: 33vh;
  /* flex-wrap: wrap; */
  /* width: auto; */
`;

export const ScoreTextBox = styled.div`
  .bad {
    background-color: #b9ddd3;
  }
  .well {
    background-color: #97cdbd;
  }
  .good {
    background-color: #74bca6;
  }
  .verygood {
    background-color: #52aa90;
  }
  letter-spacing: 1.5px;
`;

export const ColorScoreIndicator = styled.div`
  .box {
    display: flex;
  }
  .innerBox {
    display: flex;
    align-items: center;
    margin-right: 1vw;
  }
`;
export const MarkedTextBox = styled.div`
  text-align: end;
`;

export const ScoreIcon = styled(BsCircleFill)`
  font-size: 2vmin;

  &.bad {
    color: #b9ddd3;
  }
  &.well {
    color: #97cdbd;
  }
  &.good {
    color: #74bca6;
  }
  &.verygood {
    color: #52aa90;
  }
`;

export const Score = styled.div`
  margin-left: 0.3vw;
`;

export const ErrorBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 24vh;
`;
export const ErrorText = styled.div`
  font-size: 3vmin;
  margin: 0.5vw;
`;

export const EssayOnOffContainer = styled.div`
  width: 6vw;
  height: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  & .not-active {
    opacity: 0.5;
  }
`;
