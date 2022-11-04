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
import { BsFillRecordFill, BsFillStopFill } from 'react-icons/bs';
import { MdDownload, MdCameraswitch } from 'react-icons/md';

interface IRecorderProps {
  selectedText: string;
  setFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

const VoiceRecorderForTest = ({ selectedText, setFlag }: IRecorderProps) => {
  const [audioFile, setAudioFile] = useState<any>('');
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

  useEffect(() => {
    speechTest();
    setFlag(true);
  }, [audioResult]);

  return (
    <div>
      <p style={{ textAlign: 'center', fontSize: '2vmin' }}>
        {new Date(timer * 1000).toISOString().substr(11, 8)}
      </p>
      {/* idle => 빨간 점, recordeing: REC 로고 */}
      {/* <p>{status}</p> */}

      <RecordBox>
        <VideoAudioBtnContainer className="test-recorder">
          <VideoAudioBtn onClick={startRecording}>
            <BsFillRecordFill color={'red'} />
          </VideoAudioBtn>
          <VideoAudioBtn onClick={stopRecording}>
            <BsFillStopFill />
          </VideoAudioBtn>
          <VideoAudioBtn onClick={pauseRecording}>일시 정지</VideoAudioBtn>
          <VideoAudioBtn onClick={resumeRecording}>계속 진행</VideoAudioBtn>
        </VideoAudioBtnContainer>
        <audio controls src={audioResult} />
      </RecordBox>
    </div>
  );
};

export default VoiceRecorderForTest;
