import React from 'react';
import { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';
import { VideoAudioContainer } from '../../../../styles/Speaking/SpeakingStyle';

const WebCam = () => {
  const webcamRef = useRef<Webcam & HTMLVideoElement>(null) as any;
  const mediaRecorderRef = useRef<any>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const isInitialMount = useRef(true);
  const [camIsOn, setcamIsOn] = useState<boolean>(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (!recordedChunks) {
        console.log('running handleDownload');
        handleDownload();
      }
    }
  }, [recordedChunks]);

  // 영상 녹화 시작
  const handleStartCaptureClick = useCallback(() => {
    setRecordedChunks([]);
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm',
    });
    mediaRecorderRef.current.addEventListener(
      'dataavailable',
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  // 영상 녹화 정지
  const handleStopCaptureClick = useCallback(() => {
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, recordedChunks, setCapturing]);

  // 영상 녹화 <=> 녹화 영상
  const turnScreen = useCallback(() => {
    setcamIsOn(!camIsOn);
  }, [camIsOn]);

  // 녹화된 영상 세팅
  const setRecordedVideo = useCallback(() => {
    console.log(recordedChunks);
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      });
      const url = URL.createObjectURL(blob);
      const video = document.getElementById('video-replay') as HTMLVideoElement;
      console.log(video, camIsOn);
      video.src = url;
    }
  }, [recordedChunks]);

  // 영상 다운로드
  const handleDownload = useCallback(() => {
    const blob = new Blob(recordedChunks, {
      type: 'video/webm',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = 'react-webcam-stream-capture.webm';
    a.click();
    window.URL.revokeObjectURL(url);
    setRecordedChunks([]);
  }, [recordedChunks]);

  return (
    <div>
      <VideoAudioContainer>
        <Webcam
          audio={true}
          style={{ display: `${camIsOn ? '' : 'none'}` }}
          ref={webcamRef}
          muted
        />
        <video
          id="video-replay"
          style={{ display: `${camIsOn ? 'none' : ''}` }}
          controls
        ></video>
      </VideoAudioContainer>

      {capturing ? (
        <button onClick={handleStopCaptureClick}>녹화 중지</button>
      ) : (
        <button onClick={handleStartCaptureClick}>녹화 시작</button>
      )}

      {recordedChunks.length > 0 && (
        <div>
          <button
            onClick={() => {
              turnScreen();
              setRecordedVideo();
            }}
          >
            화면 전환
          </button>
          <button onClick={handleDownload}>영상 다운</button>
        </div>
      )}
    </div>
  );
};

export default WebCam;
