import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import SignupForm from './SignupForm';
import { userInfoApi } from '../../../services/userApi';

const SignupBlock = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const SignupPage = () => {
const handeltest = () => {
  const res = userInfoApi()
  console.log("잘되나",res)
  return res
}

  return (
    <SignupBlock>
      <button onClick={handeltest}></button>
      <SignupForm></SignupForm>
    </SignupBlock>
  );
};

export default SignupPage;
