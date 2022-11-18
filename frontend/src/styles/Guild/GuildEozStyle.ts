import styled from 'styled-components';

interface EozBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  widthSize: string;
  heightSize: string;
  fontColor: 'white' | 'black' | 'blue';
  backgroundColor: 'blue' | 'gradient' | 'black' | 'grey' | 'red';
}

// 방 선택 버튼 컨테이너
export const RoomNumBtnContainer = styled.div`
  font-family: 'PretendardRegular';
  & .not-active {
    opacity: 0.5;
  }
`;

// 방 선택 상단 버튼
export const RoomNumBtn = styled.button`
  width: 4.5vw;
  height: 3.5vh;
  padding: 0.5vh 0.5vw;
  margin-right: 0.2vw;
  background: #4f9fff;
  border-top-left-radius: 0.5vmin;
  border-top-right-radius: 0.5vmin;
  border: none;
  font-family: 'PretendardRegular';
  font-size: 1vw;
  color: #ffffff;
  cursor: pointer;
  & .not-active {
    opacity: 0.5;
    background: #111111;
  }
`;

// EOZ 정보 컨테이너
export const EozMainContainer = styled.div`
  width: 30vw;
  height: 30vh;
  padding: 1vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1vw;
  color: #111111;
  background-color: #ffffff;
  border-radius: 0 2vmin 2vmin 2vmin;
`;

// EOZ Room 정보 컨테이너
export const EozRoomInfoContainer = styled.div`
  width: 27vw;
  height: 17vh;
  padding: 1vh 0;
  margin-bottom: 1.5vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  & .video-box {
    width: 14vw;
    height: 17vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 0.5vw;
    border: 0.5vmin dashed rgba(79, 159, 255, 0.2);
    border-radius: 1vmin;
    & img {
      width: 100%;
      height: 100%;
      border: none;
      border-radius: 1vmin;
    }
  }
  & .member-box {
    width: 13vw;
    height: 17vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
    padding: 3vh 0 1vh 0;
    background-color: rgba(79, 159, 255, 0.2);
    border-radius: 1vmin;
  }
  & .member-name-box {
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
    height: 14vh;
  }
  & .member-empty-box {
    height: 14vh;
    display: flex;
    justify-content: center;
    align-items: center;
    /* border: 1px solid red; */
  }
  & p {
    margin: 0;
    text-align: center;
  }
`;

export const EnterBtn = styled.button`
  width: 18vw;
  height: 3.5vh;
  padding: 1vw;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2vw;
  color: #ffffff;
  background: #4f9fff;
  border-radius: 1vmin;
  border: none;
  cursor: pointer;
  font-family: 'PretendardRegular';
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

export const EozModalContainer = styled.div`
  width: 30vw;
  height: 50vh;
  padding: 1vh 1vw;
  background: #ffffff;
  display: flex;
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

export const EozRoomBlock = styled.div`
  width: 90vw;
  height: 92vh;
  padding: 1vh 1vw;
  background: #dbecff;
  display: flex;
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

export const VideosContainer = styled.div`
  width: 30vw;
  height: 60vh;
  /* border: 1px solid blue; */
`;

export const RoomStudyDataContainer = styled.div`
  width: 84vw;
  height: 50vh;
  margin-top: 30vh;
  font-family: 'PretendardRegular';
  border: 1px solid red;
  display: flex;
  flex-direction: row;
`;

export const RoomStudyVideoContainer = styled.div`
  width: 31vw;
  height: 46vh;
  margin: 4vh 1vw 0 0;
  border: 1px solid black;
`;

export const RoomStudyEssayContainer = styled.div`
  width: 54vw;
  height: 50vh;
  border: 1px solid green;
`;

export const EssayPickBtnContainer = styled.div`
  width: 48vw;
`;

export const EssayPickBtn = styled.button`
  width: 8vw;
  height: 4vh;
  padding: 0.5vw;
  font-size: 1vw;
  color: #ffffff;
  background-color: #4f9fff;
  border: none;
  border-radius: 1.5vmin 1.5vmin 0 0;
  cursor: pointer;
  & .not-active {
    opacity: 0.5;
    border: 1px solid red;
  }
`;
