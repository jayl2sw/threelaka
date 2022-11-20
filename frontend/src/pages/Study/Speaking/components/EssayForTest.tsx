import React, { useEffect, useRef } from 'react';
import useOnScreen from '../UseOnScreen';
import { FlexTransparentDiv } from '../../../../styles/Common/CommonDivStyle';
import {
  EssayContainer,
  TextBox,
  TextContainer,
} from '../../../../styles/Speaking/SpeakingStyle';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../utils/hooks';
import { writingActions } from '../../../../features/writing/writing-slice';
import { StudyPageParams } from '../../../../models';
import { studyActions } from '../../../../features/study/study-slice';

interface IEssayProps {
  setSelectedText: React.Dispatch<React.SetStateAction<string>>;

  pageParams: StudyPageParams;
}

const EssayForTest = ({
  setSelectedText,
  pageParams,
  setFlag,
}: IEssayProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(elementRef);
  const dispatch = useAppDispatch();
  const textBoxRef = useRef<HTMLDivElement[]>([]);
  const [script, setScript] = useState<string[]>([]);
  const userEssay = useAppSelector((state) => state.write.essay);

  const sentenceClickHandler = (
    e: React.MouseEvent<HTMLDivElement>,
    idx: number
  ) => {
    const pickedSentence = (e.target as HTMLDivElement).innerText;

    dispatch(studyActions.resetSpeechScore());

    setSelectedText(pickedSentence);
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

    const boxList = textBoxRef.current;

    boxList.forEach((el) => observer.observe(el));
  });

  return (
    <EssayContainer>
      <TextContainer>
        <p ref={elementRef} className="trigger">
          에세이예요
        </p>

        {script.length !== 0 ? (
          script.map((item, idx) => (
            <TextBox
              key={idx}
              ref={(el) => {
                if (null != el) {
                  textBoxRef.current[idx] = el;
                }
              }}
              onClick={(e) => sentenceClickHandler(e, idx)}
              style={{
                fontSize: item.length > 100 ? '2vmin' : '3.8vmin',
                color: '#1D3557',
              }}
            >
              {item}
            </TextBox>
          ))
        ) : (
          <h2 style={{ textAlign: 'center' }}>
            에세이를 작성해야 발음 테스트가 가능합니다😂
          </h2>
        )}
      </TextContainer>
    </EssayContainer>
  );
};

export default EssayForTest;
