import styled from 'styled-components';

interface EozBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  widthSize: string;
  heightSize: string;
  fontColor: 'white' | 'black' | 'blue';
  backgroundColor: 'blue' | 'gradient' | 'black' | 'grey' | 'red';
}

export const WaitingRoomBlock = styled.div`
  width: 67vw;
  height: 78vh;
  /* border: 1px solid black; */
  margin-left: 1.2vw;
  display: flex;
  flex-direction: column;

  & p {
    margin: 0;
  }
`;

export const RoomNumBtnContainer = styled.div`
  font-family: 'PretendardRegular';
`;

// 방 선택 상단 버튼
export const RoomNumBtn = styled.button`
  width: 5vw;
  height: 3.5vh;
  padding: 0.5vh 0.5vw;
  margin-right: 0.2vw;
  background: #4f9fff;
  border-top-left-radius: 1vmin;
  border-top-right-radius: 1vmin;
  border: none;
  font-family: 'PretendardRegular';
  font-size: 1vw;
  color: #ffffff;
  cursor: pointer;
  & .not-active {
    opacity: 0.5;
  }
`;

export const EozBtn = styled.button<EozBtnProps>`
  width: ${(props) => props.widthSize};
  height: ${(props) => props.heightSize};
  padding: 1vw;
  margin: 1vh 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1vw;
  color: ${(props) =>
    props.fontColor === 'white'
      ? '#ffffff'
      : props.fontColor === 'black'
      ? '#111111'
      : props.fontColor === 'blue'
      ? '#4a9fff'
      : '#111111'};
  background: ${(props) =>
    props.backgroundColor === 'blue'
      ? '#4a9fff'
      : props.backgroundColor === 'gradient'
      ? 'linear-gradient(106.62deg, #83BDFF 8.18%, rgba(136, 192, 255, 0.90051) 49.26%, #8DC2FF 69.16%, #C1FFA9 92.42%);'
      : props.backgroundColor === 'black'
      ? '#111111'
      : props.backgroundColor === 'grey'
      ? '#9897a9'
      : props.backgroundColor === 'red'
      ? '#FF5248'
      : '#4a9fff'};
  border-radius: 1vmin;
  border: none;
  cursor: pointer;
  font-family: 'PretendardRegular';
  &.pale {
    opacity: 0.5;
    :hover {
      opacity: 0.7;
    }
  }
  :hover {
    opacity: 0.9;
  }
  :active {
    opacity: 0.5;
  }
`;

export const RoomInfoBlock = styled.div`
  width: 62vw;
  height: 73vh;
  background-color: #ffffff;
  padding: 2.5vh 2vw;
  border-radius: 0 2vmin 2vmin 2vmin;
`;

export const WaitingRoomVideoBox = styled.div`
  width: 66vw;
  height: 28vh;
  margin-bottom: 2vh;
  padding: 2vh 1.5vw;
  background-color: #ffffff;
  display: flex;
  flex-direction: row;
  border-radius: 0 2vmin 2vmin 2vmin;
  overflow-y: hidden;
  overflow-x: scroll;
`;

export const PickedVideoDataContainer = styled.div`
  width: 46vw;
  height: 20vh;
  padding: 4.5vh 2vw;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  & .title-container {
    width: 40vw;
    height: 10vh;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 2vh;
  }
  & .container-title {
    font-size: 2.5vmin;
    font-weight: bold;
    color: #4a9fff;
    vertical-align: middle;
  }
  & .video-title {
    width: 35vw;
    font-size: 2.8vmin;
    font-family: 'PretendardBold';
    margin-right: 1vw;
  }
  & .study-period-box {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  & .study-period {
    background-color: #111111;
    padding: 0.5vh 1vw;
    color: white;
    border-radius: 0.5vmin;
    display: inline;
    margin-right: 1vw;
  }
  & button {
    width: 10vw;
    height: 3.5vh;
    padding: 0.5vh 1vmin;
    background-color: #9897a9;
    color: #ffffff;
    font-size: 1.8vmin;
    border: none;
    border-radius: 0.5vmin;
    cursor: pointer;
  }
`;

export const WaitingRoomBottom = styled.div`
  width: 66vw;
  height: 43vh;
  display: flex;
  flex-direction: row;
  padding: 1vh 1vw;
  justify-content: start;
  align-items: center;
  background: linear-gradient(
    106.56deg,
    rgba(132, 176, 226, 0.7) 7.3%,
    rgba(88, 172, 240, 0.53) 77.68%,
    rgba(174, 243, 147, 0.7) 99.32%
  );
  border-radius: 2vmin;
`;

export const RoomUsersContainer = styled.div`
  width: 19vw;
  height: 38vh;
  margin-right: 1vw;
  padding: 3.5vh 1.5vw;
  background: #ffffff;
  border-radius: 2vmin;

  & .user-list {
    padding: 3vh 0 0 1.5vw;
    & p {
      margin-bottom: 1.5vh;
    }
  }
`;

export const WaitingRoomPickEssay = styled.div`
  width: 44vw;
  height: 38vh;
  padding: 3.5vh 1.5vw;
  background: #ffffff;
  border-radius: 2vmin;
`;

export const RoomModalContainer = styled.div`
  width: 90vw;
  height: 90vh;
  padding: 1vh 1vw;
  background: #dfecf9;
  display: flex;
  color: black;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1vmin;
  border: none;
  border-radius: 2vmin;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  z-index: 10000;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// 채팅 방 내부
export const EozRoomBlock = styled.div`
  width: 90vw;
  height: 90vh;
  padding: 1vh 1vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const EozRoomVideoContainer = styled.div`
  width: 85vw;
  height: 27vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

// 화상 아래, 학습 자료 컨테이너
export const EozRoomStudyContainer = styled.div`
  width: 85vw;
  height: 47vh;
  /* border: 1px solid black; */
  display: flex;
  flex-direction: row;
`;

// 학습 영상 컨테이너
export const EozRoomStudyVideoContainer = styled.div`
  width: 36vw;
  height: 47vh;
  /* border: 1px solid green; */
  margin-right: 1vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #4f9fff;
  & .today-study {
    font-size: 2vmin;
    margin-top: 0.7vh;
    font-family: 'PretendardBold';
  }
`;

// 에세이 전체 컨테이너
export const UserEssayContainer = styled.div`
  width: 48vw;
  height: 47vh;
  font-family: 'PretendardRegular';
  /* border: 1px solid red; */
`;

export const EssayPickBtnContainer = styled.div`
  width: 48vw;
  display: flex;
  flex-direction: row;
  /* border: 1px solid red; */
`;

export const EssayPickBtn = styled.button`
  width: 8vw;
  height: 4vh;
  padding: 0 0.5vw;
  font-size: 1vw;
  color: #ffffff;
  background-color: #4f9fff;
  border: none;
  border-radius: 1.5vmin 1.5vmin 0 0;
  cursor: pointer;
  & .not-active {
    opacity: 0.5;
  }
`;

// 에세이 내용 보여주는 부분
export const RoomEssayContainer = styled.div`
  width: 48vw;
  height: 43vh;
  padding: 1vh 1vw;
  background-color: #ffffff;
  border-radius: 0 1.5vmin 1.5vmin 1.5vmin;
`;

export const RoomEmptyEssayContainer = styled.div`
  width: 48vw;
  height: 43vh;
  padding: 1vh 1vw;
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 0 1.5vmin 1.5vmin 1.5vmin;
`;

// 나가기 버튼 block
export const EozRoomBtnContainer = styled.div`
  width: 85vw;
  height: 7vh;
  /* border: 1px solid purple; */
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
