import styled from 'styled-components';

export const Label = styled.label`
  font-size: 3vmin;
  padding: 0 2vw;
`;

export const Input = styled.input`
  visibility: hidden;
  padding: 0.5vmin;
  /* padding: 0.2vw; */

  :checked + div {
    background: rgba(88, 172, 240, 0.8);
    border-radius: 5px;
    color: white;
    padding: 0.5vmin;
  }
  & + div {
    &:hover {
      outline: 0.2rem solid rgba(88, 172, 240);
      border-radius: 5px;
      padding: 0.5vmin;
    }
  }
`;
