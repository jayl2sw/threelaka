import styled from 'styled-components';

import { useState, useEffect, useCallback, RefObject } from 'react';
import {
  StyledForm,
  Heading,
  InputWrap,
  SubmitBtnWrap,
} from '../../../styles/User/UserStyle';
import { useAppDispatch } from '../../../utils/hooks';
import { authActions } from '../../../features/auth/authSlice';

//form 관리 라이브러리
import { useForm } from 'react-hook-form';
import { InputField } from '../InputField';
import { RadioField } from '../RadioField';

//유효성평가 라이브러리
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { GradientRoundBtn } from '../../../styles/Common/CommonBtnStyle';

interface IAuthForm {
  username: string;
  password: string;
}

interface ILoginFormProps {
  initialValues?: IAuthForm;
  onSubmit?: (formValues: IAuthForm) => void;
  AuthBlockRef: RefObject<HTMLDivElement>;
  FormBlockRef: RefObject<HTMLDivElement>;
  setMoveCarousel: React.Dispatch<React.SetStateAction<string>>;
  moveCarousel: string;
  handleToggle: () => void;
}

const LoginForm = ({
  handleToggle,
  initialValues,
  onSubmit,
  AuthBlockRef,
  FormBlockRef,
  setMoveCarousel,
  moveCarousel,
}: ILoginFormProps) => {
  // const [errMsg, setErrMsg] = useState('');

  const dispatch = useAppDispatch();

  const schema = yup.object().shape({
    // username: yup
    //   .string()
    //   .required('아이디를 입력해주세요')
    //   .matches(
    //     /^[a-z0-9]{4,16}$/,
    //     '4자 이상, 16자 이하의 영문 혹은 숫자로 입력해주세요.'
    //   ),
    username: yup
      .string()
      .required('이메일을 입력해주세요')
      .matches(
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/,
        '이메일 형태로 입력해주세요'
      ),
    password: yup
      .string()
      .required('비밀번호를 입력해주세요')
      .matches(
        /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,16}$/,
        '4자 이상, 16자 이하의 영문, 숫자 조합으로 입력해주세요.'
      ),
  });
  const {
    control,
    handleSubmit,
    formState: { errors }, //formState는 어떤식으로 사용?
    setError,
  } = useForm<IAuthForm>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const handleFormSubmit = (formValues: IAuthForm) => {
    try {
      //유효검사
      // onValid?.(formValues);

      dispatch(authActions.login(formValues));
      // await onSubmit?.(formValues);
    } catch (error) {
      console.log('에러가뭘까용', error);
      // setError(error.message);
    }
  };

  return (
    <StyledForm
      onSubmit={handleSubmit(handleFormSubmit)}
      className="login-form"
    >
      <Heading>
        <h1>
          Yes,
          <br />
          It's time to ThreeLaka!
        </h1>
      </Heading>
      <InputWrap>
        <InputField name="username" control={control} label="이메일" />
        <InputField
          name="password"
          control={control}
          label="비밀번호"
          type="password"
        />
      </InputWrap>
      <SubmitBtnWrap>
        <GradientRoundBtn
          widthSize={'80%'}
          heightSize={'5vh'}
          paddingSize={'0'}
          fontColor={'black'}
          fontSize={'2vmin'}
          backgroundColor={'gradient'}
          style={{ margin: '0 auto' }}
        >
          L O G I N
        </GradientRoundBtn>
        <p style={{fontFamily:'Fredoka'}}>Not Registered Yet?</p>
        <a href="#" onClick={handleToggle} className="toggle" style={{fontFamily:'Fredoka', fontWeight:'bold'}}>
          Sign Up&nbsp;&nbsp;&gt;&gt;
        </a>
      </SubmitBtnWrap>
    </StyledForm>
  );
};

export default LoginForm;
