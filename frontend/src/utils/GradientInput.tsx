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

// 영상 url 넣을 input 스타일링
export const CSearchBarInput = styled.div`
  position: relative;
  margin-bottom: 2vh;
  font-family: fredoka;

  & input {
    width: 30vw;
    /* height: 10vh; */
    padding: 1vh 0.5vw;
    background: transparent;
    color: #111111;
    border: none;
    outline: none;
    box-shadow: none;
    font-size: 2.5vmin;
    font-family: 'PretendardRegular';
  }

  & input.search-input {
    color: white;
  }

  // input 박스 내 안내문
  & span {
    position: absolute;
    left: 0;
    margin-left: 0.5vw;
    color: rgba(0, 0, 0, 0.4);
    pointer-events: none;
    font-family: 'PretendardRegular';
    font-size: 1vw;
  }
  // 인풋 박스 입력 시작 시
  & input:valid ~ span,
  input:focus ~ span {
    display: none;
    /* color: #111111;
    transform: translateY(-3vh);
    font-size: 0.8rem; */
  }

  // input 아래 그라데이션 효과
  & i {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 101%;
    height: 0.5vh;
    border-radius: 10px;
    background: #111111;
    overflow: hidden;
  }
  & i.search-input {
    background: white;
  }

  & i::before {
    content: '';
    position: absolute;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #4a9fff, #b0ff91, #4a9fff);
    animation: animate 5s linear infinite;
    transition: 0.5s;
  }
  & input:valid ~ i::before,
  input:focus ~ i::before {
    left: 0%;
  }
  @keyframes animate {
    0% {
      background-position-x: 0;
    }
    100% {
      background-position-x: 30vw;
    }
  }
`;

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

// const GradientFormLabel = styled.label`
//   position: absolute;
//   top: 1vh;
//   left: 0.2vw;
//   display: block;
//   transition: 0.2s;
//   font-size: 1vmin;
//   color: grey;
//   /* border: 1px solid green; */
// `;

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
      <CSearchBarInput>
        <input
          type="text"
          onChange={onChangeHandler}
          value={inputValue}
          className={placeHolderText === '검색페이지인풋' ? 'search-input' : ''}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              onClickHandler(e, inputValue);
            }
          }}
          required
          style={{ width: inputSize }}
        />
        <span
          style={{ color: placeHolderText === '검색페이지인풋' ? 'white' : '' }}
        >
          키워드를 입력해주세요
        </span>
        <i
          className={placeHolderText === '검색페이지인풋' ? 'search-input' : ''}
        ></i>
      </CSearchBarInput>
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
            <GoSearch
              style={{
                paddingBottom: '0.5vw',
                color: placeHolderText === '검색페이지인풋' ? 'white' : '',
              }}
            ></GoSearch>
          </IconContext.Provider>
        </SearchIconBtn>
      </SearchButton>
    </div>
  );
};

export default GradientInput;
