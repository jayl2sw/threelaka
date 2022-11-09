import styled from 'styled-components';

export const VideoBlock = styled.div`
  display: flex;
  width: 60vw;
  height: 40vh;
  border: 1px solid black;
  /* overflow: scroll; */
`;

export const DashBoardBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: linear-gradient(106.56deg, rgba(132, 176, 226, 0.5) 7.3%, rgba(88, 172, 240, 0.43) 77.68%, rgba(174, 243, 147, 0.5) 99.32%);
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
  width: 15vw;
  height: 90vh;
  background-color: #fff;
  /* padding-top: 1rem;
  padding-right: 1rem; */
  /* margin-top: 10vh;
  margin-left: 2rem; */
  border-radius: 1rem;
  box-shadow: 3px 3px 5px 3px #00000038;
  border: solid blue 1px;
`;

export const DashBoardBox = styled.div`
  display: flex;
  flex-direction: column;
  /* margin: 3vh auto;
  padding: 3vh; */

  width: 60vw;
  border: solid red 1px;
  height: 80vh;
  margin-top: 5vh;
  margin-left: 2.5vw;
`;
