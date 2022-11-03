import React, { useEffect, useRef } from 'react';
import useOnScreen from '../UseOnScreen';
import { MainBox } from '../../../../styles/Common/CommonDivStyle';
import {
  ModePickContainer,
  EssayContainer,
  TextBox,
  TextContainer,
} from '../../../../styles/Speaking/SpeakingStyle';
import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../utils/hooks';
import { useCallback } from 'react';
import { writingActions } from '../../../../features/writing/writing-slice';
import { StudyPageParams } from '../../../../models';

interface IEssayProps {
  setSplittedText: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>;
  setSelectedText: React.Dispatch<React.SetStateAction<string>>;
  pageParams: StudyPageParams;
}

const EssayScript = ({
  setSelectedText,
  pageParams,
  setSplittedText,
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
    console.log('얍얍', pickedSentence);
    setSelectedText(pickedSentence);
    const splittedSentence = e.target as HTMLDivElement;
    let words = splittedSentence.innerText.split(/( )/g);
  };
  // const sentenceClickHandler = (
  //   e: React.MouseEvent<HTMLDivElement>,
  //   idx: number
  // ) => {
  //   const pickedSentence = e.target as HTMLDivElement;
  //   let words = pickedSentence.innerText.split(/( )/g);
  //   console.log(words);
  //   pickedSentence.innerHTML = words
  //     .map((word) => `<span>${word}</span>`)
  //     .join('');
  //   console.log(pickedSentence);
  //   setSelectedText(pickedSentence);
  // };

  useEffect(() => {
    //내가 쓴 에세이 불러오는거
    dispatch(writingActions.getEssayStart(pageParams.learningRecordId));
  }, []);

  const FilterScript = () => {
    let splittedText = userEssay.split('.');

    const texts = splittedText.map((item, key) => {
      let trimmed = item.trimStart();
      return trimmed;
    });

    const filteredText = texts.filter((text) => text.length > 0);
    console.log('잘필터링되나', filteredText);
    setScript(filteredText);
    console.log(script);
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
          에세이에요
        </p>
        {/* <ModePickContainer>
          <button>연습</button>
          <button>실전</button>
        </ModePickContainer> */}

        {script ? (
          script.map((item, idx) => (
            <TextBox
              key={idx}
              ref={(el) => {
                if (null != el) {
                  textBoxRef.current[idx] = el;
                }
              }}
              onClick={(e) => sentenceClickHandler(e, idx)}
            >
              {item}
            </TextBox>
          ))
        ) : (
          <p>아직 작성된 에세이가 없어요😂</p>
        )}
      </TextContainer>
    </EssayContainer>
  );
};

export default EssayScript;
