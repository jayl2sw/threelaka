import React from 'react';
import { useLocation } from 'react-router-dom';
import WebCam from '../components/WebCam';
import VoiceRecorder from '../components/VoiceRecorder';
import SpeechTest from '../components/SpeechTest';
//style
import { MainBox } from '../../../../styles/Common/CommonDivStyle';

const ModeScreen = () => {
  const modeCode = useLocation().search.replace('?mode=', '');

  if (modeCode == 'test') {
    return (
      <MainBox
        widthSize={'40vw'}
        heightSize={'50vh'}
        paddingSize={'2vw'}
        fontSize={'1rem'}
        color={'white'}
        fontColor={'black'}
      >
        <SpeechTest />
      </MainBox>
    );
  } else if (modeCode == 'video') {
    return (
      <MainBox
        widthSize={'40vw'}
        heightSize={'50vh'}
        paddingSize={'2vw'}
        fontSize={'1rem'}
        color={'white'}
        fontColor={'black'}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <WebCam />
      </MainBox>
    );
  } else if (modeCode === 'audio') {
    return (
      <MainBox
        widthSize={'40vw'}
        heightSize={'50vh'}
        paddingSize={'2vw'}
        fontSize={'1rem'}
        color={'white'}
        fontColor={'black'}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <VoiceRecorder />
      </MainBox>
    );
  } else {
    return (
      <MainBox
        widthSize={'40vw'}
        heightSize={'50vh'}
        paddingSize={'2vw'}
        fontSize={'1rem'}
        color={'white'}
        fontColor={'black'}
      ></MainBox>
    );
  }
};

export default ModeScreen;
