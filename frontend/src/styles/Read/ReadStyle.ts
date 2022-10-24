import styled from "styled-components";

export const ReadPageBlock = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  flex-direction: row;
  width: 100vw;
  height: 85vh;
  padding: 0vh 5vw 0vh 5vw;  
  border: 1px solid black;
`;

export const YoutubeAndDictContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40vw;
  height: 85vh;  
  border: 1px solid blue;
`;

export const DictRegion = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;  
  width: 40vw;
  height: 45vh;  
  border: 1px solid yellow;
`;

export const ScriptContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5vw;
  /* justify-content: center; */
  align-items: center;
  width: 45vw;  
  height: 80vh; 
  /* padding: 4vh 4vw; */
  overflow-y : scroll;
  overflow-x: hidden;
  border: 1px solid green;
`;

export const ScriptItemBox = styled.div`
  min-height: 5vh;
  width: 45vw;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  color: black;
  font-size: 2vmin;
  border: 1px solid green;
`;

export const ScriptTimeStamp = styled.div`
  min-height: 5vh;
  width: 10vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 2vmin;
  border: 1px solid green;
  &.now-played {
    background-color: #adff45;
  }
`;

export const ScriptText = styled.div`
  min-height: 5vh;
  width: 35vw;
  padding: 0vh 2vw;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  color: black;
  font-size: 2vmin;
  border: 1px solid green;
`;

export const ButtonRegion = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 5vh;
  border: 1px solid green;
`;