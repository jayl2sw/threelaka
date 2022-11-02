import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ModeBtnBox } from '../../../../styles/Speaking/SpeakingStyle';
import { SpeakingMode } from '../../../../models';

const ModeBtnContainer = (props: SpeakingMode) => {
  const modeType = props.mode;
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;

  const onClickTest = () => {
    navigate({
      pathname: currentPath,
      search: '?mode=test',
    });
  };
  const onClickVideo = () => {
    navigate({
      pathname: currentPath,
      search: '?mode=video',
    });
  };
  const onClickAudio = () => {
    navigate({
      pathname: currentPath,
      search: '?mode=audio',
    });
  };

  return (
    <ModeBtnBox>
      <button onClick={onClickTest}>발음 연습</button>
      <button onClick={onClickVideo}>실전 녹화</button>
      <button onClick={onClickAudio}>실전 녹음 </button>
    </ModeBtnBox>
  );
};

export default ModeBtnContainer;
