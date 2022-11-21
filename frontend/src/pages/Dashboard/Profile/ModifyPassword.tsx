import React, { useCallback, useEffect } from 'react';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ProfileInputField } from './ProfileInputField';
import { FlexTransparentDiv } from '../../../styles/Common/CommonDivStyle';
import { GradientRoundBtn } from '../../../styles/Common/CommonBtnStyle';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';
import { authActions } from '../../../features/auth/authSlice';
interface IPwdForm {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

interface IModifyPasswordProps {
  initialValues?: IPwdForm;
  onSubmit?: (formValues: IPwdForm) => void;
}
const ModifyPassword = ({ initialValues, onSubmit }: IModifyPasswordProps) => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const errorStatus = useAppSelector((state) => state.auth.errorStatus);
  const isSuccess = useAppSelector((state) => state.auth.isSuccess);
  const dispatch = useAppDispatch();
  const schema = yup.object().shape({
    currentPassword: yup
      .string()
      .required('현재 비밀번호를 입력해주세요')
      .matches(
        /^(?=.*\d)(?=.*[a-zA-Z])[0-9a-zA-Z]{4,16}$/,
        '4자 이상, 16자 이하의 영문, 숫자 조합으로 입력해주세요.'
      ),
    newPassword: yup
      .string()
      .required('새 비밀번호를 입력해주세요')
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
  } = useForm<IPwdForm>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });
  const onPwdValid = useCallback((data: IPwdForm) => {
    if (data.newPassword !== data.newPasswordConfirm) {
      setError(
        'newPasswordConfirm', // 에러 핸들링할 input요소 name
        { message: '새 비밀번호가 일치하지 않습니다.' }, // 에러 메세지
        { shouldFocus: true } // 에러가 발생한 input으로 focus 이동
      );
    }
  }, []);

  useEffect(() => {
    if (errorStatus !== 0) {
      setError(
        'currentPassword',
        { message: '현재 비밀번호가 일치하지 않습니다.' }, // 에러 메세지
        { shouldFocus: true }
      );

      dispatch(authActions.resetError());
    }
  }, [errorStatus]);

  // function activeToast() {
  //   setDownloadToast(true);
  //   let timer = setTimeout(() => {
  //     setDownloadToast(false);
  //   }, 2000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }

  useEffect(() => {
    if (isSuccess) {
      let timer = setTimeout(() => {
        // setDownloadToast(false);
        dispatch(authActions.resetIsSuccess());
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [dispatch, isSuccess]);

  const handleFormSubmit = (formValues: IPwdForm) => {
    try {
      //유효검사
      onPwdValid(formValues);

      //회원가입
      let { currentPassword, newPassword } = formValues;
      const modifyPasswordInfo = {
        nowPW: currentPassword,
        newPW: newPassword,
      };

      dispatch(authActions.modifyPwd(modifyPasswordInfo));
      // await onSubmit?.(formValues);
    } catch (error) {
      // console.log('여기는안나올걸', error);
      // setError(error.message);
    }
  };
  return (
    <FlexTransparentDiv
      widthSize={'100%'}
      heightSize={'38vh'}
      paddingSize={'1vh 0'}
      flexDirection={'column'}
      justifyContent={'start'}
      alignItems={'start'}
      IsBorder={'none'}
    >
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        style={{
          width: '100%',
          height: '20vh',
        }}
      >
        <ProfileInputField
          name="currentPassword"
          control={control}
          label="현재 비밀번호"
          type="password"
        />
        <ProfileInputField
          name="newPassword"
          control={control}
          label="새 비밀번호"
          type="password"
        />
        <ProfileInputField
          name="newPasswordConfirm"
          control={control}
          label="새 비밀번호 확인"
          type="password"
        />
        <GradientRoundBtn
          widthSize={'70%'}
          heightSize={'5vh'}
          paddingSize={'0'}
          fontColor={'black'}
          fontSize={'2vmin'}
          backgroundColor={'gradient'}
          style={{ margin: '2vh auto' }}
        >
          비밀번호변경
        </GradientRoundBtn>
      </form>
    </FlexTransparentDiv>
  );
};

export default ModifyPassword;
