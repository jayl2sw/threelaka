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
import { useAppDispatch } from '../../../../utils/hooks';
import { useCallback } from 'react';

interface IEssayProps {
  setSelectedText: React.Dispatch<React.SetStateAction<string>>;
}

const EssayScript = ({ setSelectedText }: IEssayProps) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const isOnScreen = useOnScreen(elementRef);
  const dispatch = useAppDispatch();
  const textBoxRef = useRef<HTMLDivElement[]>([]);
  const [script, setScript] = useState<string[]>([]);
  //뉴라인만
  const FilterScript = () => {
    console.log('얘는뭘까', { isOnScreen });
    let dummy1 =
      'Yes of course.\
      I grew up playing football like most children in my country.';
    //점만
    let dummy2 = 'I go to school. And I am so happy.';
    //뉴라인이랑 점 둘다
    let dummy3 =
      'Yes of course.\
    I grew up playing football like most children in my country. I go to school.\
    I want to eat lunch.\
    I am so hungry. very very hungry.\
    Please, give me a delicious food.\
    I love you so much.\
    I need delicious food.';

    let splittedText = dummy3.split('.');

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
  }, []);

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

        {script &&
          script.map((item, idx) => (
            <TextBox
              key={idx}
              ref={(el) => {
                if (null != el) {
                  textBoxRef.current[idx] = el;
                }
              }}
            >
              {item}
            </TextBox>
          ))}
      </TextContainer>
    </EssayContainer>
  );
};

export default EssayScript;
