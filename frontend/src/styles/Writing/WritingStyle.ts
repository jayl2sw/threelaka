import styled from "styled-components";

interface ContentBoxProps {
  bgColor: string;
  widthSize: string;
  heightSize: string;
}

interface ContentBoxTagProps {
  topShift: string;
  leftShift: string; 
  bgColor: string;
  fontColor: string;
}

export const WritingPageBlock = styled.div`
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  flex-direction: column;
  width: 80vw;
  height: 85vh;
  margin: 0 10vw;
  /* border: 1px solid black; */
`;

export const WordListAndWritingContainer = styled.div`
  display: flex;
  width: 80vw;
  height: 70vh;  
  /* border: 1px solid blue; */
  margin-bottom: 2vw;
`;

export const WordListRegion = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  flex-direction: column;  
  background-color: #daedf2;
  border-radius: 25px;  
  width: 17vw;
  height: 70vh;
  margin-right: 3vw;
  padding-top: 5vh;
  /* border: 1px solid green; */
`;

export const ContentBox = styled.div<ContentBoxProps>`
  display: flex;
  position: relative;
  background-color: ${(props) => props.bgColor};
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;  
  width: ${props => props.widthSize};
  height: ${props => props.heightSize};  
  /* border: 1px solid green; */
`;

export const ContentBoxTag = styled.div<ContentBoxTagProps>`  
  position: absolute;
  top:${(props) => props.topShift};   
  left:${(props) => props.leftShift};  
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5vw;
  height: 4vh;
  background-color: ${(props) => props.bgColor};;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
  font-size: 2vmin;
  color: ${(props) => props.fontColor};
  /* border: 1px solid green; */
`;

export const WritingRegion = styled.div`
  display: flex;
  background-color: #daedf2;
  border-radius: 25px;
  width: 60vw;
  height: 70vh; 
  padding: 2vmin;
  /* border: 1px solid yellow; */
`;

export const WritingTextArea = styled.textarea`
  display: flex;
  background-color: white;
  border-radius: 25px;
  width: 100%;
  height: 100%;
  padding: 2vmin 3vmin;
  font-size: 3vmin;
  border: none;
  resize: none;
`;

export const BtnsRegion = styled.div`
  position: absolute;
  top: 88vh;
  display: flex;
  justify-content: space-between;
  width: 20vw;
  margin-left: 60vw;
  height: 5vh;  
  /* border: 1px solid darkcyan; */
`

export const SaveBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 9vw;  
  height: 5vh;  
  font-size: 2.5vmin;
  border-radius: 10px;
  background-color: navy;
  color: white;
`