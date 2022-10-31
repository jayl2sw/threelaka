import styled from 'styled-components';

import { useState, useEffect, useCallback, RefObject } from 'react';
import { StyledForm,Heading,InputWrap } from '../../../styles/User/UserStyle';
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
  handleToggle: ()=>void
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
    username: yup
      .string()
      .required('아이디를 입력해주세요')
      .matches(
        /^[a-z0-9]{4,16}$/,
        '4자 이상, 16자 이하의 영문 혹은 숫자로 입력해주세요.'
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
        <h6>회원가입함해봐랑</h6>
        <a href="#" onClick={handleToggle} className="toggle">
          다시로그인해야징
        </a>
      </Heading>
      <InputWrap>
        <InputField name="username" control={control} label="아이디" />
        <InputField
          name="password"
          control={control}
          label="비밀번호"
          type="password"
        />
      </InputWrap>

      <button>제출</button>
    </StyledForm>
  );
};

export default LoginForm;
