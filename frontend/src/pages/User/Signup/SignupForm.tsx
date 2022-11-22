import styled from 'styled-components';

import { useEffect, useCallback, RefObject } from 'react';

import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { authActions } from '../../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
//api
import { nicknameCheckApi, emailCheckApi } from '../../../services/userApi';

//form 관리 라이브러리
import { useForm } from 'react-hook-form';
import { InputField } from '../InputField';
import { RadioField } from '../RadioField';
//유효성평가 라이브러리
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  StyledForm,
  Heading,
  InputWrap,
  SubmitBtnWrap,
} from '../../../styles/User/UserStyle';
import { GradientRoundBtn } from '../../../styles/Common/CommonBtnStyle';

interface IAuthForm {
  username: string;
  password: string;
  passwordConfirm: string;
  // gender: 'male' | 'female' | 'secret';
  // age: string;
  nickname: string;
}

interface ISignupFormProps {
  initialValues?: IAuthForm;
  onSubmit?: (formValues: IAuthForm) => void;
  AuthBlockRef: RefObject<HTMLDivElement>;
  FormBlockRef: RefObject<HTMLDivElement>;
  setMoveCarousel: React.Dispatch<React.SetStateAction<string>>;
  moveCarousel: string;
  handleToggle: () => void;
}

const SignupForm = ({
  initialValues,
  onSubmit,
  AuthBlockRef,
  FormBlockRef,
  setMoveCarousel,
  moveCarousel,
  handleToggle,
}: ISignupFormProps) => {
  // const [errMsg, setErrMsg] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  const schema = yup.object().shape({
    // username: yup
    //   .string()
    //   .required('아이디를 입력해주세요')
    //   .matches(
    //     /^[a-z0-9]{4,16}$/,
    //     '4자 이상, 16자 이하의 영문 혹은 숫자로 입력해주세요.'
    //   ),
    password: yup
      .string()
      .required('비밀번호를 입력해주세요')
      .matches(
        /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,16}$/,
        '4자 이상, 16자 이하의 영문, 숫자 조합으로 입력해주세요.'
      ),
    username: yup
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
    // gender: yup.string().required('성별을 선택해주세요'),
    // age: yup
    //   .number()
    //   .default(1)
    //   .min(1, '최소 입력값은 1 입니다')
    //   .max(100, '최대 입력값은 100 입니다'),
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
      let { username, password, nickname } = formValues;
      const signupInfo = {
        username: username,
        password: password,
        // age: parseInt(age),
        // gender: gender,
        age: 30,
        gender: 'MALE',
        nickname: nickname,
      };

      dispatch(authActions.signup(signupInfo));
      // await onSubmit?.(formValues);
    } catch (error) {
      // setError(error.message);
    }
  };

  //유효검사 - 비밀번호 일치 및 아이디, 이메일, 닉네임 중복확인
  const onValid = useCallback(async (data: IAuthForm) => {
    const { username, nickname } = data;

    const emailCheckRes = await emailCheckApi(username);
    const nicknameCheckRes = await nicknameCheckApi(nickname);
    if (data.password !== data.passwordConfirm) {
      console.log('이게말이됨');
      setError(
        'passwordConfirm', // 에러 핸들링할 input요소 name
        { message: '비밀번호가 일치하지 않습니다.' }, // 에러 메세지
        { shouldFocus: true } // 에러가 발생한 input으로 focus 이동
      );
    } else if (emailCheckRes) {
      setError(
        'username',
        { message: '이메일이 중복입니다' },
        { shouldFocus: true }
      );
    } else if (nicknameCheckRes) {
      setError(
        'nickname',
        { message: '닉네임이 중복입니다' },
        { shouldFocus: true }
      );
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn]);
  return (
    <StyledForm
      onSubmit={handleSubmit(handleFormSubmit)}
      className="sign-up-form"
    >
      <Heading style={{ marginTop: '3vh' }}>
        <h1>Welcome to ThreeLaka!</h1>
      </Heading>
      <InputWrap>
        <InputField name="username" control={control} label="E-mail" />
        <InputField
          name="password"
          control={control}
          label="PW"
          type="password"
        />
        <InputField
          name="passwordConfirm"
          control={control}
          label="Confirm PW"
          type="password"
        />
        <InputField name="nickname" control={control} label="Nickname" />
        {/* <div className="short">
          <div className="age" style={{ width: '25%' }}>
            <InputField
              name="age"
              control={control}
              label="나이"
              type="number"
            />
          </div>
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
                label: '비공개',
                value: '2',
              },
            ]}
          />
        </div> */}
      </InputWrap>
      <SubmitBtnWrap>
        {/* <a
          href="#"
          onClick={handleToggle}
          className="toggle"
          style={{ fontFamily: 'Fredoka', fontWeight: 'bold' }}
        >
          <p>
            &lt;&lt;&nbsp;&nbsp;현재 베타테스트 기간으로 개별 가입이
            불가능합니다
          </p>
        </a> */}

        <GradientRoundBtn
          widthSize={'20vw'}
          heightSize={'7vh'}
          paddingSize={'0'}
          fontColor={'black'}
          fontSize={'2vmin'}
          backgroundColor={'gradient'}
          style={{
            // margin: '0 auto',
            background: '#bff5ab',
            marginBottom: '-3vh',
            marginTop: '2.5vh',
          }}
        >
          J O I N
        </GradientRoundBtn>
        <p style={{ fontFamily: 'Fredoka' }}>Already Have an Account?</p>
        <div
          onClick={handleToggle}
          className="toggle"
          style={{
            fontFamily: 'Fredoka',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          &lt;&lt;&nbsp;&nbsp;Sign In
        </div>
      </SubmitBtnWrap>
    </StyledForm>
  );
};

export default SignupForm;
