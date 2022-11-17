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
  height: 26.5vh;
  padding: 1vw;
  font-size: 1vw;
  color: #111111;
  background-color: #ffffff;
  border-radius: 0 2vmin 2vmin 2vmin;
`;

// EOZ 접속 중인 멤버 목록 보여주기
export const EozMembersContainer = styled.div`
  width: 23vw;
  height: 15vh;
  padding: 0.5vh 0.5vw;
  margin: 0.5vh 0.5vw;
  display: flex;
  flex-direction: column;
  justify-content: start;
  border: 1px solid red;
  border-radius: 1vmin;
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
  width: 88vw;
  height: 90vh;
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

export const UserEssayContainer = styled.div`
  width: 48vw;
  height: 70vh;
  font-family: 'PretendardRegular';
  border: 1px solid red;
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
