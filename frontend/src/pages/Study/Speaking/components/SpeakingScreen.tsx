import React from 'react';
import { useAppDispatch } from '../../../../utils/hooks';
import ModeBtnContainer from './ModeBtnContainer';
import { useLocation } from 'react-router-dom';
import ModeScreen from './ModeScreen';

// style
import {
  FlexTransparentDiv,
  MainBox,
} from '../../../../styles/Common/CommonDivStyle';

const SpeakingScreen = () => {
  const dispatch = useAppDispatch;

  // const modeCode = useLocation().search.replace('?mode=', '');

  return (
    // 투명 컨테이너로 바꿔두고, row!
    <FlexTransparentDiv
      widthSize={'50vw'}
      heightSize={'50vh'}
      paddingSize={'0'}
      flexDirection={'row'}
      justifyContent={'center'}
      alignItems={'center'}
      IsBorder={'none'}
    >
      <ModeScreen />
      <ModeBtnContainer />
    </FlexTransparentDiv>
  );
};

export default SpeakingScreen;
