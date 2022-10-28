import styled from 'styled-components';

import { useEffect, useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { authActions } from '../../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
//api
import {
  idCheckApi,
  nicknameCheckApi,
  emailCheckApi,
} from '../../../services/userApi';

//form 관리 라이브러리
import { useForm } from 'react-hook-form';
import { InputField } from '../InputField';
import { RadioField } from '../RadioField';

//유효성평가 라이브러리
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { StyledForm } from '../../../styles/User/UserStyle';

interface IAuthForm {
  username: string;
  email: string;
  password: string;
  passwordConfirm: string;
  gender: 'male' | 'female' | 'secret';
  age: string;
  nickname: string;
}

interface ISignupFormProps {
  initialValues?: IAuthForm;
  onSubmit?: (formValues: IAuthForm) => void;
}

const SignupForm = ({ initialValues, onSubmit }: ISignupFormProps) => {
  // const [errMsg, setErrMsg] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

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
    email: yup
      .string()
      .required('이메일을 입력해주세요')
      .matches(
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/,
        '이메일 형태로 입력해주세요'
      ),
    nickname: yup
      .string()
      .required('닉네임을 입력해주세요')
      .matches(
        /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/,
        '닉네임은 2-10자리의 한글, 영문, 숫자만 가능합니다'
      ),
    gender: yup.string(),
    age: yup
      .number()
      .default(1)
      .min(1, '최소 입력값은 1 입니다')
      .max(100, '최대 입력값은 100 입니다'),
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
      onValid?.(formValues);

      //회원가입
      let { email, username, password, nickname, age, gender } = formValues;
      const signupInfo = {
        email: email,
        username: username,
        password: password,
        age: parseInt(age),
        gender: gender,
        nickname: nickname,
      };

      dispatch(authActions.signup(signupInfo));
      // await onSubmit?.(formValues);
    } catch (error) {
      console.log('에러가뭘까용', error);
      // setError(error.message);
    }
  };

  //유효검사 - 비밀번호 일치 및 아이디, 이메일, 닉네임 중복확인
  const onValid = useCallback(async (data: IAuthForm) => {
    const { username, nickname, email } = data;

    const idCheckRes = await idCheckApi(username);
    const nicknameCheckRes = await nicknameCheckApi(nickname);
    const emailCheckRes = await emailCheckApi(email);
    if (data.password !== data.passwordConfirm) {
      setError(
        'passwordConfirm', // 에러 핸들링할 input요소 name
        { message: '비밀번호가 일치하지 않습니다.' }, // 에러 메세지
        { shouldFocus: true } // 에러가 발생한 input으로 focus 이동
      );
    } else if (idCheckRes) {
      setError(
        'username',
        { message: '아이디가중복이에여' },
        { shouldFocus: true }
      );
    } else if (nicknameCheckRes) {
      setError(
        'nickname',
        { message: '닉네임이중복이에여' },
        { shouldFocus: true }
      );
    } else if (emailCheckRes) {
      setError(
        'email',
        { message: '이메일이중복이에여' },
        { shouldFocus: true }
      );
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      console.log('회원가입 성공');
      navigate('/');
    }
  }, [isLoggedIn]);
  return (
    <StyledForm onSubmit={handleSubmit(handleFormSubmit)}>
      <InputField name="username" control={control} label="아이디" />
      <InputField
        name="password"
        control={control}
        label="비밀번호"
        type="password"
      />
      <InputField
        name="passwordConfirm"
        control={control}
        label="비밀번호 확인"
        type="password"
      />
      <InputField name="nickname" control={control} label="닉네임" />
      <InputField name="email" control={control} label="이메일" />
      <InputField name="age" control={control} label="나이" type="number" />
      <RadioField
        name="gender"
        control={control}
        label="성별"
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
