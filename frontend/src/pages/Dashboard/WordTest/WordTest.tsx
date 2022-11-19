import { border } from '@material-ui/system';
import React, { useCallback, useRef } from 'react';
import { useEffect, useState } from 'react';

import { dashboardActions } from '../../../features/dashboard/dashboard-slice';
import { FlexTransparentDiv } from '../../../styles/Common/CommonDivStyle';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';

import { WordTestInput } from '../../../styles/DashBoard/DashBoardStyle';
const WordTest = () => {
  const dispatch = useAppDispatch();

  const wordList = useAppSelector((state) => state.dashboard.userWordInfo);
  const randomWord = useAppSelector((state) => state.dashboard.pickRandomWord);
  const inputRef = useRef<HTMLInputElement>(null);
  const [isRight, setIsRight] = useState<boolean>(false);

  //영어 단어리스트에서 랜덤으로 한개씩 뽑아서 퀴즈 내기

  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    dispatch(dashboardActions.getUserWordInfo());
  }, [trigger]);
  useEffect(() => {
    dispatch(dashboardActions.getUserWordInfo());
  }, []);

  const handleTrigger = () => {
    setIsRight(false);
    setTrigger(!trigger);
    if (inputRef.current !== null) {
      inputRef.current.value = '';
      inputRef.current.readOnly = false;
    }
  };
  useEffect(() => {
    if (inputRef.current !== null) {
      inputRef.current.focus();
    }
  }, [handleTrigger]);

  const checkKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e);
    console.warn(inputRef.current?.value);
    // if (inputRef.current?.value !== undefined)
    if (randomWord.word.trimEnd() === inputRef.current?.value) {
      // alert('정답입니다');
      inputRef.current.value = randomWord.word.trimEnd();
      inputRef.current.readOnly = true;
      setIsRight(true);
      setTimeout(() => {
        handleTrigger();
      }, 500);
      const isMemorizedWordInfo = {
        wordbookId: randomWord.wordbookId,
      };
      dispatch(dashboardActions.putIsMemorizedWord(isMemorizedWordInfo));
    }
  };
  return (
    <div>
      <div>영어단어테스트페이지</div>
      <FlexTransparentDiv
        widthSize={'60vw'}
        heightSize={'35vh'}
        paddingSize={'0'}
        flexDirection={'column'}
        justifyContent={'center'}
        alignItems={'center'}
        IsBorder={'is'}
        style={{ marginLeft: '10VW' }}
      >
        {wordList.length !== 0 ? (
          <>
            <button onClick={handleTrigger}>skip</button>

            <div>{randomWord.word}</div>
            <div
              style={{
                display: 'flex',
                width: '55vw',
                border: '1px red solid',
                flexWrap: 'wrap',
              }}
            >
              {randomWord.example.split(/[ .?!]/).map((item, idx) => {
                console.warn(item, randomWord.word.trimEnd());
                if (item === randomWord.word.trimEnd()) {
                  return (
                    <>
                      <WordTestInput
                        onKeyUp={(e) => {
                          checkKeyUp(e);
                        }}
                        ref={inputRef}
                        className={isRight ? 'right' : ''}
                      />
                      <p>&nbsp;</p>
                    </>
                  );
                }
                return <p>{item}&nbsp;</p>;
              })}
            </div>
            <div>{randomWord.exampleKor}</div>
          </>
        ) : (
          <div>외우지 못한 영어 단어가 없어요</div>
        )}
      </FlexTransparentDiv>
      {/* <div>{randomWord.wordbookId}</div> */}
    </div>
  );
};

export default WordTest;
