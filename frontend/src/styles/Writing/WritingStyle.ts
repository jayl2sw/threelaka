import styled from 'styled-components';

export const WritingPageBlock = styled.div`
  display: flex;
  /* justify-content: center; */
  /* align-items: center; */
  flex-direction: column;
  width: 100vw;
  height: 85vh;
  /* border: 1px solid black; */
`;

export const WordListAndWritingContainer = styled.div`
  display: flex;
  width: 90vw;
  height: 70vh;
  justify-content: start;
  align-items: center;
  /* border: 1px solid blue; */
  margin-left: 5vw;
  margin-right: 5vw;
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

export const WordCheckBox = styled.div`
  display: flex;
  width: 3vmin;
  height: 3vmin;
  background-color: #9897a9;
  margin-right: 1vw;
  border-radius: 1vmin;
  &.checked {
    background: linear-gradient(
      106.62deg,
      #83bdff 8.18%,
      rgba(136, 192, 255, 0.90051) 49.26%,
      #8dc2ff 69.16%,
      #c1ffa9 92.42%
    );
  }
`;

export const HighlightTextAreaWrapper = styled.div`
  & mark {
    border-radius: 4px;
    padding: 2px;
    &.blue {
      background-color: #4a9fff;
    }
    &.red {
      border-radius: 0;
      background-color: transparent;
      border-bottom: 2px solid red;
    }
  }
`;

export const WordText = styled.div`
  width: 20vw;
  display: flex;
  & p.back {
    display: none;
  }
  &:hover p.front {
    display: none;
  }
  &:hover p.back {
    display: inline;
  }
`;
