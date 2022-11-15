import { TextField } from '@material-ui/core';
import React, { InputHTMLAttributes, useRef } from 'react';
import { Control, useController } from 'react-hook-form';
import { useAppSelector } from '../../../utils/hooks';
import {
  StyledInput,
  ErrorText,
  StyledLabel,
} from '../../../styles/User/UserStyle';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
  type?: string;
}

export const ProfileInputField = ({
  name,
  control,
  label,
  type,
  className,

  ...inputProps
}: InputFieldProps) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const inputTagRef = useRef<HTMLInputElement>(null);
  const labelTagRef = useRef<HTMLDivElement>(null);
  // const handleLabel = () => {
  //   if (inputTagRef?.current !== null){

  //     inputTagRef.current
  //   }}

  const AddActive = () => {
    if (inputTagRef?.current !== null && labelTagRef?.current !== null) {
      inputTagRef?.current.classList.add('active');
      labelTagRef?.current.classList.add('active');
    }
  };

  const RemoveActive = () => {
    if (
      inputTagRef?.current !== null &&
      labelTagRef?.current !== null &&
      inputTagRef?.current.value == ''
    ) {
      inputTagRef?.current.classList.remove('active');
      labelTagRef?.current.classList.remove('active');
    }
  };

  let placeHolderVal: string = '';
  if (name === 'username') {
    placeHolderVal = currentUser?.username as string;
    // label = '';
    // type = 'hidden';
    // if document
    // document.querySelector('#name').disabled = false
  } else if (name === 'age') {
    placeHolderVal = `${currentUser?.age}` as string;
    type = type;
  } else if (name === 'nickname') {
    placeHolderVal = currentUser?.nickname as string;
    type = type;
  }

  return (
    <>
      {/* {currentUser?.username} */}
      {/* <StyledLabel ref={labelTagRef} className="label">
        {name}
      </StyledLabel> */}

      <label>{label}</label>

      <StyledInput
        placeholder={placeHolderVal}
        value={value || ''}
        onChange={onChange}
        onBlur={RemoveActive}
        autoComplete="on"
        minLength={4}
        onFocus={AddActive}
        ref={inputTagRef}
        type={type}
        className={value?.length >= 1 ? 'yes-input' : ''}
      ></StyledInput>

      {error?.message && <ErrorText>{error?.message}</ErrorText>}
    </>
  );
};
