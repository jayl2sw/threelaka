import React from 'react';
import styled from 'styled-components';
import { LogoBlock } from '../styles/Main/MainStyle';

//style
const ToastText = styled.div`
  /* font-weight: bold; */
  text-align: center;
  position: absolute;
  width: 100%;
  top: 65%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 2.2vmin;
`;

interface IToastMessage {
  text: string;
}
export const ToastMessage = ({ text }: IToastMessage) => {
  return (
    <>
      <LogoBlock style={{ margin: '0', width: '10vw', height: '4vh' }}>
        <img
          src="https://threelaka.s3.ap-northeast-2.amazonaws.com/mainlogo.png"
          alt="스리라까 로고"
          style={{ width: '100%', height: 'auto' }}
        />
      </LogoBlock>
      <ToastText>{text}</ToastText>
    </>
  );
};
