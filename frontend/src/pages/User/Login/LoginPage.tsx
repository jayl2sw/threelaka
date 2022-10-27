import {useRef} from 'react';
import styled from 'styled-components'
import LoginForm from './LoginForm';

import { useAppDispatch } from '../../../utils/hooks';
import { authActions } from '../../../features/auth/authSlice';
import { LoginBlock, LoginContainer,InnerBox, FormsWrap, Carousel } from '../../../styles/User/UserStyle';
import { useState } from 'react';

const LoginPage = () => {
  const LoginBlockRef = useRef<HTMLDivElement>(null);
  const FormBlockRef = useRef<HTMLDivElement>(null);
  const [moveCarousel, setMoveCarousel] = useState('')
  return (
    <LoginBlock ref={LoginBlockRef}>
      <LoginContainer>
        <InnerBox>
          <FormsWrap ref={FormBlockRef}>
            <LoginForm LoginBlockRef={LoginBlockRef} FormBlockRef={FormBlockRef} setMoveCarousel={setMoveCarousel} moveCarousel={moveCarousel}></LoginForm>
           
          </FormsWrap>
          <Carousel className={moveCarousel}>이거는 될거같냐</Carousel>

        </InnerBox>
      </LoginContainer>
    </LoginBlock>
  );
};

export default LoginPage;