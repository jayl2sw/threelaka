import React from 'react';
import styled from 'styled-components'
import LoginForm from './LoginForm';

import { useAppDispatch } from '../../../utils/hooks';
import { authActions } from '../../../features/auth/authSlice';

const LoginBlock = styled.div`
  
 
`

const LoginPage = () => {
  const dispatch = useAppDispatch();
  const handeltest = () => {
    dispatch(authActions.test());
  }
  return (
    <LoginBlock>
      
      <button onClick={handeltest}></button>
      <LoginForm></LoginForm>
    </LoginBlock>
  );
};

export default LoginPage;