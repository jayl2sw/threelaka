import React from 'react';
import styled from 'styled-components';

import { useState, useEffect } from 'react';


import AuthInputs from '../AuthInputs';
import { useAppDispatch } from '../../../utils/hooks';
import { authActions } from '../../../features/auth/authSlice';

const StyledForm = styled.div``;

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [errMsg, setErrMsg] = useState('');

  // 아이디, 비밀번호 정규식
  const userIdRegExp = /^[a-z0-9]{4,16}$/; //4자 이상, 16자 이하의 영문 혹은 숫자로 입력해주세요.
  const passwordRegExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,16}$/; //'4자 이상, 16자 이하의 영문, 숫자 조합으로 입력해주세요.'

  const dispatch = useAppDispatch();


  // const idChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEmail(e.target.value);
  // };

  // const inputIdChangeHandler = (v: string) => {
  //   console.log()
  //   setEmail(v)

  // };

  const inputIdChangeHandler = (v: string) => {
    console.log()
    setEmail(v)

  };

  const inputPasswordChangeHandler = (v: string) => {
    setPassword(v)

  };
  

  const formSubmitHandler = () => {
    const signupInfo = {
      email: email,
      password: password,
    };
    dispatch(authActions.signup(signupInfo));
    // e.preventDefault() //폼태그는 버튼 눌렀을 때 preventDefault를 해주지 않으면 새로고침됨
    
  };

  return (
    <StyledForm>
      <AuthInputs
        label='이메일'
        type="text"
        name="email"
        value={email}
        onInputChange={inputIdChangeHandler}
      />
      <AuthInputs
        label='비밀번호'
        type="text"
        name="password"
        value={password}
        onInputChange={inputPasswordChangeHandler}
      />
      <button onClick={formSubmitHandler}>제출</button>
    </StyledForm>
  );
};

export default SignupForm;
