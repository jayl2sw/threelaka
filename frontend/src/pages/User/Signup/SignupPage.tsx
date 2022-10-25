import React from 'react';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import SignupForm from './SignupForm';

const SignupBlock = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
`;

const SignupPage = () => {

  return (
    <SignupBlock>
      <SignupForm></SignupForm>
    </SignupBlock>
  );
};

export default SignupPage;
