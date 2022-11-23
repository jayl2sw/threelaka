import React, { useEffect } from 'react';
import EssayForTest from './EssayForTest';
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
import {
  ErrorText,
  ErrorBlock,
} from '../../../../styles/Speaking/SpeakingStyle';
import { FaBullseye, FaLessThanEqual } from 'react-icons/fa';
import { MainBox, MainPaleBox } from '../../../../styles/Common/CommonDivStyle';
const SpeechTest = () => {
  const pageParams: StudyPageParams = useParams() as any;
  const [selectedText, setSelectedText] = useState<string>('');

  const dispatch = useAppDispatch();
  const speechScores = useAppSelector((state) => state.study.speechScores);
  const totalScore = useAppSelector((state) => state.study.totalScore);
  const speechTestError = useAppSelector(
    (state) => state.study.speechTestError
  );
  const pickedTextBox = useRef<HTMLDivElement>(null);
  const scoreLoading = useAppSelector((state) => state.study.loading);
  const [initialText, setInitailText] = useState(false);
  useEffect(() => {
    dispatch(studyActions.resetSpeechScore());
    setInitailText(true);
  }, []);

  const [isTestStart, setIsTestStart] = useState<boolean>(false);
  return (
    <SpeechTestContainer>
      <MainPaleBox
        widthSize={'50vw'}
        heightSize={'50vh'}
        paddingSize={'0'}
        fontSize={'3.8vmin'}
        fontColor={'black'}
        style={{ minHeight: '50vh' }}
      >
        <SpeechResultBox>
          {isTestStart && speechTestError ? (
            <>
              <ErrorBlock>
                <ErrorText>발음 테스트가 어렵습니다😂</ErrorText>
                <ErrorText>
                  테스트하려는 문장을 클릭했는지, 녹음은 잘 되었는지
                  확인해주세요.
                </ErrorText>
              </ErrorBlock>
            </>
          ) : (
            <>
              {isTestStart && scoreLoading ? (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <h3 style={{ margin: '0' }}>발음 분석 중 입니다</h3>
                  <LoadingSpinner
                    widthSize="20vmin"
                    heightSize="20vmin"
                    style={{ marginTop: '2vh' }}
                  />
                </div>
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
                      <ColorScoreIndicator style={{ fontSize: '2vmin' }}>
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
                        style={{
                          color: '#111111',
                          width: 'auto',
                          fontSize: '3vmin',
                          display: 'flex',
                          flexWrap: 'wrap',
                        }}
                        ref={pickedTextBox}
                      >
                        {selectedText.split(/\r?\n| /).map((word, idx) => (
                          <ScoreTextBox
                            style={{
                              fontSize:
                                selectedText.length > 100
                                  ? '2.3vmin'
                                  : selectedText.length > 50
                                  ? '2.8vmin'
                                  : '3vmin',
                            }}
                          >
                            <span
                              style={{ color: '#111111', fontWeight: 'bold' }}
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
                    <TextBox
                      style={{
                        color: '#111111',
                        fontSize:
                          selectedText.length > 100 ? '2.8vmin' : '3.8vmin',
                      }}
                    >
                      {selectedText}
                    </TextBox>
                  ) : initialText ? (
                    <TextBox>테스트하고 싶은 문장을 클릭해보세요</TextBox>
                  ) : (
                    ''
                  )}
                </>
              )}
            </>
          )}
        </SpeechResultBox>

        {/* null일때 */}
        {/* <p>테스트하고 싶은 문장을 클릭해보세요!</p> */}
        <VoiceRecorderForTest
          selectedText={selectedText}
          setIsTestStart={setIsTestStart}
          isTestStart={isTestStart}
        ></VoiceRecorderForTest>
      </MainPaleBox>
      <MainBox
        widthSize={'50vw'}
        heightSize={'30vh'}
        paddingSize={'0'}
        fontSize={'1vw'}
        fontColor={'black'}
        style={{ marginTop: '2vh' }}
      >
        <EssayForTest
          setSelectedText={setSelectedText}
          pageParams={pageParams}
        ></EssayForTest>
      </MainBox>
    </SpeechTestContainer>
  );
};

export default SpeechTest;
