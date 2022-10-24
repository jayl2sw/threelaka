import React from 'react';
import styled from 'styled-components';

import { useState, useEffect } from 'react';

import { useAppDispatch } from '../../../utils/hooks';
import { authActions } from '../../../features/auth/authSlice';

//form 관리 라이브러리
import { useForm } from 'react-hook-form';
import { InputField } from '../InputField';
import { RadioField } from '../RadioField';

//유효성평가 라이브러리
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

interface IAuthForm {
  nickname: string;
  email: string;
  password: string;
  passwordConfirm: string;
  gender: 'male' | 'female' | 'secret'
}

interface ISignupFormProps {
  initialValues?: IAuthForm;
  onSubmit?: (formValues: IAuthForm) => void;
}

const StyledForm = styled.form``;

const SignupForm = ({ initialValues, onSubmit }: ISignupFormProps) => {
  // const [errMsg, setErrMsg] = useState('');

  // 아이디, 비밀번호 정규식
  const userIdRegExp = /^[a-z0-9]{4,16}$/; //4자 이상, 16자 이하의 영문 혹은 숫자로 입력해주세요.
  const passwordRegExp = /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,16}$/; //'4자 이상, 16자 이하의 영문, 숫자 조합으로 입력해주세요.'

  const dispatch = useAppDispatch();

  const schema = yup.object().shape({
    email: yup.string().required('이메일을 입력해주세요'),
    gender: yup.string(),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IAuthForm>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const handleFormSubmit = (formValues: IAuthForm) => {
    try {
      onValid?.(formValues);

      let { email, password } = formValues;
      const signupInfo = {
        email: email,
        password: password,
      };

      dispatch(authActions.signup(signupInfo));
      // await onSubmit?.(formValues);
    } catch (error) {
      console.log('에러가뭘까용', error);
      // setError(error.message);
    }
  };

  const onValid = (data: IAuthForm) => {
    if (data.password !== data.passwordConfirm) {
      setError(
        'passwordConfirm', // 에러 핸들링할 input요소 name
        { message: '비밀번호가 일치하지 않습니다.' }, // 에러 메세지
        { shouldFocus: true } // 에러가 발생한 input으로 focus 이동
      );
    }
  };

  return (
    <StyledForm onSubmit={handleSubmit(handleFormSubmit)}>
      <InputField name="email" control={control} label="이메일" />
      <InputField name="password" control={control} label="비밀번호" />
      <InputField
        name="passwordConfirm"
        control={control}
        label="비밀번호 확인"
      />
      <RadioField
        name="gender"
        control={control}
        label="Gender"
        options={[
          {
            label: '남성',
            value: '0',
          },
          {
            label: '여성',
            value: '1',
          },
          {
            label: '쉿,비밀이야',
            value: '2',
          },
        ]}
      />
      <button>제출</button>
    </StyledForm>
  );
};

export default SignupForm;
