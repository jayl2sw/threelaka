import React from 'react';
import styled from 'styled-components'
import LoginForm from './LoginForm';
import { userInfoApi } from '../../../services/userApi';

const LoginBlock = styled.div`
  
 
`
const handeltest = () => {
  const res = userInfoApi()
  console.log("잘되나",res)
  return res
}

const LoginPage = () => {
  return (
    <LoginBlock>
      
      <button onClick={handeltest}></button>
      <LoginForm></LoginForm>
    </LoginBlock>
  );
};

export default LoginPage;