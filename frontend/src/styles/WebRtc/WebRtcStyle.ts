import styled from 'styled-components';

export const WaitingRoomBlock = styled.div`
  width: 62vw;
  height: 78vh;
  margin: 3vh 3vw;

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

export const RoomInfoBlock = styled.div`
  width: 62vw;
  height: 73vh;
  background-color: #ffffff;
  padding: 2.5vh 2vw;
  border-radius: 0 2vmin 2vmin 2vmin;
`;

export const WaitingRoomVideoBox = styled.div`
  width: 62vw;
  height: 28vh;
  margin-bottom: 2vh;
  padding: 2vh 1.5vw;
  background-color: #ffffff;
  border-radius: 0 2vmin 2vmin 2vmin;
`;

export const WaitingRoomBottom = styled.div`
  width: 62vw;
  height: 43vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
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
  padding: 1.8vh 1.5vw;
  background: #ffffff;
  border-radius: 2vmin;
`;

export const WaitingRoomPickEssay = styled.div`
  width: 39vw;
  height: 38vh;
  padding: 1.8vh 1.5vw;
  background: #ffffff;
  border-radius: 2vmin;
`;

export const RoomModalContainer = styled.div`
  width: 90vw;
  height: 90vh;
  padding: 1vh 1vw;
  background: #ffffff;
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
