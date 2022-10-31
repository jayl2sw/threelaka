import { TextField } from '@material-ui/core';
import React, { InputHTMLAttributes, useRef } from 'react';
import { Control, useController } from 'react-hook-form';
import {
  StyledInput,
  ErrorText,
  StyledLabel,
} from '../../styles/User/UserStyle';

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
  type?:string
}

export const InputField = ({
  name,
  control,
  label,
  type,

  ...inputProps
}: InputFieldProps) => {
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { error },
  } = useController({
    name,
    control,
  });

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
    if (inputTagRef?.current !== null && labelTagRef?.current !== null) {
      inputTagRef?.current.classList.remove('active');
      labelTagRef?.current.classList.remove('active');
    }
  };




  return (
    <>
      
      <StyledLabel ref={labelTagRef} className="label">{label}</StyledLabel>
      <StyledInput
        value={value || ''}
        onChange={onChange}
        onBlur={RemoveActive}
        autoComplete="on"
        minLength={4}
        onFocus={AddActive}
        ref={inputTagRef}
        type={type}
        className={value?.length >= 1 ? "yes-input" : ""}
      ></StyledInput>

      {error?.message && <ErrorText>{error?.message}</ErrorText>}
      
    </>
  );
};
