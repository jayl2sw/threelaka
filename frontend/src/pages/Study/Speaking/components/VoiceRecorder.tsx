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
  // //뉴라인만
  // let dummy1 =
  //   'Yes of course.\
  //   I grew up playing football like most children in my country.';
  // //점만
  // let dummy2 = 'I go to school. And I am so happy.';
  // //뉴라인이랑 점 둘다
  // let dummy3 =
  //   'Yes of course.\
  // I grew up playing football like most children in my country. I go to school.';

  // let splittedText = dummy3.split('.');

  // const texts = splittedText.map((item, key) => {
  //   let trimmed = item.trimStart();
  //   return trimmed;
  // });

  // const filteredText = texts.filter((text) => text.length > 0);
  // console.log('잘필터링되나', filteredText);

  const speechTest = async () => {
    var data = new FormData();
    // var reader = new FileReader();

    console.log('애초에 처음에 없는거아님?', audioResult);
    console.log(typeof audioResult);
    let blob = new Blob([audioResult], { type: 'audio/wav' });
    console.log('블랍?', blob);
    console.log(typeof blob);

    data.append('text', 'apple');

    data.append('user_audio_file', blob);
    dispatch(studyActions.speechTest(data));
  };

  // useEffect(() => {
  //   speechTest();
  // }, [audioResult]);

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
