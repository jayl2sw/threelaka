import React from 'react';
import {
  ModePickContainer,
  EssayContainer,
} from '../../../../styles/Speaking/SpeakingStyle';

const EssayScript = () => {
  return (
    <div>
      <ModePickContainer>
        <button>연습</button>
        <button>실전</button>
      </ModePickContainer>
      <EssayContainer>
        <div></div>
      </EssayContainer>
    </div>
  );
};

export default EssayScript;
