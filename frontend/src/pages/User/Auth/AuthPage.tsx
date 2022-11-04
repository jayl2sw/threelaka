import React, { useRef, useState } from 'react';
import {
  AuthBlock,
  AuthContainer,
  InnerBox,
  FormsWrap,
  Carousel,
} from '../../../styles/User/UserStyle';
import LoginForm from '../Login/LoginForm';
import SignupForm from '../Signup/SignupForm';
const AuthPage = () => {
  const AuthBlockRef = useRef<HTMLDivElement>(null);
  const FormBlockRef = useRef<HTMLDivElement>(null);
  const [moveCarousel, setMoveCarousel] = useState('');
  const handleToggle = () => {
    if (AuthBlockRef.current !== null && FormBlockRef.current !== null) {
      AuthBlockRef?.current.classList.toggle('sign-up-mode');
      FormBlockRef?.current.classList.toggle('toggle-forms-wrap');
      //동욱 내부 컴포넌트 안에서 ref는 어케써..?잘 안써지네 ㅜㅜ
      const loginForm = document.getElementsByClassName('login-form');
      const signupForm = document.getElementsByClassName('sign-up-form');
      loginForm[0].classList.toggle('hide-login-form');
      signupForm[0].classList.toggle('show-sign-up-form');
      if (moveCarousel === '') {
        setMoveCarousel('toggle-carousel');
      } else {
        setMoveCarousel('');
      }
      // if (submitType === '') {
      //   setSubmitType('signup');
      // } else {
      //   setSubmitType('');
      // }
    }
  };
  return (
    <AuthBlock ref={AuthBlockRef}>
      <AuthContainer>
        <InnerBox>
          <FormsWrap ref={FormBlockRef}>
            <LoginForm
              AuthBlockRef={AuthBlockRef}
              FormBlockRef={FormBlockRef}
              setMoveCarousel={setMoveCarousel}
              moveCarousel={moveCarousel}
              handleToggle={handleToggle}
            ></LoginForm>
            <SignupForm
              AuthBlockRef={AuthBlockRef}
              FormBlockRef={FormBlockRef}
              setMoveCarousel={setMoveCarousel}
              moveCarousel={moveCarousel}
              handleToggle={handleToggle}
            ></SignupForm>
          </FormsWrap>
          <Carousel className={moveCarousel}></Carousel>
        </InnerBox>
      </AuthContainer>
    </AuthBlock>
  );
};

export default AuthPage;
