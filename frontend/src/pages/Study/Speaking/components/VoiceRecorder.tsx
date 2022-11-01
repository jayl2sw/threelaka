import React from 'react';
import { useAudioRecorder } from '@sarafhbk/react-audio-recorder';

const VoiceRecorder = () => {
  const {
    audioResult,
    timer,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    status,
    errorMessage,
  } = useAudioRecorder();
  return (
    <div>
      <audio controls src={audioResult} />
      {/* idle => 빨간 점, recordeing: REC 로고 */}
      <p>{status}</p>
      <div>
        <p>{new Date(timer * 1000).toISOString().substr(11, 8)}</p>
        <div>
          <button onClick={startRecording}>녹음 시작</button>
          <button onClick={stopRecording}>녹음 정지</button>
          <button onClick={pauseRecording}>일시 정지</button>
          <button onClick={resumeRecording}>계속 진행</button>
        </div>
      </div>
    </div>
  );
};

export default VoiceRecorder;
