import styled from "styled-components";

export const ReadPageBlock = styled.div`
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  flex-direction: column;
  width: 100vw;
  height: 85vh;
  padding: 0 10vw 0vh 10vw;  
  border: 1px solid black;
`;

export const YoutubeAndDictContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 40vh;  
  border: 1px solid blue;
`;

export const DictRegion = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40vw;
  height: 40vh;  
  border: 1px solid yellow;
`;

export const SentenceSpeakingRegion = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 10vh; 
  /* padding: 4vh 4vw; */
  border: 1px solid green;
`;

export const ScriptAndSpeakContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  width: 80vw;
  height: 30vh; 
  /* padding: 4vh 4vw; */
  overflow-y : scroll;
  overflow-x: hidden;
  border: 1px solid green;
`;

export const ScriptItemBox = styled.div`
  min-height: 10vh;
  width: 72vw;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  color: black;
  font-size: 2vmin;
  border: 1px solid green;
`;

export const ScriptTimeStamp = styled.div`
  min-height: 10vh;
  width: 10vw;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 2vmin;
  border: 1px solid green;
`;

export const ScriptText = styled.div`
  min-height: 10vh;
  width: 62vw;
  display: flex;
  justify-content: center;
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