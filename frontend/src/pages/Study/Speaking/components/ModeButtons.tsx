import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

// style
import { FlexTransparentDiv } from '../../../../styles/Common/CommonDivStyle';
import { RightBtn } from '../../../../styles/Common/CommonBtnStyle';
import { ModePickContainer } from '../../../../styles/Speaking/SpeakingStyle';

const ModeButtons = () => {
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const modeCode = useLocation().search.replace('?mode=', '');

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
    <ModePickContainer heightSize={modeCode === 'test' ? '82vh' : '50vh'}>
      <RightBtn
        widthSize={'5vw'}
        heightSize={'5vh'}
        paddingSize={'2'}
        fontSize={'1vw'}
        fontColor={'white'}
        backgroundColor={'blue'}
        style={{ marginTop: '2vh' }}
        onClick={onClickTest}
        className={modeCode === 'test' ? '' : 'not-active'}
      >
        발음 연습
      </RightBtn>
      <RightBtn
        widthSize={'5vw'}
        heightSize={'5vh'}
        paddingSize={'2'}
        fontSize={'1vw'}
        fontColor={'white'}
        backgroundColor={'blue'}
        style={{ marginTop: '0.5vh' }}
        onClick={onClickVideo}
        className={modeCode === 'video' ? '' : 'not-active'}
      >
        실전 녹화
      </RightBtn>
      <RightBtn
        widthSize={'5vw'}
        heightSize={'5vh'}
        paddingSize={'2'}
        fontSize={'1vw'}
        fontColor={'white'}
        backgroundColor={'blue'}
        style={{ marginTop: '0.5vh' }}
        onClick={onClickAudio}
        className={modeCode === 'audio' ? '' : 'not-active'}
      >
        실전 녹음{' '}
      </RightBtn>
    </ModePickContainer>
  );
};

export default ModeButtons;
