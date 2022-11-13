import styled from 'styled-components';
export const GuildSettingLeftBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid black;
  width: 35vw;
  height: 75vh;
  flex-direction: column;
`;

export const GuildSettingRightBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 2px solid blue; */
  width: 25vw;
  height: 75vh;
  flex-direction: column;
`;

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
