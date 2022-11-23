import React from 'react';
import { useState } from 'react';
import { FlexTransparentDiv } from '../../../../styles/Common/CommonDivStyle';
import {
  CircularMenu,
  CircularMenuItem,
} from '../../../../styles/Read/ReadStyle';
import { TbLayoutBoardSplit } from 'react-icons/tb';
import { RiLayout4Fill, RiLayout3Fill } from 'react-icons/ri';

interface ICircularNavCompProps {
  layoutMode: number;
  setLayoutMode: (nextLayoutMode: number) => void;
}
const CicularNavComp = ({
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
          setToggle(false);
        }}
        onMouseOver={() => setToggle(true)}
        onMouseOut={() => setToggle(false)}
      >
        <RiLayout4Fill size={30} />
      </CircularMenuItem>
      <CircularMenuItem
        bgColor="white"
        transitionTime="0.8s"
        removeTransitionTime="0.8s"
        className={toggle ? 'toggle' : ''}
        onClick={() => {
          setLayoutMode(1);
          setToggle(false);
        }}
        onMouseOver={() => setToggle(true)}
        onMouseOut={() => setToggle(false)}
      >
        <RiLayout4Fill style={{ transform: 'rotate(90deg)' }} size={30} />
      </CircularMenuItem>
      <CircularMenuItem
        bgColor="white"
        transitionTime="0.4s"
        removeTransitionTime="1.2s"
        className={toggle ? 'toggle' : ''}
        onClick={() => {
          setLayoutMode(2);
          setToggle(false);
        }}
        onMouseOver={() => setToggle(true)}
        onMouseOut={() => setToggle(false)}
      >
        <RiLayout3Fill style={{ transform: 'rotate(180deg)' }} size={30} />
      </CircularMenuItem>
      <CircularMenu
        onMouseOver={() => setToggle(true)}
        onMouseOut={() => setToggle(false)}
      >
        <TbLayoutBoardSplit size={30} />
      </CircularMenu>
    </FlexTransparentDiv>
  );
};

export default CicularNavComp;
