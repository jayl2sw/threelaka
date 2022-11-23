import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '../../../../utils/hooks';
import { writingActions } from '../../../../features/writing/writing-slice';
import {
  FlexTransparentDiv,
  MainBox,
} from '../../../../styles/Common/CommonDivStyle';
import { StudyPageParams } from '../../../../models';
import { useAppSelector } from '../../../../utils/hooks';
import { IEssayButtons } from './EssayButtons';
import {
  TextEssayBox,
  EssayContainer,
  TextContainer,
} from '../../../../styles/Speaking/SpeakingStyle';
import { useParams } from 'react-router-dom';
import ScriptForSpeaking from './ScriptForSpeaking';
import { AutoScrollBtn } from '../../../../styles/Read/ReadStyle';
import ScriptForRecording from './ScriptForRecording';

const EssayForSpeaking = ({ essayOn, setEssayOn }: IEssayButtons) => {
  const dispatch = useAppDispatch();
  const pageParams: StudyPageParams = useParams() as any;

  const userEssay = useAppSelector((state) => state.write.essay);
  const [script, setScript] = useState<string[]>([]);
  const [isScript, setIsScript] = useState<boolean>(false);

  useEffect(() => {
    //내가 쓴 에세이 불러오는거
    dispatch(writingActions.getEssayStart(pageParams.learningRecordId));
  }, []);

  const FilterScript = () => {
    let splittedText = userEssay.split(/[.?!]/);

    const texts = splittedText.map((item, key) => {
      let trimmed = item.trimStart();
      return trimmed;
    });

    const filteredText = texts.filter((text) => text.length > 0);

    setScript(filteredText);
  };

  useEffect(() => {
    dispatch(FilterScript);
  }, [userEssay]);

  useEffect(() => {
    const element = document.querySelectorAll('#textBox');
    const container = document.querySelector('#container');

    const options = {
      root: null, // viewport
      rootMargin: '0px',
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
  const sentenceClickHandler = (
    e: React.MouseEvent<HTMLDivElement>,
    idx: number
  ) => {
    if (e.currentTarget.classList.contains('backlight')) {
      e.currentTarget.classList.remove('backlight');
    } else {
      const rest = document.querySelectorAll('.backlight');
      rest.forEach((item, idx) => {
        item.classList.remove('backlight');
      });

      e.currentTarget.classList.add('backlight');
    }
    // e.currentTarget.classList
  };

  return (
    <MainBox
      widthSize={'50vw'}
      heightSize={'30vh'}
      paddingSize={'1vw'}
      fontSize={'2vmin'}
      fontColor={'grey'}
      style={{
        display: 'flex',
        flexDirection: 'column',
        // overflow: 'auto',

        wordBreak: 'break-word',
      }}
    >
      {essayOn === 0 ? (
        <div style={{ overflow: 'auto', overflowX: 'hidden' }}>
          <FlexTransparentDiv
            widthSize={'12vw'}
            heightSize={'0vw'}
            alignItems={'center'}
            justifyContent={'start'}
            paddingSize={'0'}
            flexDirection={'row'}
            IsBorder={'none'}
            style={{ position: 'fixed' }}
          >
            <div
              style={{
                position: 'absolute',
                top: '-3.8vh',
                left: '37.5vw',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <AutoScrollBtn
                onClick={() => setIsScript(!isScript)}
                className={isScript ? 'auto-scroll' : 'manual-scroll'}
              ></AutoScrollBtn>
              <div
                style={{
                  width: '5vw',
                  height: '5vw',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5vmin',
                  color: '#9897a9',
                }}
              >
                <div>{isScript ? 'SCRIPT' : 'ESSAY'}</div>
              </div>
            </div>
          </FlexTransparentDiv>

          {isScript ? (
            <ScriptForRecording></ScriptForRecording>
          ) : (
            <>
              <TextContainer id="container">
                {script.length !== 0 ? (
                  script.map((item, idx) => (
                    <TextEssayBox
                      key={idx}
                      onClick={(e) => sentenceClickHandler(e, idx)}
                      style={{
                        fontSize: item.length > 50 ? '2.5vmin' : '3vmin',

                        lineHeight: '4vh',
                      }}
                      id="textBox"
                    >
                      {item}
                    </TextEssayBox>
                  ))
                ) : (
                  <h2
                    style={{
                      textAlign: 'center',
                      lineHeight: '20vh',
                      color: 'black',
                    }}
                  >
                    아직 작성한 에세이가 없어요😂
                  </h2>
                )}
              </TextContainer>
            </>
          )}
        </div>
      ) : (
        <h2
          style={{
            textAlign: 'center',
            lineHeight: '20vh',
            color: 'black',
          }}
        >
          문장을 보지않고 말하기 연습을 해보세요
        </h2>
      )}

      {/* <div>
        <FlexTransparentDiv
          widthSize={'12vw'}
          heightSize={'0vw'}
          alignItems={'center'}
          justifyContent={'start'}
          paddingSize={'0'}
          flexDirection={'row'}
          IsBorder={'none'}
          style={{ position: 'relative' }}
        >
          <div
            style={{
              position: 'absolute',
              top: '-1.8vh',
              left: '38.5vw',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <AutoScrollBtn
              onClick={() => setIsScript(!isScript)}
              className={isScript ? 'auto-scroll' : 'manual-scroll'}
            ></AutoScrollBtn>
            <div
              style={{
                width: '5vw',
                height: '5vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.5vmin',
                color: '#9897a9',
              }}
            >
              <div>{isScript ? 'SCRIPT' : 'ESSAY'}</div>
            </div>
          </div>
        </FlexTransparentDiv>

        {isScript ? (
          <ScriptForRecording></ScriptForRecording>
        ) : (
          <>
            <TextContainer id="container">
              {script.length !== 0 ? (
                script.map((item, idx) => (
                  <TextEssayBox
                    key={idx}
                    onClick={(e) => sentenceClickHandler(e, idx)}
                    style={{
                      fontSize: item.length > 50 ? '2.5vmin' : '3vmin',

                      lineHeight: '4vh',
                    }}
                    id="textBox"
                  >
                    {item}
                  </TextEssayBox>
                ))
              ) : (
                <h2 style={{ textAlign: 'center', lineHeight: '20vh' }}>
                  아직 작성한 에세이가 없어요😂
                </h2>
              )}
            </TextContainer>
          </>
        )}
      </div> */}
    </MainBox>
  );
};

export default EssayForSpeaking;
