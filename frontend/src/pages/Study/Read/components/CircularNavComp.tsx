import React from 'react';
import { FlexTransparentDiv } from '../../../../styles/Common/CommonDivStyle';
import { CircularMenu } from '../../../../styles/Read/ReadStyle';

interface ICircularNavCompProps {
  layoutMode: number;
  setLayoutMode: (nextLayoutMode: number) => void;
}
const CicularNavComp = ({
  layoutMode,
  setLayoutMode,
}: ICircularNavCompProps) => {
  return (
    <FlexTransparentDiv
      widthSize={'5vw'}
      heightSize={'20vh'}
      paddingSize={'0'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      IsBorder={'is'}
      style={{
        position: 'absolute',
        right: '1vw',
        bottom: '2vh',
        backgroundColor: ' grey',
      }}
    >
      <CircularMenu>sadad</CircularMenu>
      <CircularMenu>saasdasd</CircularMenu>
      <CircularMenu>asdad</CircularMenu>
    </FlexTransparentDiv>
  );
};

export default CicularNavComp;
