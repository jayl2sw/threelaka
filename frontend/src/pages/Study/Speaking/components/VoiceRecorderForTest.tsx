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
  RecordBox,
} from '../../../../styles/Speaking/SpeakingStyle';
import { BsFillRecordFill, BsFillStopFill, BsPauseFill } from 'react-icons/bs';
import { MdDownload, MdCameraswitch } from 'react-icons/md';

import { LoadingSpinner } from '../../../../styles/Common/LoadingSpinner';
import { margin } from '@material-ui/system';

interface IRecorderProps {
  selectedText: string;
  setIsTestStart: React.Dispatch<React.SetStateAction<boolean>>;
  isTestStart: boolean;
}

const VoiceRecorderForTest = ({
  selectedText,
  setIsTestStart,
  isTestStart,
}: IRecorderProps) => {
  const [audioFile, setAudioFile] = useState<any>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
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

  const speechTest = async () => {
    var data = new FormData();
    const audioBlob = await fetch(audioResult).then((r) => r.blob());
    const audioFile = new File([audioBlob], 'voice.wav', { type: 'audio/wav' });
    data.append('file', audioFile);
    dispatch(
      studyActions.speechTest({ payloadData: data, payloadText: selectedText })
    );
  };
  const [recording, setRecording] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  useEffect(() => {
    speechTest();
  }, [audioResult]);

  // const toggleTestStart = () => {
  //   setIsTestStart(true);
  // };

  // const toggleIsRecording = () => {
  //   setIsRecording(!isRecording);
  // };

  const handleStartRecording = () => {
    startRecording();
    setRecording(true);
    setIsPaused(false);
    setIsTestStart(true);
    setIsRecording(!isRecording);
  };

  const handleResumeRecording = () => {
    resumeRecording();
    setRecording(true);
    setIsPaused(false);
    setIsRecording(!isRecording);
  };

  const handlePauseRecording = () => {
    setIsPaused(true);
    setRecording(false);

    setIsRecording(!isRecording);
  };

  const handleStopRecording = () => {
    setRecording(false);
    setIsPaused(false);
    setIsRecording(!isRecording);
  };

  return (
    <div>
      <p style={{ textAlign: 'center', fontSize: '2vmin' }}>
        {new Date(timer * 1000).toISOString().substr(11, 8)}
      </p>
      {/* null일때 */}
      {/* <p>테스트하고 싶은 문장을 클릭해보세요!</p> */}
      {/* idle => 빨간 점, recordeing: REC 로고 */}
      {/* <p>{status}</p> */}
      <RecordBox>
        <VideoAudioBtnContainer className="test-recorder" style={{}}>
          {isRecording ? (
            <LoadingSpinner
              widthSize="7.3vmin"
              heightSize="7.3vmin"
              style={{ display: 'absolute', left: '8vmin' }}
            ></LoadingSpinner>
          ) : null}
          {recording ? (
            <VideoAudioBtn
              onClick={() => {
                pauseRecording();
                handlePauseRecording();
              }}
              title="일시 중지"
              style={{ zIndex: '1' }}
            >
              <BsPauseFill />
            </VideoAudioBtn>
          ) : (
            <VideoAudioBtn
              onClick={isPaused ? handleResumeRecording : handleStartRecording}
              title="녹음 시작"
              style={{ zIndex: '1' }}
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

          {/* {isRecording ? (
            <LoadingSpinner
              widthSize="7vmin"
              heightSize="10vmin"
              style={{ display: 'absolute', left: '3.7vw' }}
            ></LoadingSpinner>
          ) : null}
          <VideoAudioBtn
            onClick={() => {
              startRecording();
              toggleTestStart();
              toggleIsRecording();
            }}
            style={{ zIndex: '1' }}
          >
            <BsFillRecordFill color={'red'} />
          </VideoAudioBtn>
          <VideoAudioBtn
            onClick={() => {
              stopRecording();
              toggleIsRecording();
            }}
          >
            <BsFillStopFill />
          </VideoAudioBtn>
          <VideoAudioBtn onClick={pauseRecording}>일시 정지</VideoAudioBtn>
          <VideoAudioBtn onClick={resumeRecording}>계속 진행</VideoAudioBtn> */}
        </VideoAudioBtnContainer>
        <audio controls src={audioResult} />
      </RecordBox>
    </div>
  );
};

export default VoiceRecorderForTest;
