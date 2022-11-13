import React, { useState } from 'react';
import styled from 'styled-components';
import { FlexTransparentDiv } from '../styles/Common/CommonDivStyle';
import { MainBtn } from '../styles/Common/CommonBtnStyle';
// style
const GradientInputTag = styled.input`
  font-family: inherit;
  width: 90%;
  border: 0;
  border-bottom: 2px solid black;
  outline: 0;
  font-size: 1.5vmin;
  color: black;
  /* padding: 7px 0; */
  background: transparent;
  transition: border-color 0.2s;

  &::placeholder {
    color: transparent;
  }

  &:placeholder-shown + label {
    font-size: 1.3rem;
    cursor: text;
    top: 0.5vh;
    left: 0.2vw;
  }

  &:focus {
    & + label {
      position: absolute;
      top: -0.5vh;
      display: block;
      transition: 0.2s;
      font-size: 1.5vmin;
      color: rgb(162, 208, 252);
      font-weight: 700;
    }
    padding-bottom: 6px;
    font-weight: 700;
    border-width: 3px;
    border-image: linear-gradient(
      110.64deg,
      #4a9fff 5.65%,
      rgba(88, 172, 240, 0.861458) 45.15%,
      #b0ff91 84.64%
    );
    border-image-slice: 1;
  }

  &:required,
  &:invalid {
    box-shadow: none;
  }
`;

const GradientFormLabel = styled.label`
  position: absolute;
  top: 1vh;
  left: 0.2vw;
  display: block;
  transition: 0.2s;
  font-size: 1vmin;
  color: grey;
  /* border: 1px solid green; */
`;

interface IGradientInputProps {
  widthSize: number;
  onClickHandler: () => void;
  placeHolderText: string;
  inputName: string;
}
const GradientInput = ({
  widthSize,
  onClickHandler,
  placeHolderText,
  inputName,
}: IGradientInputProps) => {
  const inputSize = `${widthSize - 4}vw`;

  return (
    <div style={{ position: 'relative', width: inputSize, height: '5vh' }}>
      <GradientInputTag
        type="input"
        placeholder={placeHolderText}
        name={inputName}
        id={inputName}
        required
      />
      <GradientFormLabel htmlFor={inputName}>{inputName}</GradientFormLabel>
      <MainBtn
        widthSize={'5vw'}
        heightSize={'4vh'}
        paddingSize={'0'}
        fontSize={'2vmin'}
        fontColor={'white'}
        backgroundColor={'gradient'}
        style={{ position: 'absolute', right: '-4vw', top: '-0vh' }}
      >
        안녕
      </MainBtn>
    </div>
  );
};

export default GradientInput;
