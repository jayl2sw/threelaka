import React from 'react';
import { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';

const WebCam = () => {
  const webcam = useRef(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [capturing, setCapturing] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const handleStartCaptureClick = useCallback(() => {
    setCapturing(true);
    mediaRecorder.current = new MediaRecorder(webcam.current.stream, {
      mimeType: 'video/webm',
    });
    mediaRecorder.current.addEventListener(
      'dataavailable',
      handleDataAvailable
    );
    mediaRecorder.current.start();
  }, [webcam, setCapturing, mediaRecorder]);

  return (
    <div>
      <Webcam audio={true} muted ref={webcam} />
    </div>
  );

  //   const webcam = useRef<Webcam>(null);

  //   return (
  //     <div>
  //       <Webcam audio={true} ref={webcam} mirrored={true} />
  //     </div>
  //   );
};

export default WebCam;
