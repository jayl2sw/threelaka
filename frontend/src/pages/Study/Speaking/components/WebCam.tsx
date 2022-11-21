import React from 'react';
import { useRef, useState, useCallback, useEffect } from 'react';
import Webcam from 'react-webcam';

// style
import { FlexTransparentDiv } from '../../../../styles/Common/CommonDivStyle';
import {
  VideoAudioContainer,
  VideoAudioBtnContainer,
  VideoAudioBtn,
} from '../../../../styles/Speaking/SpeakingStyle';
import { BsFillRecordFill, BsFillStopFill } from 'react-icons/bs';
import { MdDownload, MdCameraswitch } from 'react-icons/md';

const WebCam = () => {
  const webcamRef = useRef<Webcam & HTMLVideoElement>(null) as any;
  const mediaRecorderRef = useRef<any>(null);
  const [recording, setRecording] = useState<boolean>(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const isInitialMount = useRef(true);
  const [camIsOn, setcamIsOn] = useState<boolean>(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (!recordedChunks) {
        handleDownload();
      }
    }
  }, [recordedChunks]);

  // 영상 녹화 시작
  const handleStartCaptureClick = useCallback(() => {
    setRecordedChunks([]);
    setRecording(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm',
    });
    mediaRecorderRef.current.addEventListener(
      'dataavailable',
      handleDataAvailable
    );
    mediaRecorderRef.current.start();
  }, [webcamRef, setRecording, mediaRecorderRef]);

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
    setRecording(false);
  }, [mediaRecorderRef, webcamRef, recordedChunks, setRecording]);

  // 영상 녹화 <=> 녹화 영상
  const turnScreen = useCallback(() => {
    setcamIsOn(!camIsOn);
  }, [camIsOn]);

  // 녹화된 영상 세팅
  const setRecordedVideo = useCallback(() => {
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      });
      const url = URL.createObjectURL(blob);
      const video = document.getElementById('video-replay') as HTMLVideoElement;

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
    <FlexTransparentDiv
      widthSize={'40vw'}
      heightSize={'42vh'}
      paddingSize={'4vw'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
      IsBorder={'none'}
    >
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
      <VideoAudioBtnContainer>
        <VideoAudioBtn
          onClick={() => {
            turnScreen();
            setRecordedVideo();
          }}
          title="화면 전환"
        >
          <MdCameraswitch />
        </VideoAudioBtn>
        {recording ? (
          <VideoAudioBtn onClick={handleStopCaptureClick} title="녹화 중지">
            <BsFillStopFill />
          </VideoAudioBtn>
        ) : (
          <VideoAudioBtn onClick={handleStartCaptureClick} title="녹화 시작">
            <BsFillRecordFill color="red" />
          </VideoAudioBtn>
        )}
        <VideoAudioBtn onClick={handleDownload} title="영상 다운">
          <MdDownload />
        </VideoAudioBtn>
      </VideoAudioBtnContainer>
    </FlexTransparentDiv>
  );
};

export default WebCam;
