import styled from 'styled-components';

export const GuildSettingTextArea = styled.textarea`
  width: 25vw;
  height: 5vh;
  resize: none;
  padding: 0 0.5vw;
  border-radius: 5px;
  border: none;
  font-size: 2vmin;
  font-family: PretendardRegular;
`;

export const YoutubeVideoInfoBox = styled.div`
  width: 44vw;
  height: 8vh;
  padding: 0 1vw;
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
  background-color: transparent;
  min-height: 10vh;
  cursor: pointer;
  :hover {
    background-color: grey;
  }
`;
