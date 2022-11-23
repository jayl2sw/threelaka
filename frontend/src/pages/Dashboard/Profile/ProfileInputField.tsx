import { TextField } from '@material-ui/core';
import React, { InputHTMLAttributes, useEffect, useRef } from 'react';
import { Control, useController } from 'react-hook-form';
import { useAppSelector } from '../../../utils/hooks';
import {
  StyledInput,
  ErrorText,
  StyledLabel,
} from '../../../styles/User/UserStyle';
import { he } from 'date-fns/locale';

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

  let placeHolderVal: string = '';
  if (name === 'username') {
    placeHolderVal = currentUser?.username as string;
  } else if (name === 'age') {
    placeHolderVal = `${currentUser?.age}` as string;
    type = type;
  } else if (name === 'nickname') {
    placeHolderVal = currentUser?.nickname as string;
    type = type;
  }

  return (
    <>
      <div style={{ display: 'flex', height: '6vh' }}>
        <label
          style={{
            color: 'rgba(0, 0, 0, 0.6)',
            fontSize: '2vmin',
            width: '13vw',
            height: '100%',
            marginBottom: '5vh',
            lineHeight: '6vh',
          }}
        >
          {label}
        </label>

        <StyledInput
          placeholder={placeHolderVal}
          value={name === 'username' ? currentUser?.username : value || ''}
          onChange={onChange}
          autoComplete="on"
          minLength={4}
          ref={inputTagRef}
          type={type}
          className={`${name}`}
          disabled={name === 'username' ? true : false}
          style={{
            borderRadius: '10px',
            height: '70%',
            marginTop: '1vh',
            fontSize: '1vmin',
            paddingLeft: '1.5vmin',
          }}
        ></StyledInput>
      </div>

      {error?.message && <ErrorText>{error?.message}</ErrorText>}
    </>
  );
};
