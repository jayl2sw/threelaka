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

const EssayForSpeaking = ({ essayOn, setEssayOn }: IEssayButtons) => {
  const dispatch = useAppDispatch();
  const pageParams: StudyPageParams = useParams() as any;

  const userEssay = useAppSelector((state) => state.write.essay);
  const [script, setScript] = useState<string[]>([]);

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
      fontSize={'1.5vw'}
      color={'white'}
      fontColor={'black'}
      style={{
        display: 'flex',
        flexDirection: 'column',
        // overflow: 'auto',
        wordBreak: 'break-word',
      }}
    >
      <TextContainer id="container">
        {userEssay !== '' && essayOn === 0 ? (
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
        ) : userEssay !== '' && essayOn === 1 ? (
          <div
            style={{
              textAlign: 'center',
              lineHeight: '25vh',
              fontWeight: 'bold',
            }}
          >
            에세이를 보지 않고 발음 연습을 해보세요
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              lineHeight: '25vh',
              fontWeight: 'bold',
            }}
          >
            아직 작성한 에세이가 없어요😂
          </div>
        )}
      </TextContainer>
    </MainBox>
  );
};

export default EssayForSpeaking;
