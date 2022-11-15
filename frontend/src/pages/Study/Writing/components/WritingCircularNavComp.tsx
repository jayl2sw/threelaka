import React from 'react';
import { useState } from 'react';
import { FlexTransparentDiv } from '../../../../styles/Common/CommonDivStyle';
import {
  CircularMenu,
  CircularMenuItem,
} from '../../../../styles/Read/ReadStyle';
import { TbLayoutBoardSplit } from 'react-icons/tb';
import { RiLayoutBottomFill, RiLayoutLeftFill } from 'react-icons/ri';

interface ICircularNavCompProps {
  layoutMode: number;
  setLayoutMode: (nextLayoutMode: number) => void;
}
const WritingCircularNavComp = ({
  layoutMode,
  setLayoutMode,
}: ICircularNavCompProps) => {
  const [toggle, setToggle] = useState<boolean>(false);
  return (
    <FlexTransparentDiv
      widthSize={'10vw'}
      heightSize={'5vh'}
      paddingSize={'0'}
      flexDirection={'row'}
      justifyContent={'center'}
      alignItems={'center'}
      IsBorder={'none'}
      style={{
        position: 'absolute',
        right: '8vw',
        top: '10vh',
        // backgroundColor: ' grey',
      }}
    >
      <CircularMenuItem
        bgColor="white"
        transitionTime="1.2s"
        removeTransitionTime="0.4s"
        className={toggle ? 'toggle' : ''}
        onClick={() => {
          setLayoutMode(0);
          setToggle(!toggle);
        }}
      >
        <RiLayoutLeftFill size={30} />
      </CircularMenuItem>
      <CircularMenuItem
        bgColor="white"
        transitionTime="0.8s"
        removeTransitionTime="0.8s"
        className={toggle ? 'toggle' : ''}
        onClick={() => {
          setLayoutMode(1);
          setToggle(!toggle);
        }}
      >
        <RiLayoutBottomFill size={30} />
      </CircularMenuItem>
      <CircularMenu onClick={() => setToggle(!toggle)}>
        <TbLayoutBoardSplit size={30} />
      </CircularMenu>
    </FlexTransparentDiv>
  );
};

export default WritingCircularNavComp;
