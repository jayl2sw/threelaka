import React, { useState } from 'react';
import { useAudioRecorder } from '@sarafhbk/react-audio-recorder';
import * as fs from 'fs';
import { useEffect } from 'react';
import { useAppDispatch } from '../../../../utils/hooks';
import { studyActions } from '../../../../features/study/study-slice';
import { LoadingSpinner } from '../../../../styles/Common/LoadingSpinner';
// style
import { FlexTransparentDiv } from '../../../../styles/Common/CommonDivStyle';
import {
  VideoAudioContainer,
  VideoAudioBtnContainer,
  VideoAudioBtn,
} from '../../../../styles/Speaking/SpeakingStyle';
import { BsFillRecordFill, BsFillStopFill, BsPauseFill } from 'react-icons/bs';
import { dividerClasses } from '@material-ui/core';
import ToolTip from '../../../../utils/ToolTip';

const VoiceRecorder = () => {
  const [recording, setRecording] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const {
    audioResult,
    timer,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    status,
  } = useAudioRecorder();

  const dispatch = useAppDispatch();

  const handleStartRecording = () => {
    startRecording();
    setRecording(true);
    setIsPaused(false);
  };

  const handleResumeRecording = () => {
    resumeRecording();
    setRecording(true);
    setIsPaused(false);
  };

  const handlePauseRecording = () => {
    setIsPaused(true);
    setRecording(false);
  };

  const handleStopRecording = () => {
    setRecording(false);
    setIsPaused(false);
  };

  return (
    <FlexTransparentDiv
      widthSize={'32vw'}
      heightSize={'42vh'}
      paddingSize={'4vw'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      IsBorder={'none'}
    >
      <VideoAudioContainer>
        <audio controls src={audioResult} />
        {/* idle => 빨간 점, recordeing: REC 로고 */}
        {/* <p>{status}</p> */}
        <p>{new Date(timer * 1000).toISOString().substr(11, 8)}</p>
        <VideoAudioBtnContainer>
          {recording ? (
            <VideoAudioBtn
              onClick={() => {
                pauseRecording();
                handlePauseRecording();
              }}
              title="일시 중지"
            >
              <BsPauseFill />
            </VideoAudioBtn>
          ) : (
            <VideoAudioBtn
              onClick={isPaused ? handleResumeRecording : handleStartRecording}
              title="녹음 시작"
            >
              <BsFillRecordFill color={'red'} />
            </VideoAudioBtn>
          )}

          <VideoAudioBtn
            onClick={() => {
              stopRecording();
              handleStopRecording();
            }}
            title="녹음 중지"
          >
            <BsFillStopFill />
          </VideoAudioBtn>
        </VideoAudioBtnContainer>
      </VideoAudioContainer>
    </FlexTransparentDiv>
  );
};

export default VoiceRecorder;
