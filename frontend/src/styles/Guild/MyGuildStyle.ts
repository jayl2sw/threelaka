import styled from 'styled-components';

interface ProgressDivProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  widthSize: string;
  heightSize: string;
  progressPercent: number;
}

export const MyGuildBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3vh auto;
  padding: 3vh;
  width: 75vw;
  border: solid red 1px;
`;

export const LearnTimeProgressbar = styled.div<ProgressDivProps>`
  background-color: black;
  height: ${(props) => props.heightSize};
  width: ${(props) => props.widthSize};
  position: relative;
  border-radius: 20px;
  box-shadow: none;

  &:before {
    position: absolute;
    content: '';
    /* z-index: 1; */
    background: linear-gradient(
      106.62deg,
      #83bdff 8.18%,
      rgba(136, 192, 255, 0.90051) 49.26%,
      #8dc2ff 69.16%,
      #c1ffa9 92.42%
    );
    left: -1px;
    width: ${(props) => `${props.progressPercent}%`};
    height: 2vh;
    border-radius: 20px;
  }

  &:after {
    content: '';
    position: absolute;
    z-index: 1;
    width: 2vmin;
    height: 2vmin;
    background: url('https://threelaka.s3.ap-northeast-2.amazonaws.com/profile1.png');
    background-size: 2vmin 2vmin;
    left: ${(props) => `${props.progressPercent - 3}%`};
  }
`;
