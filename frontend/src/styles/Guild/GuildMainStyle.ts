import styled from 'styled-components';

export const GuildMainBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 3vh auto;
  padding: 3vh;
  width: 75vw;
`;

export const GuildBlueArcodian = styled.div`
  width: 26.5vw;
  position: relative;
  min-height: 7vh;
  height: 7vh;
  padding: 1vh 1vw;
  font-size: 2vmin;
  color: black;
  background: #dbecff;
  box-shadow: 10px 10px 80px rgba(63, 39, 102, 0.1);
  border-radius: 2vmin;
  transition: all 0.5s ease-in-out;
  margin-bottom: 1vh;
  &:hover {
    min-height: 25vh;
    height: 25vh;
    transition: all 0.5s ease-in-out;
    .arcodian-item {
      visibility: visible;
      opacity: 1;
      transition: all 0.3s ease-in-out;
      transition-delay: 0.3s;
    }
  }
`;

export const GuildBlueArcodianItem = styled.div`
  width: 24vw;
  position: absolute;
  height: 14vh;
  padding: 0vh 1vw;
  font-size: 2vmin;
  top: 9vh;
  color: black;
  background: transparent;
  /* border: 1px solid black; */
  visibility: hidden;
  opacity: 0;
`;

export const GuildCreateContainer = styled.div`
  &.guildCreate {
    animation: smoothAppear 1s ease-in-out;
    @keyframes smoothAppear {
      from {
        opacity: 0;
        transform: translateY(-5%);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }

  &.notGuild {
    animation: smoothAppearTwo 1s ease-in-out;
    @keyframes smoothAppearTwo {
      from {
        opacity: 0;
        transform: translateY(-5%);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
`;

export const GuildCreateInput = styled.input`
  width: 28vw;
  height: 6vh;
  font-size: 3vmin;
  border-radius: 10px;
  padding: 0 0.5vw;
`;
