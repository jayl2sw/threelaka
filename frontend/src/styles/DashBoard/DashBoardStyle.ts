import styled from 'styled-components';
import { MdChangeCircle } from 'react-icons/md';
import { MdOutlineCancel, MdCheckCircleOutline } from 'react-icons/md';

export const VideoBlock = styled.div`
  display: flex;
  flex-direction: column;
  width: 38vw;
  height: 38.5vh;
`;

export const DashBoardBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
    106.56deg,
    rgba(132, 176, 226, 0.5) 7.3%,
    rgba(88, 172, 240, 0.43) 77.68%,
    rgba(174, 243, 147, 0.5) 99.32%
  );
`;

export const DashBoardContainer = styled.div`
  display: flex;
  justify-content: start;
  /* border: 3px solid black; */
  width: 80vw;
  height: 80vh;
`;

export const SideBarBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  min-width: 13vw;
  height: 90vh;
  background-color: #111111;

  border-radius: 1rem;
`;

export const DashBoardBox = styled.div`
  //빨간선
  display: flex;
  flex-direction: column;
  /* margin: 3vh auto;
  padding: 3vh; */
  width: 68vw;
  /* border: solid red 1px; */
  height: 82vh;
  margin-top: 4vh;
  margin-left: 2vw;
`;

export const RecentVideoContainer = styled.div`
  &.recentVideo {
    animation: smoothAppear 1s ease-in-out;
  }
  &.completedVideo {
    animation: smoothAppearTwo 1s ease-in-out;
  }
  @keyframes smoothAppear {
    from {
      opacity: 0;
      transform: translateY(-5%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes smoothAppearTwo {
    from {
      opacity: 0;
      transform: translateY(-5%);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const WeekdayIndocatorContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0vw, 3vw)); //여기 찾아봐야할듯
  /* grid-template-rows: 1; */
  .weekday-indicator-icon {
    color: #4a9fff;
    height: 1vh;
    width: 3vw;
    display: flex;
    justify-self: center;
    justify-content: center;
    align-items: center;
    /* padding: 1vw; */
    font-weight: bold;
    /* cursor: pointer; */
  }
`;

export const DateIndicatorContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0vw, 2vw));
  grid-template-rows: repeat(6, minmax(0vh, 3vh)); //달력세로
  grid-gap: 1vw;
  /* padding: 0 1vw; */
  .date-icon {
    display: flex;
    justify-content: center;
    justify-self: center;
    align-items: center;
    height: 2vh;
    width: 2vw;
    padding: 1vw;
    /* margin-left: 1vw; */
    /* cursor: pointer; */
  }
  .noStudy {
    background: none;
  }
  .verybad {
    background: #b9ddd3;
    border-radius: 1vw;
  }
  .bad {
    background: #97cdbd;
    border-radius: 1vw;
  }
  .well {
    background: #74bca6;
    border-radius: 1vw;
  }
  .good {
    background: #52aa90;
    border-radius: 1vw;
  }
  .verygood {
    background: #4c9d85;
    border-radius: 1vw;
  }

  .streak:hover:before {
    content: attr(data-tooltip);
    position: absolute;
    width: 10vw;
    padding: 1vh 1vw;

    margin: 10vh 0 0 0;

    background: #ffb200;
    color: white;
    border-radius: 3px;
    font-size: 2vmin;
    text-align: center;
  }

  .streak:hover:after {
    content: '';
    position: absolute;
    margin: 2vh 0 0 0.1vw;
    width: 0;
    height: 0;
    transform: translateY(100%);
    border-bottom: 0.8vw solid #ffb200;
    border-left: 0.8vw solid transparent;
    border-right: 0.8vw solid transparent;
  }
`;

export const MonthIndicatorContainer = styled.div`
  display: flex;
  justify-content: center;
  justify-self: center;
  align-items: center;
  height: 2vh;
  width: 2vw;
  margin-top: 1vh;
  font-size: 2.2vmin;

  .month {
    display: flex;
    justify-content: center;
    justify-self: center;
    align-items: center;
    height: 2vh;
    width: 2vw;
    padding: 3vw;
  }
`;

export const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const GraphBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.5vh;
  tspan {
    font-size: 2vmin;
    font-family: PretendardBold;
    color: #565656;
    /* color: #565656 !important; */
  }
  background: linear-gradient(
    106.56deg,
    rgba(132, 176, 226, 0.5) 7.3%,
    rgba(88, 172, 240, 0.43) 77.68%,
    rgba(174, 243, 147, 0.5) 99.32%
  );
  width: 41vw;
  height: 43vh;
  border-radius: 1rem;
  position: relative;
  .graph-container {
    width: 40vw;
    height: 30vh;
  }
  .graph {
    position: absolute;
    top: 4vh;
    left: 0.5vw;
    height: 100%;
    width: 100%;
  }
  .indicator {
    font-size: 2vmin;
  }
`;

export const DailyBoardContainer = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 38vw);
  grid-template-rows: repeat(2, 38.5vh);
`;

export const GradientBorderBox = styled.div`
  margin-top: 4vh;
  margin-left: 3.7vw;
  background: linear-gradient(
    106.56deg,
    rgba(132, 176, 226, 0.5) 7.3%,
    rgba(88, 172, 240, 0.43) 77.68%,
    rgba(174, 243, 147, 0.5) 99.32%
  );
  width: 26vw;
  height: 47vh;
  border-radius: 1rem;
  position: relative;
  .innerBox {
    position: absolute;
    top: 1vh;
    left: 0.5vw;
    background: #fff;
    border-radius: 0.8rem;
    height: 45vh;
    width: 25vw;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  .dynamic-text-shadow {
    position: absolute;
    top: -6vh;
    right: 0vw;
    font-style: italic;
    margin: 0;
    line-height: 2vmin;
    display: flex;
    align-items: center;
    text-align: center;
    font-variant: small-caps;
    font-family: 'pretendardextrabold';
    color: white;
    text-shadow: 0 0 6px #457b9d, 0 0 6px #457b9d, 0 0 6px #457b9d,
      0 0 6px #457b9d, 0 0 6px #457b9d, 0 0 6px #457b9d, 0 0 6px #457b9d,
      0 0 6px #457b9d, 0 0 6px #457b9d, 0 0 6px #457b9d, 0 0 6px #457b9d,
      0 0 6px #457b9d, 0 0 6px #457b9d, 0 0 6px #457b9d, 0 0 6px #457b9d,
      0 0 6px #457b9d, 0 0 6px #457b9d, 0 0 6px #457b9d, 0 0 6px #457b9d,
      0 0 6px #457b9d, 0 0 6px #457b9d;
    font-size: 5.5vmin;
  }
`;

export const Count = styled.div`
  & span {
    text-shadow: 0 0 5px #457b9d, 0 0 5px #457b9d; //텍스트 테두리
  }
  color: white;
  font-size: 5.5vmin;
  font-family: 'pretendardbold';
`;

export const ProfileContainer = styled.div`
  h3 {
    margin: 0;
  }
  display: grid;
  height: 90vh;
  grid-template-columns: repeat(2, 34vw);
  /* grid-template-rows: repeat(2, 38.5vh); */
`;

export const ProfileImgBox = styled.div`
  width: 15vmin;

  z-index: 1;
  /* top: -38vmin; */
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: red; */

  .default {
    background: url('https://threelaka.s3.ap-northeast-2.amazonaws.com/profile1.png')
      no-repeat center;
    background-size: 10vmin 10vmin;
  }
  .profileImg1 {
    background: url('https://threelaka.s3.ap-northeast-2.amazonaws.com/profile1.png')
      no-repeat center;
    background-size: 12vmin 11vmin;
  }
  .profileImg2 {
    background: url('https://threelaka.s3.ap-northeast-2.amazonaws.com/profile2.png')
      no-repeat center;
    background-size: 10vmin 10vmin;
  }
  .profileImg3 {
    background: url('https://threelaka.s3.ap-northeast-2.amazonaws.com/profile3.png')
      no-repeat center;
    background-size: 10vmin 10vmin;
  }
  .profileImg4 {
    background: url('https://threelaka.s3.ap-northeast-2.amazonaws.com/profile4.png')
      no-repeat center;
    background-size: 10vmin 10vmin;
  }
`;

export const ProfileCenter = styled.div`
  width: 100%;
  height: 100%;
`;

export const ModalBackdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;

export const ModalView = styled.div.attrs((props) => ({
  role: 'dialog',
}))`
  margin-bottom: 65vh;
  margin-left: 10vw;

  flex-direction: column;
  padding: 1vw;
  /* width: 20vw; */
  height: 17vh;
  display: flex;
  background: #ffffff;
  box-shadow: 5px 5px 5px rgba(63, 39, 102, 0.25);
  border-radius: 2vmin;
`;

export const RadioBtn = styled.input`
  display: none;

  :checked + div {
    outline: 3px solid #4a9fff;
    border-radius: 50%;
  }
`;

export const EditBtn = styled(MdChangeCircle)`
  position: absolute;
  bottom: 1vmin;
  right: 1vmin;
  font-size: 3vmin;
  color: #457b9d;
  cursor: pointer;
  transition: 0.3s;
  /* z-index: 3; */
  /* position: absolute; */

  /* top: 13vh; */

  &:hover {
    color: #3b6986;
    width: 4vmin;
    height: 4vmin;
    bottom: 0.5vmin;
    right: 0.5vmin;
  }
`;

export const BtnDiv = styled.div`
  display: flex;
  justify-content: center;

  margin-top: 1vh;
`;

export const CancelBtn = styled(MdOutlineCancel)`
  font-size: 3.5vmin;
  color: #db1d49;
  cursor: pointer;

  &:hover {
    font-size: 3.8vmin;
  }
`;

export const CheckBtn = styled(MdCheckCircleOutline)`
  font-size: 3.5vmin;
  color: #00c3a9;
  cursor: pointer;
  margin-right: 0.5vw;

  &:hover {
    font-size: 3.8vmin;
  }
`;

export const WordTestInput = styled.input`
  background: rgba(88, 172, 240, 0.2);
  padding: 1vh 1vw;
  border: none;
  outline: none;
  border-radius: 1vmin;
  font-size: 2.5vmin;
  width: 10vw;

  &.right {
    border: none;
    background: #b9ddd3;
    color: #308068;
  }
`;

export const RightAlert = styled.div`
  z-index: 1;
  position: absolute;
  top: 5vh;
  left: 2vw;
  font-style: italic;
  margin: 0;
  line-height: 2vmin;
  display: flex;
  align-items: center;
  text-align: center;
  font-variant: small-caps;
  font-family: 'pretendardextrabold';
  color: white;
  text-shadow: 0 0 6px #457b9d, 0 0 6px #457b9d, 0 0 6px #457b9d,
    0 0 6px #457b9d, 0 0 6px #457b9d, 0 0 6px #457b9d, 0 0 6px #457b9d,
    0 0 6px #457b9d, 0 0 6px #457b9d, 0 0 6px #457b9d, 0 0 6px #457b9d,
    0 0 6px #457b9d, 0 0 6px #457b9d, 0 0 6px #457b9d, 0 0 6px #457b9d,
    0 0 6px #457b9d, 0 0 6px #457b9d, 0 0 6px #457b9d, 0 0 6px #457b9d,
    0 0 6px #457b9d, 0 0 6px #457b9d;
  font-size: 6vmin;
  @keyframes bounce {
    0% {
      /* text-shadow: 0 5px 0 #ccc, 0 2px 3px rgba(0, 0, 0, 1); */
    }
    100% {
      transform: translateY(10px);
      /* text-shadow: 0 50px 0 #black, 0 0px 20px rgba(0, 0, 0, 0.8); */
    }
  }
  animation: bounce 0.6s;
`;

export const HistoryCounterContainer = styled.div`
  .historyTitle {
    color: #111111;
    box-shadow: inset 0 0 0 0 #54b3d6;
    :hover {
      color: #fff;
      box-shadow: inset 200px 0 0 0 #4a9fff;
      cursor: pointer;
    }
    transition: color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  }
`;
