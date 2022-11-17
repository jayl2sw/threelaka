import styled from 'styled-components';

import React, { useEffect, useState } from 'react';
// style

import {
  SearchBarInput,
  SearchButton,
  SearchIconBtn,
} from '../styles/Main/MainSearchStyle';
import { IconContext } from 'react-icons';
import { GoSearch } from 'react-icons/go';

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
  onClickHandler: (
    e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent<HTMLDivElement>,
    inputVal: string
  ) => void;
  placeHolderText: string;
  inputName: string;
  inputValue: string;
  setInputValue: (nextVal: string) => void;
}
const GradientInput = ({
  widthSize,
  onClickHandler,
  placeHolderText,
  inputName,
  inputValue,
  setInputValue,
}: IGradientInputProps) => {
  const inputSize = `${widthSize}vw`;
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        position: 'relative',
        width: inputSize,
        height: '5vh',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <SearchBarInput>
        <input
          type="text"
          onChange={onChangeHandler}
          value={inputValue}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              onClickHandler(e, inputValue);
            }
          }}
          required
          style={{ width: inputSize }}
        />
        <span>키워드를 입력해주세요</span>
        <i></i>
      </SearchBarInput>
      <GradientInputTag
        type="input"
        placeholder={placeHolderText}
        name={inputName}
        id={inputName}
        onChange={(e) => onChangeHandler(e)}
        required
      />
      <SearchButton>
        <SearchIconBtn
          onClick={(e) => {
            onClickHandler(e, inputValue);
          }}
        >
          <IconContext.Provider
            value={{
              color: '111111',
              // className: 'global-class-name',
              size: '2.2vw',
            }}
          >
            <GoSearch style={{ paddingBottom: '0.5vw' }}></GoSearch>
          </IconContext.Provider>
        </SearchIconBtn>
      </SearchButton>
    </div>
  );
};

export default GradientInput;
