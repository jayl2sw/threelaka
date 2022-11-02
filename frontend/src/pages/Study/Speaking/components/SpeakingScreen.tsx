import React from 'react';
import { useAppDispatch } from '../../../../utils/hooks';
import ModeBtnContainer from './ModeBtnContainer';
import { useLocation } from 'react-router-dom';
// import SpeakingMode from '../../../../models/study';
import styled from 'styled-components';

import ModeScreen from './ModeScreen';

const SpeakingScreen = () => {
  const dispatch = useAppDispatch;

  // const modeCode = useLocation().search.replace('?mode=', '');

  const SecreenBlock = styled.div`
    background-color: yellowgreen;
    border: 2px solid yellowgreen;
    display: flex;
    flex-direction: row;
  `;

  return (
    // 투명 컨테이너로 바꿔두고, row!
    <SecreenBlock>
      <ModeScreen />
      <ModeBtnContainer />
    </SecreenBlock>
  );
};

export default SpeakingScreen;
