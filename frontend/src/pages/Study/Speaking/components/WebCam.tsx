// import React from 'react';
// import { useRef, useState, useCallback, useEffect } from 'react';
// import Webcam from 'react-webcam';

// // style
// import { FlexTransparentDiv } from '../../../../styles/Common/CommonDivStyle';
import {
  VideoAudioContainer,
  VideoAudioBtnContainer,
  VideoAudioBtn,
} from '../../../../styles/Speaking/SpeakingStyle';

// const WebCam = () => {
//   const webcamRef = useRef<Webcam & HTMLVideoElement>(null) as any;
//   const mediaRecorderRef = useRef<any>(null);
//   const [recording, setRecording] = useState<boolean>(false);
//   const [recordedChunks, setRecordedChunks] = useState([]);
//   const isInitialMount = useRef(true);
//   const [camIsOn, setcamIsOn] = useState<boolean>(true);

//   useEffect(() => {
//     if (isInitialMount.current) {
//       isInitialMount.current = false;
//     } else {
//       if (!recordedChunks) {
//         handleDownload();
//       }
//     }
//   }, [recordedChunks]);

//   // 영상 녹화 시작
//   const handleStartCaptureClick = useCallback(() => {
//     setRecordedChunks([]);
//     setRecording(true);
//     mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
//       mimeType: 'video/webm',
//     });
//     mediaRecorderRef.current.addEventListener(
//       'dataavailable',
//       handleDataAvailable
//     );
//     mediaRecorderRef.current.start();
//   }, [webcamRef, setRecording, mediaRecorderRef]);

//   const handleDataAvailable = useCallback(
//     ({ data }) => {
//       if (data.size > 0) {
//         setRecordedChunks((prev) => prev.concat(data));
//       }
//     },
//     [setRecordedChunks]
//   );

//   // 영상 녹화 정지
//   const handleStopCaptureClick = useCallback(() => {
//     mediaRecorderRef.current.stop();
//     setRecording(false);
//   }, [mediaRecorderRef, webcamRef, recordedChunks, setRecording]);

//   // 영상 녹화 <=> 녹화 영상
//   const turnScreen = useCallback(() => {
//     setcamIsOn(!camIsOn);
//   }, [camIsOn]);

//   // 녹화된 영상 세팅
//   const setRecordedVideo = useCallback(() => {
//     if (recordedChunks.length) {
//       const blob = new Blob(recordedChunks, {
//         type: 'video/webm',
//       });
//       const url = URL.createObjectURL(blob);
//       const video = document.getElementById('video-replay') as HTMLVideoElement;

//       video.src = url;
//     }
//   }, [recordedChunks]);

//   // 영상 다운로드
//   const handleDownload = useCallback(() => {
//     const blob = new Blob(recordedChunks, {
//       type: 'video/webm',
//     });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     document.body.appendChild(a);
//     a.href = url;
//     a.download = 'react-webcam-stream-capture.webm';
//     a.click();
//     window.URL.revokeObjectURL(url);
//     setRecordedChunks([]);
//   }, [recordedChunks]);

//   return (
//     <FlexTransparentDiv
//       widthSize={'40vw'}
//       heightSize={'42vh'}
//       paddingSize={'4vw'}
//       flexDirection={'column'}
//       justifyContent={'center'}
//       alignItems={'center'}
//       IsBorder={'none'}
//     >
//       <VideoAudioContainer>
//         <Webcam
//           audio={true}
//           style={{ display: `${camIsOn ? '' : 'none'}` }}
//           ref={webcamRef}
//           muted
//         />
//         <video
//           id="video-replay"
//           style={{ display: `${camIsOn ? 'none' : ''}` }}
//           controls
//         ></video>
//       </VideoAudioContainer>
//       <VideoAudioBtnContainer>
//         <VideoAudioBtn
//           onClick={() => {
//             turnScreen();
//             setRecordedVideo();
//           }}
//           title="화면 전환"
//         >
//           <MdCameraswitch />
//         </VideoAudioBtn>
//         {recording ? (
//           <VideoAudioBtn onClick={handleStopCaptureClick} title="녹화 중지">
//             <BsFillStopFill />
//           </VideoAudioBtn>
//         ) : (
//           <VideoAudioBtn onClick={handleStartCaptureClick} title="녹화 시작">
//             <BsFillRecordFill color="red" />
//           </VideoAudioBtn>
//         )}
//         <VideoAudioBtn onClick={handleDownload} title="영상 다운">
//           <MdDownload />
//         </VideoAudioBtn>
//       </VideoAudioBtnContainer>
//     </FlexTransparentDiv>
//   );
// };

// export default WebCam;

import React, { useEffect, useState } from 'react';
import { useRecordWebcam } from 'react-record-webcam';
import { VideoBtnBox } from '../../../../styles/Speaking/SpeakingStyle';
import { BsFillRecordFill, BsFillStopFill } from 'react-icons/bs';
import { MdDownload, MdCameraswitch, MdReplay } from 'react-icons/md';
import { BsCameraFill } from 'react-icons/bs';
import styled from 'styled-components';

import { LoadingSpinner } from '../../../../styles/Common/LoadingSpinner';
const CameraIcon = styled(BsCameraFill)`
  color: white;
`;

export default function WebCam() {
  const [isCamera, setIsCamera] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isRetake, setIsRetake] = useState<boolean>(false);

  const OPTIONS = {
    filename: 'test-filename',
    fileType: 'mp4',
    width: 1920,
    height: 1080,
  };
  const recordWebcam = useRecordWebcam(OPTIONS);

  useEffect(() => {
    recordWebcam.open();
    setTimeout(() => {
      setIsCamera(true);
    }, 2000);
  }, []);
  return (
    <div style={{ position: 'relative' }}>
      <video
        ref={recordWebcam.webcamRef}
        style={{
          display: `${
            recordWebcam.status === 'OPEN' ||
            recordWebcam.status === 'RECORDING'
              ? 'block'
              : 'none'
          }`,
          width: '45vw',
          height: '45vh',
        }}
        autoPlay
        muted
      />
      <video
        ref={recordWebcam.previewRef}
        style={{
          display: `${recordWebcam.status === 'PREVIEW' ? 'block' : 'none'}`,
          width: '45vw',
          height: '45vh',
        }}
        controls
      />

      {isCamera ? (
        <VideoBtnBox
          style={{
            position: 'absolute',
            top: '36vh',
            zIndex: '1',
            left: '20.5vw',
          }}
        >
          {isRecording ? (
            <>
              <div
                style={{
                  background: '#111111',
                  borderRadius: '50%',
                  width: '8vmin',
                  height: '8vmin',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: '2',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  recordWebcam.stop();
                  setIsRecording(false);

                  setIsShow(true);
                }}
              >
                <CameraIcon size={35} />
              </div>
              {isRecording ? (
                <LoadingSpinner
                  widthSize="8.8vmin"
                  heightSize="8.8vmin"
                  style={{
                    display: 'absolute',
                    top: '-8.5vh',
                    zIndex: '-1',
                    right: '0.2vw',
                  }}
                ></LoadingSpinner>
              ) : null}
            </>
          ) : (
            <div style={{ display: isShow || isRetake ? 'none' : 'block' }}>
              <div
                style={{
                  background: '#111111',
                  borderRadius: '50%',
                  width: '8vmin',
                  height: '8vmin',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  recordWebcam.start();
                  setIsRecording(true);
                }}
              >
                <CameraIcon size={35} />
              </div>
            </div>
          )}

          {!isShow ? null : (
            <div
              style={{ position: 'absolute', top: '-35vh', right: '-7.5vw' }}
            >
              <VideoBtnBox style={{ display: 'flex' }}>
                <VideoAudioBtn
                  onClick={() => {
                    recordWebcam.retake();

                    setIsShow(false);
                    setIsRetake(true);
                    setTimeout(() => {
                      setIsRetake(false);
                    }, 2000);
                  }}
                >
                  <MdReplay />
                </VideoAudioBtn>
                <VideoAudioBtn onClick={recordWebcam.download}>
                  <MdDownload />
                </VideoAudioBtn>
                {/* <button onClick={recordWebcam.download}>Download</button> */}
              </VideoBtnBox>
            </div>
          )}
        </VideoBtnBox>
      ) : null}
    </div>
  );
}
