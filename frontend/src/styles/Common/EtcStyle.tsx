import styled from 'styled-components';

export const LikeHateBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  width: 4vw;
  height: 7vh;
  &:hover {
    transform: scale(1.1);
    transition: transform 0.5s;
  }
  &:active {
    transform: scale(0.9);
    transition: transform 0.5s;
  }
`;
