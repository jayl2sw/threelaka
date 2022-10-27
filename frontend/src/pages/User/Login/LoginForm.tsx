import styled from 'styled-components';

import { useEffect, RefObject } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { authActions } from '../../../features/auth/authSlice';

//form 관리 라이브러리
import { useForm } from 'react-hook-form';
import { InputField } from '../InputField';
import { RadioField } from '../RadioField';
import { StyledForm, Heading, InputWrap } from '../../../styles/User/UserStyle';

interface IAuthForm {
  username: string;
  password: string;
}

interface ILoginFormProps {
  initialValues?: IAuthForm;
  onSubmit?: (formValues: IAuthForm) => void;
  LoginBlockRef: RefObject<HTMLDivElement>;
  FormBlockRef: RefObject<HTMLDivElement>;
  setMoveCarousel: React.Dispatch<React.SetStateAction<string>>;
  moveCarousel: string;
}

const LoginForm = ({
  initialValues,
  onSubmit,
  LoginBlockRef,
  FormBlockRef,
  setMoveCarousel,
  moveCarousel,
}: ILoginFormProps) => {
  // const [errMsg, setErrMsg] = useState('');
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //직접 돔 조작은 하지 않고, useRef를 사용
  //switch 관련
  // const toggle_btn = document.querySelectorAll('.toggle');
  // const main = document.querySelector('main');
  // toggle_btn.forEach((btn) => {
  //   btn.addEventListener('click', () => {
  //     main?.classList.toggle('sign-up-mode');
  //   });
  // });

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

  useEffect(() => {
    if (isLoggedIn) {
      console.log('회원가입 성공');
      navigate('/');
    }
  }, [isLoggedIn]);

  const handleToggle = () => {
    if (LoginBlockRef.current !== null && FormBlockRef.current !== null) {
      LoginBlockRef?.current.classList.toggle('sign-up-mode');
      FormBlockRef?.current.classList.toggle('toggle-forms-wrap');
      //동욱 내부 컴포넌트 안에서 ref는 어케써..?잘 안써지네 ㅜㅜ
      const loginForm = document.getElementsByClassName('login-form');
      const signupForm = document.getElementsByClassName('sign-up-form');
      loginForm[0].classList.toggle('hide-login-form');
      signupForm[0].classList.toggle('show-sign-up-form');
      if (moveCarousel === '') {
        setMoveCarousel('toggle-carousel');
      } else {
        setMoveCarousel('');
      }
    }
  };

  return (
    <>
      <StyledForm
        onSubmit={handleSubmit(handleFormSubmit)}
        className="login-form"
        autoComplete="off"
      >
        <Heading>
          <h6>아직 회원 아니심?</h6>
          <a href="#" onClick={handleToggle} className="toggle">
            회원가입먼저해야징
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
      <StyledForm
        onSubmit={handleSubmit(handleFormSubmit)}
        className="sign-up-form"
        autoComplete="off"
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
    </>
  );
};

export default LoginForm;
