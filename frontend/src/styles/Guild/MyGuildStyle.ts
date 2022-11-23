import styled from 'styled-components';

interface ProgressDivProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  widthSize: string;
  heightSize: string;
  progressPercent: number;
  animeIdx: number;
  profileNum: string;
}

interface GuildDivProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  widthSize: string;
  heightSize: string;
  progressPercent: number;
}

interface AssignDivProps extends React.ButtonHTMLAttributes<HTMLImageElement> {
  dueDate: string;
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
    transition: width 2s;
  }

  &.off {
    :before {
      width: 0;
    }
  }

  &:after {
    content: '';
    position: absolute;
    z-index: 1;
    width: 3vmin;
    height: 3vmin;
    top: -0.5vmin;
    background: ${(props) =>
      `url('https://threelaka.s3.ap-northeast-2.amazonaws.com/profile${props.profileNum}.png')`};
    background-size: 3vmin 3vmin;
    left: ${(props) => `${props.progressPercent - 3}%`};
  }
`;

export const GuildProgressbar = styled.div<GuildDivProps>`
  /* background-color: black; */
  height: ${(props) => props.heightSize};
  width: ${(props) => props.widthSize};
  position: relative;
  border-radius: 20px;
  box-shadow: none;
  background: linear-gradient(
    106.62deg,
    #83bdff 8.18%,
    rgba(136, 192, 255, 0.90051) 49.26%,
    #8dc2ff 69.16%,
    #c1ffa9 92.42%
  );
  transition: width 2s;

  &.off {
    width: 0;
  }
`;

export const AssignmentDiv = styled.div<AssignDivProps>`
  /* background-color: black; */
  width: 15vw;
  height: 20vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin: 0.5vw;
  position: relative;
  &:hover {
    :after {
      position: absolute;
      font-family: 'PretendardBold';
      width: 15vw;
      height: 18vh;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      background: rgba(0, 0, 0, 0.5);
      content: '${(props) => `~${props.dueDate}`}';
      z-index: 1;
      color: white;
      font-size: 3vmin;
    }
  }
`;
