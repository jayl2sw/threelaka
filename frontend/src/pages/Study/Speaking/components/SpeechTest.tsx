import React, { useEffect } from 'react';
import EssayScript from './EssayScript';
import VoiceRecorderForTest from './VoiceRecorderForTest';
import { useState } from 'react';
import { StudyPageParams } from '../../../../models';
import { useParams } from 'react-router-dom';
import {
  SpeechResultBox,
  TextBox,
  ScoreTextBox,
  ColorScoreIndicator,
  SpeechTestContainer,
  ScoreIcon,
  MarkedTextBox,
  Score,
} from '../../../../styles/Speaking/SpeakingStyle';
import { useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../utils/hooks';
import ScoreIndicator from '../../Speaking/components/ScoreIndicator';
import { studyActions } from '../../../../features/study/study-slice';

const SpeechTest = () => {
  const pageParams: StudyPageParams = useParams() as any;
  const [selectedText, setSelectedText] = useState<string>('');
  const [flag, setFlag] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const speechScores = useAppSelector((state) => state.study.speechScores);
  const totalScore = useAppSelector((state) => state.study.totalScore);
  const pickedTextBox = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(studyActions.resetSpeechScore());
  }, []);

  //0~50 : bad
  //50~70 : well
  //70~90 : good
  //90~`00 : verygood

  return (
    <SpeechTestContainer>
      <SpeechResultBox>
        {/* {speechScores.length !== 0 ? (
          <ScoreIndicator value={totalScore} maxValue={100}></ScoreIndicator>
        ) : null}

        {selectedText ? (
          <TextBox style={{ color: '#111111' }}>{selectedText}</TextBox>
        ) : speechScores.length !== 0 ? (
          <>
            <ColorScoreIndicator>
              <div>
                <></>
                <></>
                <></>
                <></>
              </div>
            </ColorScoreIndicator>
            <TextBox
              style={{ color: '#111111', width: 'auto', fontSize: '3vmin' }}
              ref={pickedTextBox}
            >
              {selectedText.split(/\r?\n| /).map((word, idx) => (
                <ScoreTextBox>
                  <span
                    className={`${
                      speechScores[idx].score <= 50
                        ? 'bad'
                        : speechScores[idx].score <= 70
                        ? 'well'
                        : speechScores[idx].score <= 90
                        ? 'good'
                        : 'verygood'
                    }`}
                  >
                    {word}
                  </span>
                  <span>&nbsp;</span>
                </ScoreTextBox>
              ))}
            </TextBox>
          </>
        ) : (
          <TextBox>테스트하고 싶은 문장을 클릭해보세요</TextBox>
        )} */}
        {speechScores && speechScores.length !== 0 ? (
          <ScoreIndicator value={totalScore} maxValue={100}></ScoreIndicator>
        ) : null}
        {speechScores && speechScores.length !== 0 ? (
          <MarkedTextBox>
            <ColorScoreIndicator>
              <div className="box">
                <div className="innerBox">
                  <ScoreIcon className="bad" />
                  <Score>0-50</Score>
                </div>
                <div className="innerBox">
                  <ScoreIcon className="well" />
                  <Score>50-70</Score>
                </div>
                <div className="innerBox">
                  <ScoreIcon className="good" />
                  <Score>70-90</Score>
                </div>
                <div className="innerBox">
                  <ScoreIcon className="verygood" />
                  <Score>90-100</Score>
                </div>
              </div>
            </ColorScoreIndicator>
            <TextBox
              style={{ color: '#111111', width: 'auto', fontSize: '3vmin' }}
              ref={pickedTextBox}
            >
              {selectedText.split(/\r?\n| /).map((word, idx) => (
                <ScoreTextBox>
                  <span
                    className={`${
                      speechScores[idx].score <= 50
                        ? 'bad'
                        : speechScores[idx].score <= 70
                        ? 'well'
                        : speechScores[idx].score <= 90
                        ? 'good'
                        : 'verygood'
                    }`}
                  >
                    {word}
                  </span>
                  <span>&nbsp;</span>
                </ScoreTextBox>
              ))}
            </TextBox>
          </MarkedTextBox>
        ) : selectedText ? (
          <TextBox style={{ color: '#111111' }}>{selectedText}</TextBox>
        ) : (
          <TextBox>테스트하고 싶은 문장을 클릭해보세요</TextBox>
        )}
      </SpeechResultBox>

      {/* null일때 */}
      {/* <p>테스트하고 싶은 문장을 클릭해보세요!</p> */}
      <VoiceRecorderForTest
        selectedText={selectedText}
        setFlag={setFlag}
      ></VoiceRecorderForTest>
      <EssayScript
        setSelectedText={setSelectedText}
        pageParams={pageParams}
        setFlag={setFlag}
      ></EssayScript>
    </SpeechTestContainer>
  );
};

export default SpeechTest;
