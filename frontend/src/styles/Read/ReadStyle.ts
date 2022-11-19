import React from 'react';
import styled from 'styled-components';

interface CicularMenuProps extends React.ButtonHTMLAttributes<HTMLDivElement> {
  transitionTime: string;
  removeTransitionTime: string;
  bgColor: string;
}

export const WordBookAddReqBtn = styled.div`
  cursor: pointer;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  top: 55vh;
  left: 43vw;
  width: 5vmin;
  height: 5vmin;
  font-size: 5vmin;
  padding-top: 0.5vmin;
  background-color: black;
  color: white;
`;

export const DictInput = styled.input`
  width: 25vw;
  height: 5vh;
  font-family: PretendardBold;
  font-size: 3vmin;
  padding-left: 1vw;
  color: black;
  background: transparent;
  /* box-shadow: 10px 10px 80px rgba(63, 39, 102, 0.1); */
  border-radius: 2vmin;
  border: 0;
  &:focus {
    outline: none;
  }
`;

export const DictResult = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 34vw;
  height: 32vh;
  padding: 0 1vw;
  font-size: 3vmin;
  border-bottom: black 2px solid;
  background-color: white;
  color: black;
`;

export const ScriptTimeStamp = styled.div`
  cursor: pointer;
  min-height: 5vh;
  background-color: #83bdff;
  width: 5vw;
  margin-left: 2vw;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: black;
  font-size: 2.5vmin;
  /* border: 1px solid green; */
  &.now-played {
    background-color: #1c2e4a;
    color: white;
  }
  :hover {
    background: linear-gradient(
      90deg,
      rgba(74, 159, 255, 1) 0%,
      rgba(88, 172, 240, 1) 41%,
      rgba(176, 255, 145, 1) 100%
    );
  }
`;

export const ScriptWordSpan = styled.span`
  /* margin-right: 0.7vmin; */
  display: inline-block;
  padding-top: 0.5vh;
  padding-bottom: 0.5vh;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background-color: #b5fe89;
    border-radius: 0;
    padding: 0.5vmin 0;
  }
  &.word-selected {
    background-color: rgba(176, 255, 145, 0.8);
    /* background-color: #1c2e4a; */
    color: black;
  }
  &.dummy {
    pointer-events: none;
  }
  &.dummy :hover {
    background-color: white;
  }
`;

export const AutoScrollBtn = styled.div`
  cursor: pointer;
  /* position: absolute; */
  position: relative;
  z-index: 1;
  /* top: 10vh; */
  /* right: 8.5vw; */
  width: 5vw;
  height: 3vh;
  border-radius: 10px;
  background-color: grey;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  &::before {
    content: '';
    position: absolute;
    width: 2vmin;
    height: 2vmin;
    border-radius: 10px;
    top: 0.5vmin;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.4);
  }
  &.auto-scroll {
    background: linear-gradient(
      90deg,
      rgba(74, 159, 255, 1) 0%,
      rgba(88, 172, 240, 1) 41%,
      rgba(176, 255, 145, 1) 100%
    );
  }
  &.auto-scroll::before {
    background-color: white;
    transform: translateX(3.5vw);
    transition: 1s;
  }
  &.manual-scroll::before {
    background-color: black;
    /* left: 0.5vmin;
    top: 0.5vmin; */
    transform: translateX(0.5vw);
    transition: 1s;
  }
`;

export const CircularMenuItem = styled.div<CicularMenuProps>`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  width: 4vmin;
  height: 4vmin;
  background-color: ${(props) => props.bgColor};
  opacity: 0;
  transition: opacity ${(props) => props.removeTransitionTime} ease-in-out;
  visibility: none;
  border-radius: 50%;
  &.toggle {
    opacity: 1;
    visibility: visible;
    transition: opacity ${(props) => props.transitionTime} ease-in-out;
  }
`;

export const CircularMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 4vmin;
  height: 4vmin;
  background-color: #4a9fff;
  &:active {
    transform: scale(0.9);
  }
`;
