import React from 'react';
import { FlexTransparentDiv } from '../../../../styles/Common/CommonDivStyle';

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
    ></FlexTransparentDiv>
  );
};

export default CicularNavComp;
