import styled from 'styled-components';

interface SpinnerDivProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  widthSize: string;
  heightSize: string;
}

export const LoadingSpinner = styled.div<SpinnerDivProps>`
  height: ${(props) => props.widthSize};
  width: ${(props) => props.heightSize};
  background: hsla(333, 100%, 53%, 1);
  background: linear-gradient(
    110.64deg,
    #4a9fff 5.65%,
    rgba(88, 172, 240, 0.861458) 45.15%,
    #b0ff91 84.64%
  );
  border-radius: 50%;
  box-shadow: rgba(14, 30, 37, 0.12) 0px 2px 4px 0px,
    rgba(14, 30, 37, 0.32) 0px 2px 16px 0px;
  position: relative;
  animation: spin 1.4s linear infinite;
  &::before {
    position: absolute;
    content: '';
    height: 90%;
    width: 90%;
    background-color: white;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
