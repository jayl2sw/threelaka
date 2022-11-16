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
  border: 3px solid black;
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
    width: 9vw;
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
    border-bottom: 0.4vw solid #ffb200;
    border-left: 0.4vw solid transparent;
    border-right: 0.4vw solid transparent;
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
  margin-top: 0.5vh;
  tspan {
    font-size: 2vmin;
    font-family: PretendardBold;
    color: #565656;
    /* color: #565656 !important; */
  }
  background: linear-gradient(
    110.64deg,
    #4a9fff 5.65%,
    rgba(88, 172, 240, 0.861458) 45.15%,
    #b0ff91 84.64%
  );
  width: 37vw;
  height: 39.5vh;
  border-radius: 1rem;
  position: relative;
  .graph {
    position: absolute;
    top: 1vh;
    left: 0.5vw;
  }
`;

export const DailyBoardContainer = styled.div`
  display: grid;

  grid-template-columns: repeat(2, 38vw);
  grid-template-rows: repeat(2, 38.5vh);
`;

export const GradientBorderBox = styled.div`
  /* margin-top: 0.5vh; */
  margin-left: 3.7vw;
  background: linear-gradient(
    110.64deg,
    #4a9fff 5.65%,
    rgba(88, 172, 240, 0.861458) 45.15%,
    #b0ff91 84.64%
  );
  width: 26vw;
  height: 48vh;
  border-radius: 1rem;
  position: relative;
  .innerBox {
    position: absolute;
    top: 1vh;
    left: 0.4vw;
    background: #fff;
    border-radius: 1rem;
    height: 46vh;
    width: 25vw;
  }
`;

export const Wrapper = styled.div`
  position: relative;
  .dynamic-text-shadow {
    top: -1vh;
    position: absolute;
    left: 11.5vw;
    font-style: italic;
    margin: 0;
    /* font-size: 5vmin; */
    line-height: 2vmin;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.5vmin;
    font-variant: small-caps;
    /* font-weight: bolder; */
    font-family: 'pretendardbold';
    color: #457b9d;
    /* text-shadow: 0.3vmin 0.3vmin 0 #1d3557; */
    & span {
      -webkit-text-stroke: 0.8px white; //텍스트 테두리
    }
    color: #457b9d;
    font-size: 5.5vmin;
  }
`;

export const Count = styled.div`
  & span {
    -webkit-text-stroke: 2px #111111; //텍스트 테두리
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
  /* position: absolute;
  left: -1rem;
  display: flex;
  align-items: center;
  width: 120%;
  margin-top: 1rem;
  background: red; */
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
  font-size: 3vmin;
  color: #457b9d;
  cursor: pointer;
  /* z-index: 3; */
  /* position: absolute; */

  /* top: 13vh; */

  &:hover {
    color: #3b6986;
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
