import { style } from '@material-ui/system';
import React from 'react';
import {
  MainBox,
  MainPaleBox,
  BackBlurBox,
  BackBlurPaleBox,
  SentenceBox,
} from '../../../styles/Common/CommonDivStyle';

import {
  RightBtn,
  TopBtn,
  MainBtn,
  GradientRoundBtn,
} from '../../../styles/Common/CommonBtnStyle';

const VocaPage = () => {
  return (
    <div style={{ backgroundColor: 'white' }}>
      <MainBox
        widthSize={'30vw'}
        heightSize={'10vh'}
        paddingSize={'0'}
        fontColor={'blue'}
        fontSize={'2vmin'}
      ></MainBox>
      <MainPaleBox
        widthSize={'30vw'}
        heightSize={'10vh'}
        paddingSize={'0'}
        fontColor={'blue'}
        fontSize={'2vmin'}
        className={'gradient-border-2'}
      ></MainPaleBox>
      <BackBlurBox
        widthSize={'30vw'}
        heightSize={'10vh'}
        paddingSize={'0'}
        fontColor={'blue'}
        fontSize={'2vmin'}
      ></BackBlurBox>
      <BackBlurPaleBox
        widthSize={'30vw'}
        heightSize={'10vh'}
        paddingSize={'0'}
        fontColor={'blue'}
        fontSize={'2vmin'}
      ></BackBlurPaleBox>
      <SentenceBox
        widthSize={'30vw'}
        heightSize={'10vh'}
        paddingSize={'0'}
        fontColor={'blue'}
        fontSize={'2vmin'}
      ></SentenceBox>
      <TopBtn
        widthSize={'30vw'}
        heightSize={'10vh'}
        paddingSize={'0'}
        fontColor={'blue'}
        fontSize={'2vmin'}
        backgroundColor={'gradient'}
        className={'pale'}
      ></TopBtn>
      <RightBtn
        widthSize={'30vw'}
        heightSize={'10vh'}
        paddingSize={'0'}
        fontColor={'blue'}
        fontSize={'2vmin'}
        backgroundColor={'gradient'}
      ></RightBtn>
      <MainBtn
        widthSize={'30vw'}
        heightSize={'10vh'}
        paddingSize={'0'}
        fontColor={'blue'}
        fontSize={'2vmin'}
        backgroundColor={'gradient'}
      ></MainBtn>
      <GradientRoundBtn
        widthSize={'10vw'}
        heightSize={'5vh'}
        paddingSize={'0'}
        fontColor={'blue'}
        fontSize={'2vmin'}
        backgroundColor={'gradient'}
      ></GradientRoundBtn>
    </div>
  );
};

export default VocaPage;
