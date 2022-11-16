import React from 'react';
import styled from 'styled-components';
import { LogoBlock } from '../styles/Main/MainStyle';
//style
// const ToastContainer = styled.div`
//   position: fixed;
//   z-index: 20;

//   /* top: 50%;
//   left: 50%; */
//   /* transform: translate(-50%, -50%); */
//   /* width: 20vw;
//   height: 10vh; */
//   border-radius: 10px;
//   box-shadow: 0 0 15px 0 var(--black-40);
//   background-color: #323232;
// `;

const ToastText = styled.div`
  font-weight: bold;
  letter-spacing: 0.29px;
  text-align: center;
  margin-top: 0.6rem;
`;

interface IToastMessage {
  text: string;
}
export const ToastMessage = ({ text }: IToastMessage) => {
  return (
    <>
      <LogoBlock style={{ width: '60%', height: '4vh' }}>
        <img
          src="https://threelaka.s3.ap-northeast-2.amazonaws.com/mainlogo.png"
          alt="스리라까 로고"
          // style={{ width: '100%' }}
        />
      </LogoBlock>
      <ToastText>{text}</ToastText>
    </>
  );
};
