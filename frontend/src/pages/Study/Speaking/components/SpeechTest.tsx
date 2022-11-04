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
import { LoadingSpinner } from '../../../../styles/Common/LoadingSpinner';
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
  const scoreLoading = useAppSelector((state) => state.study.loading);
  useEffect(() => {
    dispatch(studyActions.resetSpeechScore());
  }, []);

  return (
    <SpeechTestContainer>
      <SpeechResultBox>
        {scoreLoading ? (
          <LoadingSpinner
            widthSize="20vmin"
            heightSize="20vmin"
            style={{ marginTop: '2vh' }}
          />
        ) : (
          <>
            {speechScores && speechScores.length !== 0 ? (
              <ScoreIndicator
                value={totalScore}
                maxValue={100}
              ></ScoreIndicator>
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
                        style={{ color: '#fff' }}
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
          </>
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
