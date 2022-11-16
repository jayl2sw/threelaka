import React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { Control, useController } from 'react-hook-form';
import { useAppSelector } from '../../../utils/hooks';
import { current } from '@reduxjs/toolkit';

export interface RadioOption {
  label?: string;
  value: number | string;
}

interface RadioFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: RadioOption[];
}

export const ProfileRadioField = ({
  name,
  control,
  label,
  disabled,
  options,
}: RadioFieldProps) => {
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  const currentUser = useAppSelector((state) => state.auth.currentUser);
  return (
    <FormControl
      disabled={disabled}
      margin="normal"
      component="fieldset"
      error={invalid}
    >
      <FormLabel
        component="legend"
        style={{ fontSize: '1.9vmin', top: '-0.6vh' }}
      >
        {label}
      </FormLabel>

      <RadioGroup
        row
        name={name}
        value={value || ''}
        onChange={onChange}
        onBlur={onBlur}
        defaultValue="0"

        // value={currentUser?.gender === 'FEMALE' ? 'MALE' : value || ''}
      >
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            value={option.value}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>

      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
};
