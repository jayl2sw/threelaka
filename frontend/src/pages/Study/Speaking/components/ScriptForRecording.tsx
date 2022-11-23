import React from 'react';
import { useEffect } from 'react';
import { EssayContainer } from '../../../../styles/Speaking/SpeakingStyle';
import { ScriptContainer } from '../../../../styles/Speaking/SpeakingStyle';
import { TextEssayBox } from '../../../../styles/Speaking/SpeakingStyle';
import { useAppSelector, useAppDispatch } from '../../../../utils/hooks';
import { readActions } from '../../../../features/Read/read-slice';
import { IEssayProps } from './EssayForTest';
import { studyActions } from '../../../../features/study/study-slice';
import { StudyPageParams } from '../../../../models';
import { useParams } from 'react-router-dom';
const ScriptForRecording = () => {
  const tedScriptList = useAppSelector((state) => state.read.TedScriptList);
  const pageParams: StudyPageParams = useParams() as any;
  useEffect(() => {
    if (pageParams.videoId !== '') {
      dispatch(readActions.getScripts(pageParams.videoId));
    }
  }, [pageParams.videoId]);
  const dispatch = useAppDispatch();
  const sentenceClickHandler = (
    e: React.MouseEvent<HTMLDivElement>,
    idx: number
  ) => {
    const pickedSentence = (e.target as HTMLDivElement).innerText;
    dispatch(studyActions.resetSpeechScore());

    if (e.currentTarget.classList.contains('backlight')) {
      e.currentTarget.classList.remove('backlight');
    } else {
      const rest = document.querySelectorAll('.backlight');
      rest.forEach((item, idx) => {
        item.classList.remove('backlight');
      });

      e.currentTarget.classList.add('backlight');
    }
  };

  useEffect(() => {
    const element = document.querySelectorAll('#textBox');
    const container = document.querySelector('#container');

    const options = {
      root: null, // viewport
      rootMargin: '100px',
      threshold: 1.0, // 50%가 viewport에 들어와 있어야 callback 실행
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        } else {
          entry.target.classList.remove('active');
        }
      });
    }, options);
    element.forEach((el: Element) => observer.observe(el));
  });
  return (
    <ScriptContainer id="container">
      {tedScriptList.length !== 0 ? (
        tedScriptList.map((item, idx) => (
          <TextEssayBox
            key={idx}
            onClick={(e) => sentenceClickHandler(e, idx)}
            style={{
              fontSize:
                item.text.length > 100
                  ? '2.3vmin'
                  : item.text.length > 50
                  ? '2.5vmin'
                  : '2.8vmin',

              lineHeight: '3vh',
            }}
            id="textBox"
          >
            {item.text}
          </TextEssayBox>
        ))
      ) : (
        <h2 style={{ textAlign: 'center', lineHeight: '20vh', color: 'black' }}>
          스크립트를 불러올 수 없어요😂
        </h2>
      )}
    </ScriptContainer>
  );
};
export default ScriptForRecording;
