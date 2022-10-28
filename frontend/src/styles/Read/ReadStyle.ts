import styled from "styled-components";

export const ReadPageBlock = styled.div`
  display: flex;
  justify-content: center;
  /* align-items: center; */
  flex-direction: row;
  width: 100vw;
  height: 85vh;
  padding: 0vh 5vw 0vh 5vw;  
  /* border: 1px solid black; */
`;

export const YoutubeAndDictContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 40vw;
  height: 80vh;  
  /* border: 1px solid blue; */
`;

export const DictRegion = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;  
  width: 40vw;
  height: 45vh;  
  /* border: 1px solid yellow; */
`;

export const DictInput = styled.input`
  width: 40vw;
  height: 10vh;
  border: black 2px solid;
`

export const ScriptContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5vw;
  width: 45vw;  
  height: 80vh; 
  /* padding: 4vh 4vw; */
  overflow-y : scroll;
  overflow-x: hidden;
  background-color: #d1edf2;
  border: 1px solid green;
`;

export const ScriptItemBox = styled.div`
  min-height: 20vh;
  width: 45vw;
  display: flex;
  /* justify-content: flex-start; */
  align-items: center;
  color: black;
  font-size: 2vmin;
  /* border: 1px solid green; */
`;

export const ScriptTimeStamp = styled.div`
  cursor: pointer;
  min-height: 5vh;
  background-color: white;
  width: 8vw;
  margin-left: 2vw;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 3vmin;
  /* border: 1px solid green; */
  &.now-played {
    background-color: #1c2e4a;
    color: white;
  }
  :hover {
    background: linear-gradient(90deg, rgba(74,159,255,1) 0%, rgba(88,172,240,1) 41%, rgba(176,255,145,1) 100%)
  }
`;

export const ScriptText = styled.div`
  min-height: 20vh;
  width: 30vw;
  padding: 0vh 2vw;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  color: black;
  font-size: 2vmin;
  /* border: 1px solid green; */
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

export const ScriptWordSpan = styled.span`
  margin-right: 0.7vmin;
  border-radius: 5px;
  cursor: pointer;
  :hover {    
    background-color: grey;  
    padding: 0.5vmin 0;
  }
  &.word-selected {
    background-color: #1c2e4a;
    color: white;
  }
`

export const AutoScrollBtn = styled.div`
  cursor: pointer;
  position: absolute;
  z-index: 0;
  top: 10vh;
  right: 6vw;
  width: 5vw;
  height: 3vh;
  border-radius: 10px;  
  background-color: grey;
  box-shadow: 0px 4px 4px rgba(0,0,0,0.3);
  &::before {
    content: '';
    position: absolute;    
    width: 2vmin;
    height: 2vmin;
    border-radius: 10px;      
    top: 0.5vmin;  
    box-shadow: 0px 4px 4px rgba(0,0,0,0.4) ;
  }
  &.auto-scroll {
    background: linear-gradient(90deg, rgba(74,159,255,1) 0%, rgba(88,172,240,1) 41%, rgba(176,255,145,1) 100%);    
  }
  &.auto-scroll::before {
    background-color: white;
    transform: translateX(3.5vw);    
    transition: 1s;
  }
  &.manual-scroll::before {
    background-color: black;
    /* left: 0.5vmin;
    top: 0.5vmin; */
    transform: translateX(0.5vw); 
    transition: 1s;
  }
`

export const AutoScrollText = styled.div`
  z-index: -1;
  font-size: 2vmin;
  display: flex;
  position: absolute;
  align-items: center;
  justify-content: center;
  top: 10.1vh;
  right: 11vw;
  width: 10vw;
  height: 3vh;  
  & p {
    margin: 0;
  }
`