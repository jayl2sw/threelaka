import styled from 'styled-components';

export const Label = styled.label`
  font-size: 3vmin;
  padding: 0 1vw;
`;

export const Input = styled.input`
  visibility: hidden;
  /* padding: 0.2vw; */

  :checked + div {
    background: linear-gradient(
      110.64deg,
      #4a9fff 5.65%,
      rgba(88, 172, 240, 0.861458) 45.15%,
      #b0ff91 84.64%
    );
    border-radius: 1.5vmin;
  }
  & + div {
    &:hover {
      outline: 0.2rem solid rgba(88, 172, 240);
      border-radius: 1.5vmin;
    }
  }
`;
