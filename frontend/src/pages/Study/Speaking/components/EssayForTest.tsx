import React, { useEffect, useRef } from 'react';

import {
  EssayContainer,
  TextContainer,
} from '../../../../styles/Speaking/SpeakingStyle';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../utils/hooks';

import { writingActions } from '../../../../features/writing/writing-slice';
import { StudyPageParams } from '../../../../models';
import { studyActions } from '../../../../features/study/study-slice';
import { TextEssayBox } from '../../../../styles/Speaking/SpeakingStyle';
import ScriptForSpeaking from './ScriptForSpeaking';
import { AutoScrollBtn } from '../../../../styles/Read/ReadStyle';
import { FlexTransparentDiv } from '../../../../styles/Common/CommonDivStyle';
export interface IEssayProps {
  setSelectedText: React.Dispatch<React.SetStateAction<string>>;

  pageParams: StudyPageParams;
}

const EssayForTest = ({ setSelectedText, pageParams }: IEssayProps) => {
  const dispatch = useAppDispatch();
  const textBoxRef = useRef<HTMLDivElement[]>([]);
  const [script, setScript] = useState<string[]>([]);
  const userEssay = useAppSelector((state) => state.write.essay);
  const [isScript, setIsScript] = useState<boolean>(false);

  const sentenceClickHandler = (
    e: React.MouseEvent<HTMLDivElement>,
    idx: number
  ) => {
    const pickedSentence = (e.target as HTMLDivElement).innerText;

    dispatch(studyActions.resetSpeechScore());
    setSelectedText(pickedSentence);
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
      root: container, // viewport
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
    // 한칸씩 옮기는건 어케 해야하지 ㅜㅜ
    // if (textBoxRef.current !== null) {
    //   textBoxRef.current.map((item, idx) => {
    //     item.scrollIntoView({
    //       behavior: 'smooth',
    //       block: 'center',
    //     });
    //   });
    // }
  });

  return (
    <>
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
            left: '37vw',
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
        <ScriptForSpeaking
          setSelectedText={setSelectedText}
          pageParams={pageParams}
        ></ScriptForSpeaking>
      ) : (
        <>
          <EssayContainer id="container">
            <TextContainer>
              {script.length !== 0 ? (
                script.map((item, idx) => (
                  <TextEssayBox
                    key={idx}
                    ref={(el) => {
                      if (null != el) {
                        textBoxRef.current[idx] = el;
                      }
                    }}
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
                  에세이를 작성해야 발음 테스트가 가능합니다😂
                </h2>
              )}
            </TextContainer>
          </EssayContainer>
        </>
      )}
    </>
  );
};

export default EssayForTest;
