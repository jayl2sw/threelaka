import React from 'react';
import { useAppDispatch } from '../../../../utils/hooks';
import ModeBtnContainer from './ModeButtons';
import { useLocation } from 'react-router-dom';
import ModeScreen from './ModeScreen';
import EssayButtons from './EssayButtons';
import EssayScreen from './EssayScreen';
import { useState } from 'react';
// style
import { FlexTransparentDiv } from '../../../../styles/Common/CommonDivStyle';

const SpeakingScreen = () => {
  const modeCode = useLocation().search.replace('?mode=', '');
  // const [essayOn, setEssayOn] = useState<0>;
  const [essayOn, setEssayOn] = useState<number>(0);
  if (modeCode !== 'test') {
    // 녹화 또는 녹음 모드
    return (
      <div>
        {/* 스크린 + 버튼 */}
        <FlexTransparentDiv
          widthSize={'60vw'}
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
        {/* 에세이 공간 */}
        <FlexTransparentDiv
          widthSize={'60vw'}
          heightSize={'30vh'}
          paddingSize={'0'}
          flexDirection={'row'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'none'}
          style={{ marginTop: '2vh' }}
        >
          <EssayScreen essayOn={essayOn} setEssayOn={setEssayOn} />
          <EssayButtons essayOn={essayOn} setEssayOn={setEssayOn} />
        </FlexTransparentDiv>
      </div>
    );
  } else {
    // 테스트 모드
    return (
      <div>
        {/* 테스트 모드 */}
        <FlexTransparentDiv
          widthSize={'60vw'}
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
      </div>
    );
  }
};

export default SpeakingScreen;
