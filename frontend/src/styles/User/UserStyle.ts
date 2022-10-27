import styled from 'styled-components';
export const StyledForm = styled.form`
  max-width: 260px;
  width: 100%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  transition: opacity 0.02s 0.4s;


`;

export const LoginBlock = styled.div`
  /* *, *::before, *::after{
    padding: 0;
    margin: 0;
  } */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
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
    left: 55%;
    /* background-color: black; */
  }
  .toggle-carousel {
    left: 0%;
  }
`;

export const LoginContainer = styled.div`
  position: relative;
  background-color: white;
  width: 100%;
  max-width: 1020px;
  height: 640px;
  border-radius: 3.3rem;
  box-shadow: 0 60px 40px -30px rgba(0, 0, 0, 0.27);
`;

export const InnerBox = styled.div`
  /* padding: 2rem; */
  /* margin: 2rem; */
  position: absolute;
  width: 100%;
  /* width: calc(100%-4.1rem); */
  height: 100%;
  top: 5%;
  /* left:10%; */
  /* transform: translate(-50%,-50%); */
  /* background-color: black; */
`;

export const FormsWrap = styled.div`
  position: absolute;
  height: 80%;
  width: 45%;
  top: 0;
  left: 0;
  background-color: red;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  .sign-up-form {
    opacity: 0;
    pointer-events: none;
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
  height: 80%;
  left: 45%;
  width: 55%;
  /* background-color: beige; */
  background-color: blue;
  top: 0;
  transition: 0.8s ease-in-out;
`;

export const Heading = styled.div`
  h6 {
    display: inline;
  }
  .toggle {
    text-decoration: none;
    font-size: 2vmin;
  }
  .toggle:hover {
    color: red;
  }
`;
export const InputWrap = styled.div`
  position: relative;
  height: 37px;
  margin-bottom: 2rem;
`;
