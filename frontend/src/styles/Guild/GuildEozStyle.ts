import { SideBarBlock } from './../DashBoard/DashBoardStyle';
import styled from 'styled-components';

export const EozModalContainer = styled.div`
  width: 45vw;
  height: 55vh;
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
