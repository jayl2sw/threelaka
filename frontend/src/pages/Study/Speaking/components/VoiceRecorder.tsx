import React from 'react';
import { useAudioRecorder } from '@sarafhbk/react-audio-recorder';
import * as fs from 'fs';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '../../../../utils/hooks';
import { studyActions } from '../../../../features/study/study-slice';

// style
import {
  VideoAudioContainer,
  VideoAudioBtnContainer,
  VideoAudioBtn,
} from '../../../../styles/Speaking/SpeakingStyle';
import { BsFillRecordFill, BsFillStopFill } from 'react-icons/bs';
import { MdDownload, MdCameraswitch } from 'react-icons/md';

const VoiceRecorder = () => {
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

  return (
    <div>
      <audio controls src={audioResult} />
      {/* idle => 빨간 점, recordeing: REC 로고 */}
      <p>{status}</p>
      <div>
        <p>{new Date(timer * 1000).toISOString().substr(11, 8)}</p>

        <VideoAudioBtnContainer>
          <VideoAudioBtn onClick={startRecording}>
            <BsFillRecordFill color={'red'} />
          </VideoAudioBtn>
          <VideoAudioBtn onClick={stopRecording}>
            <BsFillStopFill />
          </VideoAudioBtn>
          <VideoAudioBtn onClick={pauseRecording}>일시 정지</VideoAudioBtn>
          <VideoAudioBtn onClick={resumeRecording}>계속 진행</VideoAudioBtn>
        </VideoAudioBtnContainer>
      </div>
    </div>
  );
};

export default VoiceRecorder;
