import styled from 'styled-components';

export const CloseModalBtn = styled.div`
  cursor: pointer;
  width: 3vmin;
  height: 3vmin;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 1vh;
  right: 1vw;
  &:hover {
    transform: scale(1.1);
    transition: transform 0.2s;
  }
  &:active {
    transform: scale(0.9);
    transition: transform 0.2s;
  }
`;
