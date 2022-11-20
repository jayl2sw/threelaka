import React from 'react';
import styled from 'styled-components';

import { useCallback, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../utils/hooks';

import { authActions } from '../../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
//api

import { nicknameCheckApi } from '../../../services/userApi';

//form 관리 라이브러리
import { useForm } from 'react-hook-form';
import { ProfileRadioField } from './ProfileRadioField';
import { ProfileInputField } from './ProfileInputField';

//유효성평가 라이브러리
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import {
  StyledForm,
  InputWrap,
  SubmitBtnWrap,
} from '../../../styles/User/UserStyle';
import { GradientRoundBtn } from '../../../styles/Common/CommonBtnStyle';
import {
  FlexTransparentDiv,
  ToastContainer,
} from '../../../styles/Common/CommonDivStyle';

import ModifyPassword from './ModifyPassword';
import { ToastMessage } from '../../../utils/ToastMessage';

interface IAuthForm {
  username: string;
  password: string;
  passwordConfirm: string;
  gender: 'male' | 'female' | 'secret';
  age: string;
  nickname: string;
}

interface IModifyUserInfoProps {
  initialValues?: IAuthForm;
  onSubmit?: (formValues: IAuthForm) => void;
}

const ModifyUserInfo = ({ initialValues, onSubmit }: IModifyUserInfoProps) => {
  // const [errMsg, setErrMsg] = useState('');
  // const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useAppDispatch();
  const isSuccess = useAppSelector((state) => state.auth.isSuccess);
  const schema = yup.object().shape({
    nickname: yup
      .string()
      .required('닉네임을 입력해주세요')
      .matches(
        /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/,
        '닉네임은 2-10자리의 한글, 영문, 숫자만 가능합니다'
      ),
    gender: yup.string().required('성별을 선택해주세요'),
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
      let { nickname, age, gender } = formValues;
      const modifyInfo = {
        age: parseInt(age),
        gender: gender,
        nickname: nickname,
      };

      dispatch(authActions.modifyUserInfo(modifyInfo));
      // await onSubmit?.(formValues);
    } catch (error) {
      // setError(error.message);
    }
  };

  //유효검사 - 비밀번호 일치 및 아이디, 이메일, 닉네임 중복확인
  const onValid = useCallback(async (data: IAuthForm) => {
    const { nickname } = data;

    // const emailCheckRes = await emailCheckApi(username);
    const nicknameCheckRes = await nicknameCheckApi(nickname);
    if (nicknameCheckRes) {
      setError(
        'nickname',
        { message: '닉네임이 중복입니다' },
        { shouldFocus: true }
      );
    }
  }, []);

  return (
    <FlexTransparentDiv
      widthSize={'30vw'}
      heightSize={'80vh'}
      paddingSize={'0 0 4vh 0'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      IsBorder={'none'}
    >
      <StyledForm
        onSubmit={handleSubmit(handleFormSubmit)}
        className="sign-up-form"
        style={{ width: '95%', margin: '2vmin 0' }}
      >
        <InputWrap style={{ height: '80%', width: '95%' }}>
          <h3>회원정보수정</h3>
          {/* <ProfileInputField name="username" control={control} label="이메일" /> */}
          <ProfileInputField
            name="nickname"
            control={control}
            label="닉네임"
            style={{ height: '10px' }}
          />
          <div className="short">
            <div className="age" style={{ height: '150%', width: '30%' }}>
              <ProfileInputField
                name="age"
                control={control}
                label="나이"
                type="number"
              />
            </div>
            <div className="gender">
              <ProfileRadioField
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
            </div>
          </div>
          <SubmitBtnWrap>
            <GradientRoundBtn
              widthSize={'70%'}
              heightSize={'5vh'}
              paddingSize={'0'}
              fontColor={'black'}
              fontSize={'2vmin'}
              backgroundColor={'gradient'}
              style={{ margin: '0 auto' }}
            >
              회원정보수정
            </GradientRoundBtn>
          </SubmitBtnWrap>
        </InputWrap>
      </StyledForm>
      <FlexTransparentDiv
        widthSize={'90%'}
        heightSize={'45vh'}
        paddingSize={'1vh 0'}
        flexDirection={'column'}
        justifyContent={'start'}
        alignItems={'start'}
        IsBorder={'none'}
        style={{ marginTop: '1.5vh' }}
      >
        {isSuccess && (
          <ToastContainer
            widthSize={'20vw'}
            heightSize={'20vh'}
            paddingSize={'2vh 1vw'}
            fontColor={'black'}
            top={'55vh'}
            left={'63.5vw'}
          >
            <ToastMessage
              text={'비밀번호가 성공적으로 변경되었습니다'}
            ></ToastMessage>
          </ToastContainer>
        )}
        <h3>비밀번호변경</h3>
        <ModifyPassword></ModifyPassword>
      </FlexTransparentDiv>
    </FlexTransparentDiv>
  );
};

export default ModifyUserInfo;
