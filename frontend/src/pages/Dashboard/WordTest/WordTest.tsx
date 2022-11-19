import { border } from '@material-ui/system';
import React, { useCallback, useRef } from 'react';
import { useEffect, useState } from 'react';

import { dashboardActions } from '../../../features/dashboard/dashboard-slice';
import {
  FlexTransparentDiv,
  MainBox,
} from '../../../styles/Common/CommonDivStyle';
import { useAppDispatch, useAppSelector } from '../../../utils/hooks';

import { WordTestInput } from '../../../styles/DashBoard/DashBoardStyle';
import {
  ModalBackdrop,
  RightAlert,
} from '../../../styles/DashBoard/DashBoardStyle';
import { AiFillCloseCircle } from 'react-icons/ai';
import { MainBtn } from '../../../styles/Common/CommonBtnStyle';

interface IWordTestProps {
  isOpenWordList: boolean;
  setIsOpenWordList: React.Dispatch<React.SetStateAction<boolean>>;
  isOpenTest: boolean;
  setIsOpenTest: React.Dispatch<React.SetStateAction<boolean>>;
}
const WordTest = ({
  isOpenWordList,
  setIsOpenWordList,
  isOpenTest,
  setIsOpenTest,
}: IWordTestProps) => {
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
  const closeModalWordTest = () => {
    setIsOpenTest(!isOpenTest);
  };
  return (
    <ModalBackdrop>
      <MainBox
        widthSize={'60vw'}
        heightSize={'46.5vh'}
        paddingSize={'1vw 0'}
        fontColor={'black'}
        fontSize={'2.5vmin'}
        style={{
          // display: 'flex',
          position: 'relative',
        }}
      >
        {isRight === true ? <RightAlert>Right!</RightAlert> : null}
        {/* <RightAlert>Right!</RightAlert> */}
        <AiFillCloseCircle
          size={25}
          color={'black'}
          style={{
            position: 'absolute',
            top: '1vh',
            right: '1vw',
            cursor: 'pointer',
          }}
          onClick={() => {
            closeModalWordTest();
          }}
        ></AiFillCloseCircle>
        <FlexTransparentDiv
          widthSize={'58vw'}
          heightSize={'38vh'}
          paddingSize={'0'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          IsBorder={'none'}
          style={{
            marginTop: '4vh',
            marginLeft: '1vw',
            borderRadius: '2vmin',
            boxShadow: '1px 1px 3px 1px #dadce0',
          }}
        >
          {wordList.length !== 0 ? (
            <>
              <FlexTransparentDiv
                widthSize={'58vw'}
                heightSize={'17vh'}
                paddingSize={'1vh 1vw'}
                flexDirection={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                IsBorder={'none'}
                style={{
                  flexWrap: 'wrap',
                  borderRadius: '2vmin 2vmin 0 0',
                  background: 'rgba(88, 172, 240, 0.2)',
                  fontSize:
                    randomWord.exampleKor.length > 100 ? '2vmin' : '2.5vmin',
                }}
              >
                {randomWord.exampleKor}
                {/* <span>{randomWord.word}</span> */}
              </FlexTransparentDiv>
              <FlexTransparentDiv
                widthSize={'58vw'}
                heightSize={'21vh'}
                paddingSize={'1vh 1vw'}
                flexDirection={'row'}
                justifyContent={'center'}
                alignItems={'center'}
                IsBorder={'none'}
                style={{
                  flexWrap: 'wrap',
                  fontSize:
                    randomWord.example.length > 100 ? '2vmin' : '2.5vmin',
                }}
              >
                {randomWord.example.split(/[ .?!,]/).map((item, idx) => {
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
              </FlexTransparentDiv>
            </>
          ) : (
            <h1>외우지 못한 영어 단어가 없어요</h1>
          )}

          <MainBtn
            widthSize={'6vw'}
            heightSize={'5vh'}
            paddingSize={'0'}
            fontSize={'2.5vmin'}
            fontColor={'white'}
            backgroundColor={'black'}
            onClick={handleTrigger}
            style={{ margin: '1vh 0 1vh 51vw' }}
          >
            PASS
          </MainBtn>
        </FlexTransparentDiv>
      </MainBox>
      {/* <div>{randomWord.wordbookId}</div> */}
    </ModalBackdrop>
  );
};

export default WordTest;
