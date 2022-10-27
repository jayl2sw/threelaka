import styled from 'styled-components';

import { useState, useEffect, useCallback } from 'react';

import { useAppDispatch } from '../../../utils/hooks';
import { authActions } from '../../../features/auth/authSlice';



//form 관리 라이브러리
import { useForm } from 'react-hook-form';
import { InputField } from '../InputField';
import { RadioField } from '../RadioField';


interface IAuthForm {
  username: string;
  password: string;

}

interface ILoginFormProps {
  initialValues?: IAuthForm;
  onSubmit?: (formValues: IAuthForm) => void;
}

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const LoginForm = ({ initialValues, onSubmit }: ILoginFormProps) => {
  // const [errMsg, setErrMsg] = useState('');

  const dispatch = useAppDispatch();

  

  const {
    control,
    handleSubmit,
    formState: { errors }, //formState는 어떤식으로 사용?
    setError,
  } = useForm<IAuthForm>({
    defaultValues: initialValues,
  
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
    <StyledForm onSubmit={handleSubmit(handleFormSubmit)}>
      <InputField name="username" control={control} label="아이디" />
      <InputField
        name="password"
        control={control}
        label="비밀번호"
        type="password"
      />
      
  
      <button>제출</button>
    </StyledForm>
  );
};

export default LoginForm;
