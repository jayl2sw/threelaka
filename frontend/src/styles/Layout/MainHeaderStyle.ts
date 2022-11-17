import styled from 'styled-components';
import { RiLogoutBoxRLine } from 'react-icons/ri';

interface LinkMenuProps {
  bgColor: string;
  widthSize: string;
}

export const HeaderBlock = styled.div`
  position: relative;
  z-index: 5;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 15vh;
  /* background-color: red; */
  font-size: 3rem;
  color: white;
  transform: translateY(-8vh);
  transition: transform 1s ease-in-out;
  :hover {
    transform: translateY(0vh);
    /* z-index: 5; */
    transition: transform 1.5s ease-in-out;
  }
`;

export const MainHeaderMenuRegion = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  width: 100vw;
  height: 8vh;
  background-color: transparent;
  opacity: 1;
  position: fixed;
  top: 0;
  padding-right: 5.5vw;
  font-family: 'PretendardRegular';
  color: black;
`;

export const StudyProgressRegion = styled.div`
  display: flex;
  z-index: 5;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 7vh;
  background-color: black;
  color: white;
`;

export const ProgressBarContainer = styled.div`
  position: relative;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  border-radius: 20px;
  width: 66vw;
  height: 4vh;
  /* font-size: 3rem; */
  color: white;
`;

export const ProgressBarIndicator = styled.div`
  position: absolute;
  height: 4vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 66vw 4vh;
  background-image: linear-gradient(
    90deg,
    rgba(74, 159, 255, 1) 0%,
    rgba(88, 172, 240, 1) 41%,
    rgba(176, 255, 145, 1) 100%
  );
  border-radius: 15px;
  &.indicator-READING {
    width: 33%;
    transition: width 1s ease-in-out;
  }
  &.indicator-WRITING {
    width: 66%;
    transition: width 1s ease-in-out;
  }
  &.indicator-SPEAKING {
    width: 100%;
    transition: width 1s ease-in-out;
  }
`;

export const ProgressBarItem = styled.div`
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 16vw;
  height: 4vh;
  margin: 0 2vw;
  /* font-size: 3rem; */
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
`;

export const MainLinkWrapper = styled.div<LinkMenuProps>`
  background-color: ${(props) => props.bgColor};
  width: ${(props) => props.widthSize};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 8vh;
  font-size: 1.2rem;
  color: black;
  margin-top: 1vh;
  a {
    text-decoration: none;
    color: black;
  }
  a:hover {
    text-decoration: underline;
    color: black;
  }
`;

export const TitleRegion = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50vw;
  height: 8vh;
  background-color: black;
  font-size: 3rem;
  color: white;
  margin-right: 10vw;
`;

export const ProgressTest = styled.progress``;

export const LogoutIcon = styled(RiLogoutBoxRLine)`
  cursor: pointer;
`;
