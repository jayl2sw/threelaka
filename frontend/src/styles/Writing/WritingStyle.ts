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
  justify-content: center;
  align-items: center;
  font-family: PretendardRegular;
  /* border: 1px solid blue; */
  margin-left: 5vw;
  margin-right: 5vw;
`;

export const WordCheckBox = styled.div`
  display: flex;
  width: 3vmin;
  height: 3vmin;
  background-color: #9897a9;
  margin-right: 1vw;
  border-radius: 1vmin;
  position: absolute;
  top: 1vh;
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
  margin-left: 5vmin;
  padding-right: 2vmin;
  position: absolute;
  top: -1.5vh;
  & p.back {
    opacity: 0;
    height: 0;
    transition: 0s;
  }
  & p.checked {
    text-decoration: black line-through;
  }
`;

export const SpellText = styled.div`
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
  & p.checked {
    text-decoration: black line-through;
  }
`;

export const ArcodianBox = styled.div`
  position: relative;
  display: flex;
  justify-content: start;
  align-items: center;
  margin-bottom: 1vh;
  width: 25.3vw;
  height: 5vh;
  padding: 0 1vw;
  font-size: 1vmin;
  color: black;
  background: #ffffff;
  box-shadow: 10px 10px 80px rgba(63, 39, 102, 0.1);
  border-radius: 2vmin;
  overflow-x: hidden;
  overflow-y: scroll;
  &:hover {
    height: 20vh;
  }
  &:hover > div:nth-child(2) {
    top: 0;
  }
  &:hover p.front {
    display: none;
  }
  &:hover p.back {
    opacity: 1;
    height: 100%;
    transition: 2s;
  }
  transition: 0.8s;
`;
