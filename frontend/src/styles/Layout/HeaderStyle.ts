import styled from "styled-components";

interface LinkMenuProps {
  bgColor: string;
  widthSize: string;
}


export const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 15vh;
  background-color: black;
  font-size: 3rem;
  color: white;
`;

export const HeaderMenuRegion = styled.div`
  display: flex;  
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 10vh;
  background-color: blue;
  font-size: 3rem;
  color: white;
`;

export const StudyProgressRegion = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90vw;
  height: 5vh;
  background-color: yellow;
  font-size: 3rem;
  color: white;
`;

export const LinkWrapper = styled.div<LinkMenuProps>`
  background-color: ${(props) => props.bgColor};
  width: ${props => props.widthSize};
  height: 8vh;
  font-size: 2rem;
  color: white;
`;

export const TitleRegion = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 15vh;
  background-color: black;
  font-size: 3rem;
  color: white;
`