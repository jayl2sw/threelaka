import { Radio } from '@material-ui/core';
import styled from 'styled-components';
import loginImg from '../../media/images/loginimageleft.png';
import loginImg2 from '../../media/images/loginimageright.png';

export const StyledForm = styled.form`
  max-width: 400px;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  transition: opacity 0.02s 0.4s;
  &.login-form {
    justify-content: space-around;
  }
`;

export const AuthBlock = styled.div`
  /* *, *::before, *::after{
    padding: 0;
    margin: 0;
  } */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  /* overflow: hidden; */
  padding: 2rem;
  background: linear-gradient(
    90deg,
    rgba(74, 159, 255, 1) 0%,
    rgba(88, 172, 240, 1) 41%,
    rgba(176, 255, 145, 1) 100%
  );
  .sign-up-mode {
    opacity: 0;
    pointer-events: none;
  }

  .toggle-forms-wrap {
    left: 40%;
    /* background-color: black; */
  }
  .toggle-carousel {
    left: 0%;
    background: url('${loginImg}') center no-repeat;
    background-size: cover;
  }
`;

export const AuthContainer = styled.div`
  position: relative;
  background-color: white;
  width: 100%;
  max-width: 1020px;
  height: 700px;
  border-radius: 3.3rem;
  box-shadow: 0 60px 40px -30px rgba(0, 0, 0, 0.27);
`;

export const InnerBox = styled.div`
  /* padding: 2rem; */
  /* margin: 2rem; */
  position: absolute;
  width: 90%;
  /* width: calc(100%-4.1rem); */
  height: 100%;
  top: 5%;
  transform: translateX(5%);
  /* left:10%; */
  /* transform: translate(-50%,-50%); */
  /* background-color: black; */
`;

export const FormsWrap = styled.div`
  position: absolute;
  height: 90%;
  width: 60%;
  top: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;

  .sign-up-form {
    opacity: 0;
    pointer-events: none;
  }
  .sign-up-form > div:nth-child(2) {
    height: 70%;
  }
  .hide-login-form {
    opacity: 0;
    pointer-events: none;
  }
  .show-login-form {
    opacity: 1;
    pointer-events: all;
  }
  .show-sign-up-form {
    opacity: 1;
    pointer-events: all;
  }
  transition: 0.8s ease-in-out;
`;

export const Carousel = styled.div`
  position: absolute;
  top: 2.5%;
  height: 90%;
  left: 60%;
  width: 40%;
  background: url('${loginImg2}') center no-repeat;
  background-size: cover;
  top: 0;
  transition: 0.8s ease-in-out;
  border-radius: 5vmin;
`;

export const Heading = styled.div`
  font-family: Fredoka;
  h1 {
    display: inline;
  }
`;
export const InputWrap = styled.div`
  position: relative;
  height: 25%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .short {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .age {
    width: 30%;
  }
`;
// // 영상 url 넣을 input 스타일링
// export const StyledInput = styled.div`
//   position: relative;
//   margin-bottom: 2vh;

//   & input {
//     width: 100%;
//     /* height: 10vh; */
//     padding: 1vh 0.5vw;
//     background: transparent;
//     color: #111111;
//     border: none;
//     outline: none;
//     box-shadow: none;
//     font-size: 1em;
//     /* letter-spacing: 0.1em; */
//   }

//   // input 박스 내 안내문
//   & span {
//     position: absolute;
//     left: 0;
//     /* padding: 2vh; */
//     color: rgba(0, 0, 0, 0.4);
//     /* text-align: center; */
//     pointer-events: none;
//   }
//   & input:valid ~ span,
//   input:focus ~ span {
//     color: #111111;
//     transform: translateY(-3vh);
//     font-size: 0.8rem;
//   }

//   // input 아래 그라데이션 효과
//   & i {
//     position: absolute;
//     left: 0;
//     bottom: 0;
//     width: 100%;
//     height: 0.5vh;
//     border-radius: 10px;
//     background: #111111;
//     overflow: hidden;
//   }
//   & i::before {
//     content: '';
//     position: absolute;
//     left: -100%;
//     width: 100%;
//     height: 100%;
//     background: linear-gradient(90deg, #4a9fff, #b0ff91, #4a9fff);
//     animation: animate 5s linear infinite;
//     transition: 0.5s;
//   }
//   & input:valid ~ i::before,
//   input:focus ~ i::before {
//     left: 0%;
//   }
//   @keyframes animate {
//     0% {
//       background-position-x: 0;
//     }
//     100% {
//       background-position-x: 30vw;
//     }
//   }
// `;

export const StyledInput = styled.input`
  font-family: Fredoka;
  width: 100%;
  height: 50%;
  background: none;
  outline: none;
  border: none;
  border-bottom: 1px solid #bbb;
  padding: 0;
  font-size: 2vmin;
  color: #333333;
  transition: 0.4s;
  &.active {
    border-bottom-color: #333333;
  }
  &.age {
    width: 20%;
  }
`;

export const ErrorText = styled.div`
  font-family: Fredoka;
  font-size: 1.3vmin;
  color: red;
  margin-top: 3px;
`;

export const StyledLabel = styled.div`
  font-family: Fredoka;
  position: none;
  left: 0;
  top: 50%;
  transform: translateY(100%);
  font-size: 2.3vmin;
  color: gray;
  pointer-events: none;
  transition: 0.4s;
  &.active {
    font-size: 1.3vmin;
    transform: translateY(50%);
    top: -2px;
  }
`;

export const SubmitBtnWrap = styled.div`
  p {
    color: #aaa;
    text-align: center;
    margin-top: 30px;
  }
  .toggle {
    display: inline-block;
    text-decoration: none;
    font-size: 3vmin;
    font-weight: bold;
    width: 100%;
    text-align: center;
    background: linear-gradient(
      110.64deg,
      #4a9fff 1.5%,
      rgba(88, 172, 240, 0.861458) 25%,
      #b0ff91 70%,
      rgba(88, 172, 240, 0.861458) 85%,
      #4a9fff 90%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shine 2s linear infinite, boomboom 0.5s alternate infinite;
    @keyframes shine {
      to {
        background-position: 200% center;
      }
    }
    @keyframes boomboom {
      from {
        transform: translateX(-5%);
      }
      to {
        transform: translateX(5%);
      }
    }
  }
  .toggle-right {
    /* position: absolute; */
    /* right: 5px; */
    text-decoration: none;
    font-size: 3vmin;
    font-weight: bold;
    background: linear-gradient(
      110.64deg,
      #4a9fff 5.65%,
      rgba(88, 172, 240, 0.861458) 45.15%,
      #b0ff91 84.64%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    }
  }
`;
